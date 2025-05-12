import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import { getSteamToken } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/token", protectRoute, getSteamToken);

export default router;
