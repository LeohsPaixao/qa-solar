import { useMutation, useQueryClient } from '@tanstack/vue-query';
import api from '../services/api';

const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.resetQueries();
      queryClient.invalidateQueries();
    },
  });
};
