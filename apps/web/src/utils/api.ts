import axios from 'axios';
import { toast } from 'react-hot-toast';

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_ENDPOINT,
  timeout: 1000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response.data.message || error.message);

    if (error.response.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
  },
);
