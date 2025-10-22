import { api } from '@/services/api';
import type { ApiErrorResponse } from '@/types/error.types';
import type { ForgotPasswordRequest, ForgotPasswordResponse } from '@/types/user.types';
import { useMutation } from '@tanstack/vue-query';

export const sendForgotPasswordEmailMutation = async (forgotPasswordData: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
  const response = await api.post<ForgotPasswordResponse>('/password-recovery/forgot-password', forgotPasswordData);
  return response.data;
};

export const useForgotPassword = () => {
  return useMutation<ForgotPasswordResponse, ApiErrorResponse, ForgotPasswordRequest>({
    mutationFn: sendForgotPasswordEmailMutation,
  });
};
