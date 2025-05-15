import axios from "axios";

const BASEURL =
  import.meta.env.MODE === "production" ? `${import.meta.env.VITE_API_URL}` : "https://chat-app-1-6dz2.onrender.com";

const axiosInstance = axios.create({
  baseURL: BASEURL, // Use the environment variable for the base URL
  withCredentials: true, // This is important for sending cookies with requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
