<template>
  <header class="app-header">
    <nav>
      <ul>
        <li><router-link to="/home">Home</router-link></li>
        <li><router-link to="/listusers">Table Users</router-link></li>
      </ul>
    </nav>
    <div class="user-dropdown" @click="toggleDropdown">
      <svg-icon type="mdi" :path="mdiAccountCircle" class="user-avatar" />
      <span>{{ user?.full_name || 'Usuário' }}</span>
      <ul data-testid="dropdown-profile" v-if="dropdownOpen" class="dropdown-menu">
        <li data-testid="dropdown-profile-update" @click="goToProfile">Perfil</li>
        <li data-testid="dropdown-profile-logout" @click="logout">Sair</li>
      </ul>
    </div>
  </header>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccountCircle } from '@mdi/js';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFetchUser } from '../hooks/useFetchUser.js';
import { useLogout } from '../hooks/useLogoutUser.js';

export default {
  name: 'AppHeader',
  components: {
    SvgIcon,
  },
  setup() {
    const dropdownOpen = ref(false);
    const router = useRouter();

    const { mutate: logout } = useLogout();
    const userEmail = localStorage.getItem('user-email');
    const { data: user, isError } = useFetchUser(userEmail);

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value;
    };

    const closeDropdown = () => {
      dropdownOpen.value = false;
    };

    const goToProfile = () => {
      closeDropdown();
      router.push('/profile');
    };

    const handleClickOutside = (event) => {
      const dropdown = document.querySelector('.user-dropdown');
      if (!dropdown.contains(event.target)) {
        closeDropdown();
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      dropdownOpen,
      toggleDropdown,
      closeDropdown,
      goToProfile,
      logout,
      mdiAccountCircle,
      user,
      isError,
    };
  },
};
</script>

<style scoped>
.app-header {
  background-color: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.app-header ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

.app-header a {
  font-family: 'Roboto', sans-serif;
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  right: 1.5rem;
  cursor: pointer;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
}

.user-avatar {
  width: 30px;
  height: 30px;
  color: #333;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0.5rem;
  margin: 0.5rem 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.dropdown-menu li {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  color: #333;
  border-radius: 4px;
}

.dropdown-menu li:hover {
  background-color: #f5f5f5;
}
</style>
