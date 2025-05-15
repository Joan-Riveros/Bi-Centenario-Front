import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // logica para desloguear al usuario
      // if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) { 
      //   localStorage.removeItem('authToken');
      //   localStorage.removeItem('userData');
      //   window.location.href = '/login'; 
      //   console.error("Unauthorized! Token might be expired or invalid. Redirecting to login.");
      // }
    }
    return Promise.reject(error);
  }
);

export default apiClient;