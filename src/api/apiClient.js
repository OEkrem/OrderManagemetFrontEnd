import axios from 'axios';
import { isExpired } from '../context/authUtils';
import store from '../store/store';
import { saveToken, removeToken, refreshToken } from '../store/features/auth/authSlice';

const api = axios.create({
  baseURL: 'http://localhost:8090/api/v1',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

let isRefreshing = false;
let refreshSubscribers = [];

const onRrefreshed = (token) => {
  refreshSubscribers.map((callback) => callback(token));
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

api.interceptors.request.use(
  async (config) => {
    const state = store.getState(); // Redux state'ine erişim
    let token = state.auth.token;

    if (token && isExpired(token)) {
      if(!isRefreshing){
        isRefreshing = true;
        try {
          const refreshResponse = await store.dispatch(refreshToken()).unwrap();
          token = refreshResponse;

          store.dispatch(saveToken(token));
          isRefreshing = false;
          onRrefreshed(token);

        } catch (refreshError) {
          console.error("Refresh error..");
          isRefreshing = false;
          store.dispatch(removeToken());
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve) => {
        addRefreshSubscriber((newToken) => {
          config.headers["Authorization"] = `Bearer ${newToken}`;
          resolve(config);
        });
      });
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
    /*const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await store.dispatch(refreshToken()).unwrap();
        const newAccessToken = refreshResponse;

        store.dispatch(saveToken(newAccessToken));

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired or invalid");
        store.dispatch(removeToken());
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }*/
      if (error.response?.status === 401) {
        console.log("401 hatası.. remove");
        store.dispatch(removeToken());
      }
    return Promise.reject(error);
  }
);

export default api;