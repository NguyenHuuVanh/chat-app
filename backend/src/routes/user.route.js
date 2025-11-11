import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import {
  acceptFriendRequest,
  cancelFriendRequest,
  getFriendRequests,
  getMyFriends,
  getOutgoingFriendRequests,
  getRecommendedUsers,
  getUserProfile,
  getMe,
  rejectFriendRequest,
  removeFriend,
  sendFriendRequest,
} from "../controllers/user.controller.js";

const router = express.Router();

// apply the protectRoute middleware to all routes in this router
router.use(protectRoute);

// profile route
router.get("/me", getMe);

// get users & friends
router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

// get friend requests
router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);
router.delete("/friend-request/:id/reject", rejectFriendRequest);
router.delete("/friend-request/:id/cancel", cancelFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendRequests);

// get user profile by id
router.get("/:id", getUserProfile);

// remove friend
router.delete("/friends/:id", removeFriend);

export default router;
