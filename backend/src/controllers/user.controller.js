// import FriendRequest from "../models/FriendRequest.js";
// import User from "../models/User.js";
import * as userService from "../services/user.service.js";

const handleError = (res, error) => {
  console.error("Controller error:", error.message);

  const errorMap = {
    // User errors
    USER_NOT_FOUND: { status: 404, message: "User not found" },

    // Friend request errors
    CANNOT_FRIEND_SELF: { status: 400, message: "You cannot send a friend request to yourself" },
    RECIPIENT_NOT_FOUND: { status: 404, message: "User not found" },
    ALREADY_FRIENDS: { status: 400, message: "You are already friends with this user" },
    REQUEST_ALREADY_EXISTS: { status: 400, message: "Friend request already sent" },
    REQUEST_NOT_FOUND: { status: 404, message: "Friend request not found" },

    // Authorization errors
    UNAUTHORIZED_ACCEPT: { status: 403, message: "You are not authorized to accept this friend request" },
    UNAUTHORIZED_CANCEL: { status: 403, message: "You are not authorized to cancel this request" },
    UNAUTHORIZED_REJECT: { status: 403, message: "You are not authorized to reject this request" },

    // Friend errors
    NOT_FRIENDS: { status: 400, message: "This user is not in your friends list" },
  };

  const errorResponse = errorMap[error.message] || {
    status: 500,
    message: "Internal server error",
  };

  return res.json({
    status: errorResponse.status,
    success: false,
    message: errorResponse.message,
  });
};

export const getRecommendedUsers = async (req, res) => {
  try {
    // const currentUserId = req.user.id;
    // const currentUser = req.user;
    const currentUserId = req.user._id.toString();
    const currentUserFriends = req.user.friends;

    const users = await userService.findRecommendedUsers(currentUserId, currentUserFriends);

    // const recommendedUsers = await User.find({
    //   $and: [
    //     { _id: { $ne: currentUserId } }, // Exclude current user
    //     { _id: { $nin: currentUser.friends } }, // Exclude current user's friends
    //     { isOnboarded: true }, // Only include onboarded users
    //   ],
    // });

    return res.json({
      status: 200,
      success: true,
      message: "Recommended users fetched successfully",
      recommendedUsers: users,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getMyFriends = async (req, res) => {
  try {
    // const user = await User.findById(req.user.id)
    const userId = req.user._id;
    const friends = await userService.findUserFriends(userId);
    // .select("friends")
    // .populate("friends", "fullName profilePicture nativeLanguage learningLanguage");
    return res.json({
      status: 200,
      success: true,
      message: "Friends fetched successfully",
      friends,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    // const myId = req.user.id;
    const senderId = req.user._id.toString();
    const { id: recipientId } = req.params;

    const friendRequest = await userService.createFriendRequest(senderId, recipientId);

    // prevent sending friend request to self
    // if (myId === recipientId) {
    //   return res.json({
    //     success: false,
    //     message: "You cannot send a friend request to yourself",
    //   });
    // }

    // const recipient = await User.findById(recipientId);
    // if (!recipient) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Recipient not found",
    //   });
    // }

    // // check if the recipient is already a friend
    // if (recipient.friends.includes(myId)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "You are already friends with this user",
    //   });
    // }

    // const existingRequest = await FriendRequest.findOne({
    //   $or: [
    //     { sender: myId, recipient: recipientId },
    //     { sender: recipientId, recipient: myId },
    //   ],
    // });

    // if (existingRequest) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Friend request already sent",
    //   });
    // }

    // const friendRequest = await FriendRequest.create({
    //   sender: myId,
    //   recipient: recipientId,
    // });
    return res.json({
      status: 201,
      success: true,
      message: "Friend request sent successfully",
      friendRequest,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { id: requestId } = req.params;
    const currentUserId = req.user._id.toString();

    await userService.acceptFriendRequestById(requestId, currentUserId);

    return res.json({
      status: 200,
      success: true,
      message: "Friend request accepted successfully",
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// const acceptFriendRequest = async (req, res) => {
//   try {
//     const { id: requestId } = req.params;
//     const friendRequest = await FriendRequest.findById(requestId);

//     if (!friendRequest) {
//       return res.status(404).json({
//         success: false,
//         message: "Friend request not found",
//       });
//     }

//     // verify that the recipient of the request is the current user
//     if (friendRequest.recipient.toString() !== req.user.id) {
//       return res.startus(403).json({
//         success: false,
//         message: "You are not authorized to accept this friend request",
//       });
//     }

//     friendRequest.status = "accepted";
//     await friendRequest.save();

//     // add the users to each other's friends list
//     // $addToSet ensures that the user is added only if they are not already in the array
//     await User.findByIdAndUpdate(friendRequest.sender, {
//       $addToSet: { friends: friendRequest.recipient },
//     });

//     await User.findByIdAndUpdate(friendRequest.recipient, {
//       $addToSet: { friends: friendRequest.sender },
//     });

//     res.status(200).json({
//       success: true,
//       message: "Friend request accepted successfully",
//     });
//   } catch (error) {
//     console.log("Error in acceptFriendRequest controller:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

// const getFriendRequests = async (req, res) => {
//   try {
//     const incomingRequests = await FriendRequest.find({
//       recipient: req.user.id,
//       status: "pending",
//     }).populate("sender", "fullName profilePicture nativeLanguage learningLanguage");

//     const acceptedRequests = await FriendRequest.find({
//       sender: req.user.id,
//       status: "accepted",
//     }).populate("recipient", "fullName profilePicture");
//     res.status(200).json({
//       success: true,
//       message: "Friend requests fetched successfully",
//       incomingRequests,
//       acceptedRequests,
//     });
//   } catch (error) {
//     console.log("Error in getFriendRequests controller:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

// const getOutgoingFriendRequests = async (req, res) => {
//   try {
//     const outgoingRequests = await FriendRequest.find({
//       sender: req.user.id,
//       status: "pending",
//     }).populate("recipient", "fullName profilePicture nativeLanguage learningLanguage");

//     res.status(200).json({
//       success: true,
//       message: "Outgoing friend requests fetched successfully",
//       outgoingRequests,
//     });
//   } catch (error) {
//     console.log("Error in getOutGoingFriendRequests controller:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

export const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const { incomingRequests, acceptedRequests } = await userService.findFriendRequests(userId);

    return res.json({
      status: 200,
      success: true,
      message: "Friend requests fetched successfully",
      incomingRequests,
      acceptedRequests,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getOutgoingFriendRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const outgoingRequests = await userService.findOutgoingFriendRequests(userId);

    return res.json({
      status: 200,
      success: true,
      message: "Outgoing friend requests fetched successfully",
      outgoingRequests,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const cancelFriendRequest = async (req, res) => {
  try {
    const { id: requestId } = req.params;
    const currentUserId = req.user._id.toString();

    await userService.cancelFriendRequestById(requestId, currentUserId);

    return res.json({
      status: 200,
      success: true,
      message: "Friend request cancelled successfully",
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const rejectFriendRequest = async (req, res) => {
  try {
    const { id: requestId } = req.params;
    const currentUserId = req.user._id.toString();

    await userService.rejectFriendRequestById(requestId, currentUserId);

    return res.json({
      status: 200,
      success: true,
      message: "Friend request rejected successfully",
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const removeFriend = async (req, res) => {
  try {
    const { id: friendId } = req.params;
    const currentUserId = req.user._id.toString();

    await userService.removeFriendById(currentUserId, friendId);

    return res.json({
      status: 200,
      success: true,
      message: "Friend removed successfully",
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.user._id;
    const profile = await userService.getMyProfile(userId);

    return res.json({
      status: 200,
      success: true,
      message: "User profile fetched successfully",
      profile,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const currentUserId = req.user._id.toString();

    const profileData = await userService.getUserProfileById(userId, currentUserId);

    return res.json({
      status: 200,
      success: true,
      message: "User profile fetched successfully",
      profile: { ...profileData },
    });
  } catch (error) {
    return handleError(res, error);
  }
};
