import { useMutation, useQueryClient } from '@tanstack/vue-query';
import api from '../services/api';

const fetchEmailUser = async (email) => {
  const response = await api.post(`/user/email/${email}`);
  return response.data;
};

export const useFetchEmailUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchEmailUser,
    onSuccess: () => {
      queryClient.resetQueries();
      queryClient.invalidateQueries();
    },
  });
};
