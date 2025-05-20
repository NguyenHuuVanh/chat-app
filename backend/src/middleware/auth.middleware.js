import jwt from "jsonwebtoken";
import User from "../models/User.js";

// const protectRoute = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwt;
//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized - No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     console.log("🚀 ~ protectRoute ~ decoded:", decoded);
//     if (!decoded) {
//       return res.status(401).json({ message: "Unauthorized - Invalid token" });
//     }

//     const user = await User.findById(decoded.userId).select("-password");

//     if (!user) {
//       return res.status(401).json({ message: "Unauthorized - User not found" });
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     console.log("Error in protectRoute middleware:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const protectRoute = async (req, res, next) => {
  try {
    let token;

    // Kiểm tra header Authorization
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
      console.log("Token from header:", token.substring(0, 15) + "...");
    }

    // Kiểm tra cookie nếu không có header
    if (!token && req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
      console.log("Token from cookie:", token.substring(0, 15) + "...");
    }

    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    // Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Phần còn lại giữ nguyên
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

export default protectRoute;
