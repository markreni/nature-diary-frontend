import axios from "axios";
import baseURL from "./config";

const api = axios.create({
  baseURL,
});

// Request interceptor: attach access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: handle expired access token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 error and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Get refresh token
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return Promise.reject(error);

      try {
        // Call refresh endpoint
        const res = await axios.post(`${baseURL}api/v1/auth/refresh-token`, {
          refreshToken,
        });

        // Save new access token
        const newToken = res.data.accessToken;
        localStorage.setItem("token", newToken);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        // Refresh token invalid or expired -> logout
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
