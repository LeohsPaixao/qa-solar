import { useMutation } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';

const forgotPassword = async (email) => {
  const response = await api.post('/password-recovery/forgot-password', { email });
  return response.data;
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      toast.success(data.message, { autoClose: 5000 });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Erro ao solicitar recuperação de senha';
      toast.error(errorMessage, { autoClose: 5000 });
    },
  });
};
