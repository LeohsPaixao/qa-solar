<template>
  <div class="framework-page">
    <h1 v-if="frameworkName">Framework: {{ frameworkName }}</h1>
    <h1 v-else>Frameworks</h1>
    <p>Página de detalhes dos frameworks de teste</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const frameworkName = computed(() => route.params.name as string | undefined);
</script>

<style scoped>
.framework-page {
  padding: 2rem;
}
</style>
