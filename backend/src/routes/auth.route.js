import express from "express";
import { getMe, login, logout, onboard, signup } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/auth.middleware.js";
import { validateSignin, validateSignup } from "../middleware/validation.middleware.js";

const router = express.Router();

// public routes
router.post("/signup", signup);
router.post("/login", login);

// protected routes
router.post("/logout", protectRoute, logout);
router.post("/onboarding", protectRoute, onboard);
router.get("/me", protectRoute, getMe);

export default router;
