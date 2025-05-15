import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protectRoute = async (req, res, next) => {
  try {
    // const token = req.cookies.jwt;
    // Tìm token từ nhiều nguồn
    let token = null;

    // 1. Kiểm tra cookie
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    // 2. Kiểm tra Authorization header
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default protectRoute;
