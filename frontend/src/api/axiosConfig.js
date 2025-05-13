import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Use environment variable for base URL
  // baseURL: "http://localhost:3000/api",
  withCredentials: true, // This is important for sending cookies with requests
});

export default axiosInstance;
