import { api } from '@/services/api';
import type { ApiErrorResponse } from '@/types/error.types';
import type { UpdateUserData, UpdateUserResponse } from '@/types/user.types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { watch } from 'vue';

export const updateUserMutation = async (userData: UpdateUserData): Promise<UpdateUserResponse> => {
  const response = await api.patch<UpdateUserResponse>('/users/me', userData);
  return response.data;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<UpdateUserResponse, ApiErrorResponse, UpdateUserData>({
    mutationFn: updateUserMutation,
  });

  watch(
    () => mutation.data.value,
    (data: UpdateUserResponse | undefined) => {
      if (data) {
        queryClient.setQueryData(['user'], data.user);
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    },
  );

  return mutation;
};
