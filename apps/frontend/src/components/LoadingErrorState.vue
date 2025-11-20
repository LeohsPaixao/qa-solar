<template>
  <div v-if="isLoading" data-testid="loading-container" class="loading-container">
    <p data-testid="loading-message">Carregando...</p>
    <div data-testid="spinner" class="spinner" />
  </div>
  <div v-else-if="isError" data-testid="error-container" class="error-container">
    <p data-testid="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import type { ErrorProps } from '@/types/error.types';

withDefaults(defineProps<ErrorProps>(), {
  isLoading: false,
  isError: false,
  errorMessage: 'Erro ao carregar os dados do usuário.',
});
</script>

<style scoped>
.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  text-align: center;
  padding: 2rem;
}

.loading-container p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #666;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.error-container {
  color: rgb(255, 0, 0);
}

.error-container p {
  font-size: 1.1rem;
  margin: 0;
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
