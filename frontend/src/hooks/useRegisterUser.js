import { useMutation } from '@tanstack/vue-query';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';

const registerUser = async (userData) => {
  const response = await api.post('/register', userData);
  return response.data;
};

export const useRegisterUser = () => {
  return useMutation({ mutationFn: registerUser });
};
