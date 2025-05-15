import axios from "axios";

const BASEURL =
  import.meta.env.MODE === "production" ? "https://chat-app-1-6dz2.onrender.com/api" : "http://localhost:5001/api";

const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_URL, // Use the environment variable for the base URL
  baseURL: BASEURL, // Use the environment variable for the base URL
  withCredentials: true, // This is important for sending cookies with requests
});

export default axiosInstance;
