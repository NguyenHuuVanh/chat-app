import axios from "axios";

const BASEURL =
  import.meta.env.MODE === "production"
    ? `${import.meta.env.VITE_API_URL}/api`
    : "https://chat-app-1-6dz2.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: BASEURL, // Use the environment variable for the base URL
  withCredentials: true, // This is important for sending cookies with requests
});

export default axiosInstance;
