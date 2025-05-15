import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        process.env.FRONTEND_URL,
        "https://chat-app-seven-beige-18.vercel.app",
        "https://chat-app-server-alpha-six.vercel.app",
      ];

      // Allow all origins in development
      if (!origin || origin === "postman" || process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }

      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }

      console.log("CORS blocked:", origin);
      callback(null, true); // Allow all in development
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.status(200).send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

export default app;
