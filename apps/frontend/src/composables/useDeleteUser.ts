import { api } from '@/services/api';
import type { ApiErrorResponse } from '@/types/error.types';
import type { DeleteUserRequest, DeleteUserResponse } from '@/types/user.types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { watch } from 'vue';

export const deleteUserMutation = async (userIds: number[]): Promise<DeleteUserResponse> => {
  const response = await api.delete<DeleteUserResponse>('/users/delete', {
    data: { ids: userIds } as DeleteUserRequest,
  });
  return response.data;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<DeleteUserResponse, ApiErrorResponse, number[]>({
    mutationFn: deleteUserMutation,
  });

  watch(
    () => mutation.data.value,
    (data: DeleteUserResponse | undefined) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      }
    },
  );

  return mutation;
};
