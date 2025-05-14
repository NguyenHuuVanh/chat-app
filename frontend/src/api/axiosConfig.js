import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL, // Use environment variable for base URL
  withCredentials: true, // This is important for sending cookies with requests
});

export default axiosInstance;
