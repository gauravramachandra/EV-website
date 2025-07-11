import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ev-website-m7td.onrender.com/api',
});

// Add a request interceptor to automatically add the auth token to requests
import type { AxiosRequestConfig, AxiosError } from 'axios';

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

export default api;
