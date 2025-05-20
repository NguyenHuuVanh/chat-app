import axiosInstance from "./axiosConfig";

const signup = async (signupData) => {
  const res = await axiosInstance.post("/auth/signup", signupData);

  if (res.data && res.data.token) {
    localStorage.setItem("token", res.data.token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
  }
  return res.data;
};

const login = async (loginData) => {
  const res = await axiosInstance.post("/auth/login", loginData);
  // Lưu token vào localStorage
  if (res.data && res.data.token) {
    localStorage.setItem("token", res.data.token);
    // Cập nhật header cho các request tiếp theo
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
  }
  return res.data;
};

// const logout = async () => {
//   const res = await axiosInstance.post("/auth/logout");
//   return res.data;
// };

const logout = async () => {
  try {
    const res = await axiosInstance.post("/auth/logout");
    // Xóa token khỏi localStorage
    localStorage.removeItem("token");
    // Xóa header Authorization
    delete axiosInstance.defaults.headers.common["Authorization"];
    return res.data;
  } catch (error) {
    console.log("Error during logout:", error);
    localStorage.removeItem("token");
    delete axiosInstance.defaults.headers.common["Authorization"];
    return null; // Handle error gracefully
  }
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
  const res = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return res.data;
};

const getStreamToken = async () => {
  const res = await axiosInstance.get("/chat/token");
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
  getStreamToken,
};
