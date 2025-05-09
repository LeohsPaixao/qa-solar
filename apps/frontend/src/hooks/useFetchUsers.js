import { useQuery } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import api from '../services/api';

const fetchUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: false,
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Erro ao buscar usuários.';
      toast.error(errorMessage, { autoClose: 5000 });
    },
  });
};
