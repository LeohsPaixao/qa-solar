<template>
  <AppHeader v-if="canShowHeader" />
  <router-view />
  <AppFooter />
</template>

<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import { computed } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const { currentRoute } = useRouter()

const canShowHeader = computed(
  () => currentRoute.value.path !== '/login' && currentRoute.value.path !== '/signup',
)
</script>

<style src="./assets/styles/main.css"></style>
<style src="./assets/styles/toast.css"></style>
