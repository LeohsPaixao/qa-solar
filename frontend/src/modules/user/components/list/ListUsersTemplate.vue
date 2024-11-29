<template>
  <div class="list-users-container">
    <table class="users-table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              v-model="selectAll"
              @change="toggleSelectAll"
              :disabled="isLoading"
              aria-label="Selecionar todos os usuários"
            />
          </th>
          <th>ID</th>
          <th>Nome Completo</th>
          <th>E-mail</th>
          <th>Telefone</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>
            <input
              type="checkbox"
              v-model="selectedUsers"
              :value="user.id"
              :disabled="isLoading"
              aria-label="Selecionar usuário"
            />
          </td>
          <td>{{ user.id }}</td>
          <td>{{ user.full_name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
        </tr>
      </tbody>
    </table>

    <footer class="footer-actions">
      <button
        class="btn-delete"
        :disabled="!selectedUsers.length || isLoading"
        @click="handleDelete"
        aria-label="Excluir usuários selecionados"
      >
        Excluir
      </button>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useDeleteUsers } from '../../../../hooks/useDeleteUsers.js';
import { useFetchUsers } from '../../../../hooks/useFetchUsers.js';

// Estados locais
const users = ref([]);
const selectedUsers = ref([]);
const selectAll = ref(false);
const isLoading = ref(false);

// Hooks para buscar e deletar usuários
const { data: fetchedUsers, isLoading: isFetching, refetch } = useFetchUsers();
const { mutate: deleteUsers, isLoading: isDeleting } = useDeleteUsers();

// Função para carregar usuários
onMounted(() => {
  refetch().then((response) => {
    users.value = response.data;
  });
});

// Sincronizar a seleção de "Selecionar Todos"
const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedUsers.value = users.value.map((user) => user.id);
  } else {
    selectedUsers.value = [];
  }
};

// Função para excluir usuários selecionados
const handleDelete = () => {
  if (!selectedUsers.value.length) {
    toast.error('Nenhum usuário selecionado.', { autoClose: 3000 });
    return;
  }

  deleteUsers(selectedUsers.value, {
    onSuccess: () => {
      toast.success('Usuários excluídos com sucesso!', { autoClose: 3000 });
      selectedUsers.value = [];
      selectAll.value = false;
      refetch();
    },
    onError: () => {
      toast.error('Erro ao excluir usuários. Tente novamente.', { autoClose: 5000 });
    },
  });
};
</script>

<style src="./ListStyle.css"></style>
