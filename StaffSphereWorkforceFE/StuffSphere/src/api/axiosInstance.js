import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔴 RESPONSE INTERCEPTOR (TOKEN EXPIRED HANDLING)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Token expired / invalid
      localStorage.clear();

      // force redirect to landing
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
