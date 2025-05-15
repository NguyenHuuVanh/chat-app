import axios from "axios";

const BASEURL =
  import.meta.env.MODE === "production" ? "https://chat-app-server-alpha-six.vercel.app" : "http://localhost:5001";

const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_URL, // Use the environment variable for the base URL
  baseURL: BASEURL, // Use the environment variable for the base URL
  withCredentials: true, // This is important for sending cookies with requests
});

export default axiosInstance;
