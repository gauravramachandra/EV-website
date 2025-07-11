import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL || 'https://ev-website-m7td.onrender.com/api';

console.log('API Configuration:', {
  baseURL: apiURL,
  environment: process.env.NODE_ENV,
  hasReactAppApiUrl: !!process.env.REACT_APP_API_URL
});

const api = axios.create({
  baseURL: apiURL,
  timeout: 10000, // 10 second timeout
});

// Add a request interceptor to automatically add the auth token to requests
api.interceptors.request.use(
  config => {
    console.log('Making API request:', config.method?.toUpperCase(), config.url);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('API response received:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('API response error:', {
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export default api;
