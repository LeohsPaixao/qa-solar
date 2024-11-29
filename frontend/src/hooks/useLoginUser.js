import { useMutation, useQueryClient } from '@tanstack/vue-query';
import api from '../services/api';

const loginUser = async (loginData) => {
  const response = await api.post('/login', loginData);
  return response.data;
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.resetQueries();
      queryClient.invalidateQueries();
    },
  });
};
