import axiosInstance from "./axiosConfig";

const signup = async (signupData) => {
  const res = await axiosInstance.post("/auth/signup", signupData);
  return res.data;
};

const login = async (loginData) => {
  const res = await axiosInstance.post("/auth/login", loginData);
  return res.data;
};

const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error fetching auth user:", error);
    return null; // Handle error gracefully
  }
};

const competeOnboarding = async (userData) => {
  const res = await axiosInstance.post("/auth/onboarding", userData);
  return res.data;
};

const getUserFriends = async () => {
  const res = await axiosInstance.get("/users/friends");
  return res.data;
};

const getRecommendedUsers = async () => {
  const res = await axiosInstance.get("/users");
  return res.data;
};

const getOutgoingFriendRequests = async () => {
  const res = await axiosInstance.get("/users/outgoing-friend-requests");
  return res.data;
};

const sendFriendRequest = async (userId) => {
  const res = await axiosInstance.post(`/users/friend-request/${userId}`);
  return res.data;
};

const getFriendRequests = async () => {
  const res = await axiosInstance.get("/users/friend-requests");
  return res.data;
};

const acceptFriendRequest = async (requestId) => {
  const res = await axiosInstance.get(`/users/friend-request/${requestId}/accept`);
  return res.data;
};

export {
  signup,
  login,
  logout,
  getAuthUser,
  competeOnboarding,
  getUserFriends,
  getRecommendedUsers,
  getOutgoingFriendRequests,
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
};
