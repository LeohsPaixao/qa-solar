import axios from 'axios';

const token = localStorage.getItem('user-token');

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('user-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
