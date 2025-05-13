<template>
  <div v-if="isLoading" class="loading-container">
    <p>Carregando...</p>
    <div class="spinner"></div>
  </div>
  <div v-else-if="isError" class="error-container">
    <p>Erro ao carregar os dados do usuário.</p>
  </div>
</template>

<script setup>
defineProps({
  isLoading: Boolean,
  isError: Boolean,
});
</script>

<style scoped>
.loading-container,
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  text-align: center;
}

.spinner {
  margin-top: 10px;
  width: 40px;
  height: 40px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.error-container {
  color: red;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
