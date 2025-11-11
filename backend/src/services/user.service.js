import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export const findRecommendedUsers = async (currentUserId, currentUserFriends) => {
  const users = await User.find({
    $and: [
      { _id: { $ne: currentUserId } }, // Exclude current user
      { _id: { $nin: currentUserFriends } }, // Exclude current user's friends
      { isOnboarded: true }, // Only include onboarded users
    ],
  }).select("fullName profilePicture nativeLanguage learningLanguage bio location");
  return users;
};

export const findUserFriends = async (userId) => {
  const user = await User.findById(userId)
    .select("friends")
    .populate("friends", "fullName profilePicture nativeLanguage learningLanguage");
  if (!user) {
    throw new Error("User not found");
  }
  return user.friends;
};

export const createFriendRequest = async (senderId, recipientId) => {
  // validate: can't send request to self
  if (senderId === recipientId) {
    throw new Error("You cannot send a friend request to yourself");
  }

  // check if recipient exists
  const recipient = await User.findById(recipientId);
  if (!recipient) {
    throw new Error("Recipient user not found");
  }

  // check if already friends
  if (recipient.friends.includes(senderId)) {
    throw new Error("Already friends with this user");
  }

  // check if request already exists
  const existingRequest = await FriendRequest.findOne({
    $or: [
      { sender: senderId, recipient: recipientId },
      { sender: recipientId, recipient: senderId },
    ],
  });

  if (existingRequest) {
    throw new Error("Request already exists");
  }

  // create friend request
  const friendRequest = new FriendRequest({
    sender: senderId,
    recipient: recipientId,
  });
  await friendRequest.save();
  return friendRequest;
};

export const acceptFriendRequestById = async (requestId, currentUserId) => {
  const friendRequest = await FriendRequest.findById(requestId);

  if (!friendRequest) {
    throw new Error("Friend request not found");
  }

  // verify recipient is the current user
  if (friendRequest.recipient.toString() !== currentUserId) {
    throw new Error("Unauthorized accept");
  }

  // update request status
  friendRequest.status = "accepted";
  await friendRequest.save();

  // add each user to the other's friends list
  await Promise.all([
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    }),

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    }),
  ]);
  return friendRequest;
};

const findFriendRequests = async (userId) => {
  const [incomingRequests, acceptedRequests] = await Promise.all([
    FriendRequest.find({
      recipient: userId,
      status: "pending",
    }).populate("sender", "fullName profilePicture nativeLanguage learningLanguage"),

    FriendRequest.find({
      sender: userId,
      status: "accepted",
    }).populate("recipient", "fullName profilePicture"),
  ]);
  return { incomingRequests, acceptedRequests };
};

const findOutgoingFriendRequests = async (userId) => {
  const outgoingRequests = await FriendRequest.find({
    sender: userId,
    status: "pending",
  }).populate("recipient", "fullName profilePicture nativeLanguage learningLanguage");
  return outgoingRequests;
};

export const cancelFriendRequestById = async (requestId, currentUserId) => {
  const friendRequest = await FriendRequest.findById(requestId);

  if (!friendRequest) {
    throw new Error("Friend request not found");
  }

  // only sender can cancel the request
  if (friendRequest.sender.toString() !== currentUserId) {
    throw new Error("Unauthorized cancel");
  }

  await FriendRequest.findByIdAndDelete(requestId);
};

export const rejectFriendRequestById = async (requestId, currentUserId) => {
  const friendRequest = await FriendRequest.findById(requestId);

  if (!friendRequest) {
    throw new Error("Friend request not found");
  }

  // only recipient can reject the request
  if (friendRequest.recipient.toString() !== currentUserId) {
    throw new Error("Unauthorized reject");
  }

  await FriendRequest.findByIdAndDelete(requestId);
};

export const removeFriendById = async (currentUserId, friendId) => {
  const currentUser = await User.findById(currentUserId);

  if (!currentUser.friends.includes(friendId)) {
    throw new Error("This user is not in your friends list");
  }

  // remove from both users' friends lists
  await Promise.all([
    await User.findByIdAndUpdate(currentUserId, {
      $pull: { friends: friendId },
    }),
    await User.findByIdAndUpdate(friendId, {
      $pull: { friends: currentUserId },
    }),
  ]);

  // delete the friend request record
  await FriendRequest.findOneAndDelete({
    $or: [
      { sender: currentUserId, recipient: friendId, status: "accepted" },
      { sender: friendId, recipient: currentUserId, status: "accepted" },
    ],
  });
};

export const getMyProfile = async (userId) => {
  const user = await User.findById(userId)
    .select("-password")
    .populate("friends", "fullName profilePicture nativeLanguage learningLanguage");

  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const getUserProfileById = async (userId, currentUserId) => {
  const user = await User.findById(userId)
    .select("-password")
    .populate("friends", "fullName profilePicture nativeLanguage learningLanguage");

  if (!user) {
    throw new Error("User not found");
  }

  // check friendship status
  const isFriend = user.friends.some((friend) => friend._id.toString() === currentUserId);

  // check if there's a pending friend request
  const friendRequest = await FriendRequest.findOne({
    $or: [
      { sender: currentUserId, recipient: userId, status: "pending" },
      { sender: userId, recipient: currentUserId, status: "pending" },
    ],
  });

  let relationshipStatus = "none";
  if (isFriend) {
    relationshipStatus = "friend";
  } else if (friendRequest) {
    relationshipStatus = friendRequest.sender.toString() === currentUserId ? "pending_sent" : "pending_received";
  }

  return { user, relationshipStatus, isOwnProfile: userId === currentUserId };
};
