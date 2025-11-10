import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { verifyToken } from "../utils/tokenUtils.js";

const protectRoute = async (req, res, next) => {
  try {
    // get token from cookies or headers
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.json({
        status: 401,
        message: "Unauthorized - No token provided",
      });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.json({
        status: 401,
        message: "Unauthorized - Invalid token",
      });
    }

    // get user from decoded token
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.json({
        status: 401,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default protectRoute;
