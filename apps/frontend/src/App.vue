<template>
  <div id="app" class="app-container">
    <AppHeader v-if="canShowHeader" />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter v-if="canShowFooter" />
  </div>
</template>

<script setup>
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';
import { computed } from 'vue';
import { RouterView, useRouter } from 'vue-router';

const { currentRoute } = useRouter();

const canShowHeader = computed(
  () => currentRoute.value.path !== '/' && currentRoute.value.path !== '/signup' && currentRoute.value.path !== '/recover-password',
);

const canShowFooter = computed(
  () => currentRoute.value.path !== '/' && currentRoute.value.path !== '/signup' && currentRoute.value.path !== '/recover-password',
);
</script>

<style src="./assets/styles/main.css"></style>
<style src="./assets/styles/toast.css"></style>
