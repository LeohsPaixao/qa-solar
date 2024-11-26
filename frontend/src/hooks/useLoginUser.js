import { useMutation } from '@tanstack/vue-query';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';

const loginUser = async (loginData) => {
  const response = await api.post('/login', loginData);
  return response.data;
};

export const useLoginUser = () => {
  return useMutation({ mutationFn: loginUser });
};
