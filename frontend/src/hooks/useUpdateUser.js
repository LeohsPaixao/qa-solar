import { useMutation, useQueryClient } from '@tanstack/vue-query';
import api from '../services/api';

const updateUser = async (userData) => {
  const response = await api.put('/user', userData);
  return response.data;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['user'], updatedUser);
      queryClient.resetQueries();
      queryClient.invalidateQueries();
    },
  });
};
