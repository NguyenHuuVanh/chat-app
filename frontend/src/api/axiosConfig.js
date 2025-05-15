import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : `${import.meta.env.VITE_API_URL}/api`;

const axiosInstance = axios.create({
  baseURL: BASE_URL, // Use the environment variable for the base URL
  withCredentials: true, // This is important for sending cookies with requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
