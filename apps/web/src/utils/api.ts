import axios from 'axios';
import { toast } from 'react-hot-toast';

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_ENDPOINT,
  timeout: 1000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response.data.message || error.message);
  },
);
