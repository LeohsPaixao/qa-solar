import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';

const fetchUser = async (email) => {
  const response = await api.post('/user', { email });
  return response.data;
};

export const useFetchUser = (email) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['user', email],
    queryFn: () => fetchUser(email),
    staleTime: 0,
    onSucess: () => {
      queryClient.resetQueries();
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Erro ao buscar usuário';
      const errorStatus = error.response?.data?.status;

      if (errorStatus === '404') {
        toast.error(errorMessage || 'Usuário não encontrado', { autoClose: 5000 });
      } else if (errorStatus === '401') {
        toast.error(errorMessage || 'Token inválido ou expirado', { autoClose: 5000 });
      } else {
        toast.error('Erro desconhecido ao buscar usuário', { autoClose: 5000 });
      }
    },
  });
};
