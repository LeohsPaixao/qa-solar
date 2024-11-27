import axios from 'axios';

const token = localStorage.getItem('user-token');
const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
