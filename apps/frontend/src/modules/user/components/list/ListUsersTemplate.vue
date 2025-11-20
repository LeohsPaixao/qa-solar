<template>
  <div class="list-users-container main-content">
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
          <tr v-for="user in usersList" :key="user.id">
            <td>
              <input
                data-testid="checkbox-select-users"
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
            <td>{{ user.document || '-' }}</td>
            <td>{{ user.phone || '-' }}</td>
            <td>{{ formatDate(user.created_at) }}</td>
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
          {{ btnText }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ApiErrorResponse } from '@/types/error.types';
import type { DeleteUserResponse, User, UserList } from '@/types/user.types';
import { computed, ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useDeleteUser } from '../../../../composables/useDeleteUser';
import { useFetchUser } from '../../../../composables/useFetchUser';
import { useFetchUsers } from '../../../../composables/useFetchUsers';
import { formatDate } from '../../../../utils/formDate';

const props = defineProps<UserList>();

const selectedUsers = ref<number[]>([]);
const selectAll = ref<boolean>(false);

// Composables
const { data: usersData, isLoading } = useFetchUsers();
const { data: loggedInUser } = useFetchUser();
const { mutate: deleteUserMutation, isPending: isDeleting } = useDeleteUser();

// Props
const usersList = computed<User[]>(() => {
  if (props.users) {
    return Array.isArray(props.users) ? props.users : [props.users];
  }
  return usersData.value?.users || [];
});

const btnText = computed(() => {
  return isDeleting.value ? 'Excluindo...' : 'Excluir';
});

const isLoggedInUserSelected = computed<boolean>(() => {
  return loggedInUser.value ? selectedUsers.value.includes(loggedInUser.value.id) : false;
});

const toggleSelectAll = (): void => {
  if (selectAll.value && loggedInUser.value) {
    selectedUsers.value = usersList.value.filter((user: User) => user.id !== loggedInUser.value!.id).map((user: User) => user.id);
  } else {
    selectedUsers.value = [];
  }
};

const handleDelete = (): void => {
  if (selectedUsers.value.length > 0) {
    deleteUserMutation(selectedUsers.value, {
      onSuccess: (data: DeleteUserResponse) => {
        toast.success(data.message || 'Usuário(s) excluído(s) com sucesso!', {
          autoClose: 3000,
        });
        selectedUsers.value = [];
        selectAll.value = false;
      },
      onError: (error: ApiErrorResponse) => {
        const errorMessage = error.response?.data?.message || 'Erro ao excluir usuário(s)';
        toast.error(errorMessage, { autoClose: 5000 });
      },
    });
  }
};
</script>

<style src="./ListStyle.css"></style>
