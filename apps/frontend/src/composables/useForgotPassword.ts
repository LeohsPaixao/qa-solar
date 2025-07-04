import { useMutation } from '@tanstack/vue-query';
import { watch } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';
import type { ForgotPasswordRequest, ForgotPasswordResponse } from '../types/user.types';

const forgotPassword = async (email: string): Promise<ForgotPasswordResponse> => {
  const response = await api.post<ForgotPasswordResponse>('/password-recovery/forgot-password', {
    email,
  } as ForgotPasswordRequest);
  return response.data;
};

export const useForgotPassword = () => {
  const mutation = useMutation({
    mutationFn: forgotPassword,
  });

  watch(
    () => mutation.data.value,
    (data: ForgotPasswordResponse | undefined) => {
      if (data) {
        toast.success(data.message, { autoClose: 5000 });
      }
    },
  );

  watch(
    () => mutation.error.value,
    (error: any) => {
      if (error) {
        const errorMessage = error.response?.data?.message || 'Erro ao solicitar recuperação de senha';
        toast.error(errorMessage, { autoClose: 5000 });
      }
    },
  );

  return mutation;
};
