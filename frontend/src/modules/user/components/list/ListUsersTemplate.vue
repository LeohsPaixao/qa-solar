<template>
  <div class="list-users-container">
    <div class="table-wrapper">
      <table data-testid="table-users" class="users-table">
        <thead>
          <tr>
            <th>
              <input
                data-testid="checkbox-select-all"
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
            <th>Documento</th>
            <th>Telefone</th>
            <th>Data de Criação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <td>
              <input
                :data-testid="`checkbox-select-${index}`"
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
            <td>{{ user.document }}</td>
            <td>{{ user.phone || '(00) 0 0000-0000' }}</td>
            <td>{{ user.created_at }}</td>
          </tr>
        </tbody>
      </table>
      <footer class="footer-actions">
        <button
          data-testid="btn-delete-user"
          class="btn-delete"
          :disabled="!selectedUsers.length || isDeleting || isLoggedInUserSelected"
          @click="handleDelete"
          aria-label="Excluir usuários selecionados"
        >
          {{ isDeleting ? 'Excluindo...' : 'Excluir' }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useDeleteUser } from '../../../../hooks/useDeleteUser.js';
import { useFetchUser } from '../../../../hooks/useFetchUser.js';
import { useFetchUsers } from '../../../../hooks/useFetchUsers.js';

const selectedUsers = ref([]);
const selectAll = ref(false);

const userEmail = localStorage.getItem('user-email');

const { data: users, isLoading } = useFetchUsers();
const { data: loggedInUser } = useFetchUser(userEmail);
const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUser();

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedUsers.value = users.value.filter((user) => user.id !== loggedInUser.value.id).map((user) => user.id);
  } else {
    selectedUsers.value = [];
  }
};

const isLoggedInUserSelected = computed(() => loggedInUser.value && selectedUsers.value.includes(loggedInUser.value.id));

const handleDelete = () => {
  deleteUser(selectedUsers.value, {
    onSuccess: (data) => {
      toast.success(data.message, { autoClose: 3000 });
      selectedUsers.value = [];
      selectAll.value = false;
    },
    onError: () => {
      toast.error('Erro ao excluir usuários. Tente novamente.', { autoClose: 5000 });
    },
  });
};
</script>

<style src="./ListStyle.css"></style>
