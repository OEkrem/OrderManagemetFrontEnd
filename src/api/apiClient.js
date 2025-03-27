import axios from 'axios';
import { refreshTokenRequest } from './authApi';
import { isExpired } from '../context/authUtils';

const api = axios.create({
  baseURL: 'http://localhost:8090/api/v1',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('jwt_token');
    if (token && isExpired(token)) {
      try {
        const res = await refreshTokenRequest();
        token = res.data.token;
        localStorage.setItem("jwt_token", token);
        console.log("Access token refreshed - api.Request");
      } catch (refreshError) {
        console.error("Refresh token expired or invalid");
        localStorage.clear();
        return Promise.reject(refreshError);
      }
    }
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await refreshTokenRequest();
        const newAccessToken = res.data.token;
        localStorage.setItem("jwt_token", newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        console.log("Access token refreshed - api.Response");
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired or invalid");
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;