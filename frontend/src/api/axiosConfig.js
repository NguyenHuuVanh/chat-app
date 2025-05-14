import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Use the environment variable for the base URL
  withCredentials: true, // This is important for sending cookies with requests
});

export default axiosInstance;
