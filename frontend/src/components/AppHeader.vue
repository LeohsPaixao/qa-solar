<template>
  <header class="app-header">
    <nav>
      <ul>
        <li><router-link to="/home">Home</router-link></li>
      </ul>
    </nav>
    <div class="user-dropdown" @click="toggleDropdown">
      <svg-icon type="mdi" :path="mdiAccountCircle" class="user-avatar" />
      <span>Leo Paixão</span>
      <ul v-if="dropdownOpen" class="dropdown-menu">
        <li @click="goToProfile">Perfil</li>
        <li @click="logout">Sair</li>
      </ul>
    </div>
  </header>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccountCircle } from '@mdi/js';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'AppHeader',
  components: {
    SvgIcon,
  },
  setup() {
    const dropdownOpen = ref(false);
    const router = useRouter();

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value;
    };

    const closeDropdown = () => {
      dropdownOpen.value = false;
    };

    const handleClickOutside = (event) => {
      const dropdown = document.querySelector('.user-dropdown');
      if (dropdown && !dropdown.contains(event.target)) {
        closeDropdown();
      }
    };

    const goToProfile = () => {
      closeDropdown();
      router.push('/profile');
    };

    const logout = () => {
      closeDropdown();
      localStorage.clear();
      sessionStorage.clear();
      router.push('/login');
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      dropdownOpen,
      toggleDropdown,
      closeDropdown,
      goToProfile,
      logout,
      mdiAccountCircle,
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
  font-family: 'Arial', sans-serif;
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
  border: 1px solid #ddd; /* Borda simples */
  border-radius: 6px; /* Bordas arredondadas */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombras suaves */
  list-style: none;
  padding: 0.5rem; /* Espaço interno */
  margin: 0.5rem 0; /* Distância do scroll */
  z-index: 1000;
  display: flex;
  flex-direction: column; /* Alinhamento vertical */
  gap: 0.1rem; /* Espaço entre itens */
}

.dropdown-menu li {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  color: #333;
  border-radius: 4px; /* Arredondar opções */
}

.dropdown-menu li:hover {
  background-color: #f5f5f5;
}
</style>
