import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';

const fetchUser = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

export const useFetchUser = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 0,
    onSuccess: () => {
      queryClient.resetQueries();
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Erro ao buscar usuário';
      const errorStatus = error.response?.data?.status;

      if (errorStatus === '404') {
        toast.error(errorMessage, { autoClose: 5000 });
      } else if (errorStatus === '401') {
        toast.error(errorMessage, { autoClose: 5000 });
      } else {
        toast.error('Erro desconhecido ao buscar usuário', { autoClose: 5000 });
      }
    },
  });
};
