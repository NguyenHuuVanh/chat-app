import axiosInstance from "./axiosConfig";

const signup = async (signupData) => {
  const res = await axiosInstance.post("/auth/signup", signupData);
  return res.data;
};

// const login = async (loginData) => {
//   const res = await axiosInstance.post("/auth/login", loginData);
//   return res.data;
// };

const login = async (loginData) => {
  try {
    const res = await axiosInstance.post("/auth/login", loginData);

    // Lưu token vào localStorage nếu có
    if (res.data && res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

// const getAuthUser = async () => {
//   try {
//     const res = await axiosInstance.get("/auth/me");
//     return res.data;
//   } catch (error) {
//     console.log("Error fetching auth user:", error);
//     return null; // Handle error gracefully
//   }
// };

const getAuthUser = async () => {
  try {
    // Lấy token từ localStorage
    const token = localStorage.getItem("token");

    // Nếu không có token, trả về null luôn
    if (!token) {
      console.log("No token found, user not authenticated");
      return null;
    }

    // Gọi API với token trong header
    const res = await axiosInstance.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log("Error fetching auth user:", error);

    // Nếu lỗi 401, xóa token không hợp lệ
    if (error.response && error.response.status === 401) {
      console.log("Token invalid or expired, clearing localStorage");
      localStorage.removeItem("token");
    }

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
