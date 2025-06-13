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
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 1,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Erro ao buscar usuário';
      const errorStatus = error.response?.status;

      if (errorStatus === 401) {
        toast.error('Sessão expirada. Por favor, faça login novamente.', { autoClose: 5000 });
      } else if (errorStatus === 404) {
        toast.error('Usuário não encontrado.', { autoClose: 5000 });
      } else {
        toast.error(errorMessage, { autoClose: 5000 });
      }
    },
  });
};
