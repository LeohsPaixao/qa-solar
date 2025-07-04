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
          {{ isDeleting ? 'Excluindo...' : 'Excluir' }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User, UserList } from '@/types/user.types';
import { computed, ref } from 'vue';
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
const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

// Props
const usersList = computed<User[]>(() => {
  if (props.users) {
    return Array.isArray(props.users) ? props.users : [props.users];
  }
  return usersData.value?.users || [];
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
    deleteUser(selectedUsers.value);
  }
};
</script>

<style src="./ListStyle.css"></style>
