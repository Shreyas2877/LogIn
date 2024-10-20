// src/apiConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/auth',
  withCredentials: true, // This ensures cookies are sent with each request
});

export default axiosInstance;