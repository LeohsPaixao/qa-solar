<template>
  <header data-testid="app-header" class="app-header">
    <nav data-testid="nav-menu" class="nav-menu">
      <ul data-testid="nav-list" class="nav-list">
        <li data-testid="nav-item" class="nav-item">
          <router-link to="/home" data-testid="link-home" class="nav-link">Home</router-link>
        </li>
        <li data-testid="nav-item" class="nav-item">
          <router-link to="/listusers" data-testid="link-table-users" class="nav-link">Table Users</router-link>
        </li>
      </ul>
    </nav>

    <div data-testid="user-dropdown" class="user-dropdown" @click="toggleDropdown" ref="dropdownRef">
      <svg-icon data-testid="user-avatar" type="mdi" :path="mdiAccountCircle" class="user-avatar" />
      <span data-testid="user-name" class="user-name">{{ user?.full_name || 'Usuário' }}</span>

      <ul v-if="dropdownOpen" class="dropdown-menu" data-testid="dropdown-profile">
        <li class="dropdown-item" data-testid="dropdown-profile-update" @click="goToProfile">Perfil</li>
        <li class="dropdown-item" data-testid="dropdown-profile-logout" @click="handleLogout">Sair</li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccountCircle } from '@mdi/js';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFetchUser } from '../composables/useFetchUser';
import { useLogout } from '../composables/useLogoutUser';
import type { Props, User } from '../types/user.types';

const props = defineProps<Props>();

const router = useRouter();
const { mutate: logout } = useLogout();
const { data: fetchedUser } = useFetchUser();

const dropdownOpen = ref<boolean>(false);
const dropdownRef = ref<HTMLElement | null>(null);

const user = computed<User | undefined>(() => {
  return props.user || fetchedUser.value;
});

const toggleDropdown = (): void => {
  dropdownOpen.value = !dropdownOpen.value;
};

const closeDropdown = (): void => {
  dropdownOpen.value = false;
};

const goToProfile = (): void => {
  closeDropdown();
  router.push('/profile');
};

const handleLogout = (): void => {
  closeDropdown();
  logout();
};

const handleClickOutside = (event: Event): void => {
  const target = event.target as HTMLElement;
  if (dropdownRef.value && !dropdownRef.value.contains(target)) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.app-header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  list-style: outside none none;
  background-color: white;
  align-items: center;
  padding: 0.5rem 0;
  display: flex;
  z-index: 1000;
  width: 100%;
}

.nav-menu {
  display: flex;
  justify-content: space-between;
  list-style: outside none disc;
}

.nav-list {
  list-style: none;
  display: flex;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 0;
  padding: 1rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.2s ease;
  padding: 0.5rem 0;
  position: relative;
}

.nav-link:hover {
  color: #4caf50;
}

.nav-link.router-link-active {
  color: #4caf50;
  font-weight: 600;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #4caf50;
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  margin-right: 1rem;
  cursor: pointer;
  background-color: white;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  transition: all 0.2s ease;
}

.user-dropdown:hover {
  border-color: #4caf50;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.15);
}

.user-avatar {
  width: 32px;
  height: 32px;
  color: #666;
}

.user-name {
  font-weight: 500;
  color: #333;
  font-size: 0.95rem;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: white;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  list-style: none;
  padding: 0.5rem;
  margin: 0;
  z-index: 1001;
  min-width: 150px;
}

.dropdown-item {
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  color: #333;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  font-weight: 500;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
  color: #4caf50;
}

.dropdown-item:active {
  background-color: #e9ecef;
}

@media (max-width: 768px) {
  .app-header {
    padding: 1rem;
  }

  .nav-list {
    gap: 1rem;
  }

  .nav-link {
    font-size: 0.9rem;
  }

  .user-dropdown {
    padding: 0.5rem 0.75rem;
  }

  .user-name {
    display: none;
  }
}
</style>
