// src/Services/api.ts
import axios from 'axios';
import { LOCAL_STORAGE_KEY } from '../Constant/Constant';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 5000,
});

// Request interceptor
api.interceptors.request.use(
  (config: any) => {
    const lang = localStorage.getItem(LOCAL_STORAGE_KEY.LANG) || 'en';
    config.headers = {
      ...config.headers,
      'Accept-Language': lang,
    };
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Axios error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
