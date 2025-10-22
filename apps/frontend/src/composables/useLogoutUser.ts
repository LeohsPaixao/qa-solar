import { api } from '@/services/api';
import { ApiErrorResponse } from '@/types/error.types';
import { getAuthToken, removeAuthToken } from '@/utils/isAuthenticated';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { watch } from 'vue';
import type { LogoutRequest, LogoutResponse } from '../types/user.types';

export const logoutUserMutation = async (): Promise<LogoutResponse> => {
  const token = getAuthToken();
  const response = await api.post<LogoutResponse>('/auth/logout', { token } as LogoutRequest);

  return response.data;
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<LogoutResponse, ApiErrorResponse>({
    mutationFn: logoutUserMutation,
  });

  watch(
    () => mutation.data.value, (data: LogoutResponse | undefined) => {
      if (data) {
        removeAuthToken();
        queryClient.clear();
      }
    },
  );

  return mutation;
};