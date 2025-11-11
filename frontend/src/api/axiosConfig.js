import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_MODE === "development" ? "http://localhost:5001/api" : `${import.meta.env.VITE_API_URL}/api`;

const axiosInstance = axios.create({
  baseURL: BASE_URL, // Use the environment variable for the base URL
  withCredentials: true, // This is important for sending cookies with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để gắn token vào mỗi request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Khởi tạo token từ localStorage (nếu có) khi ứng dụng khởi động
try {
  const token = localStorage.getItem("token");
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
} catch (error) {
  console.error("Error accessing localStorage:", error);
}

export default axiosInstance;
