import axios from "axios";

// const BASEURL =
//   import.meta.env.MODE === "production"
//     ? `${import.meta.env.VITE_API_URL}/api`
//     : "https://chat-app-1-6dz2.onrender.com/api";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : `${import.meta.env.VITE_API_URL}/api`;

const axiosInstance = axios.create({
  baseURL: BASE_URL, // Use the environment variable for the base URL
  withCredentials: true, // This is important for sending cookies with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor cho request
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token mới nhất từ localStorage cho mỗi request
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho response
axiosInstance.interceptors.response.use(
  (response) => {
    // Xử lý token nếu có trong response
    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
      // Cập nhật header mặc định
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
    }

    return response;
  },
  (error) => {
    // Xử lý lỗi 401 - Unauthorized
    if (error.response && error.response.status === 401) {
      console.warn("Authentication error - clearing token");
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  }
);

// Khởi tạo token từ localStorage nếu có
try {
  const token = localStorage.getItem("token");
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("Token initialized from localStorage");
  }
} catch (error) {
  console.error("Error accessing localStorage:", error);
}

export default axiosInstance;
