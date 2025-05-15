import express from "express";
import cors from "cors";
// import "dotenv/config";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";

// Tải biến môi trường dựa trên NODE_ENV
if (process.env.NODE_ENV === "production") {
  console.log("Running in production mode");
  dotenv.config({ path: "./.env.production" });
} else {
  console.log("Running in development mode");
  dotenv.config({ path: "./.env" });
}

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

const app = express();
const PORT = process.env.PORT || 5001;

// Cấu hình CORS dựa trên môi trường
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [process.env.FRONTEND_URL, "http://localhost:5173"];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Middleware để log request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );

// Cấu hình CORS động
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log("CORS blocked:", origin);
        // Trong production, chỉ cho phép origins đã cấu hình
        if (process.env.NODE_ENV === "production") {
          return callback(new Error("Not allowed by CORS"), false);
        }
        // Trong development, cho phép tất cả
        return callback(null, true);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// app.get("/", (req, res) => {
//   res.status(200).send("API is running...");
// });

// Root route
app.get("/", (req, res) => {
  res.status(200).send(`API is running in ${process.env.NODE_ENV} mode...`);
});

// Catch all routes
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   connectDB();
// });

// Chỉ listen khi không ở Vercel (serverless environment)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    connectDB();
  });
} else {
  // Vẫn kết nối DB trong production
  connectDB();
}

export default app;
