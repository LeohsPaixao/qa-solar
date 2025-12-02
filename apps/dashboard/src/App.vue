<template>
  <div id="app">
    <nav class="navigation">
      <router-link to="/" class="nav-link">Overview</router-link>
      <router-link to="/frameworks" class="nav-link">Frameworks</router-link>
      <router-link to="/tests" class="nav-link">Tests</router-link>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
// App component with router navigation
</script>

<style scoped>
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}

.navigation {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-link {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #646cff;
  border-radius: 4px;
  transition: all 0.3s;
}

.nav-link:hover {
  background-color: rgba(100, 108, 255, 0.1);
  color: #535bf2;
}

.nav-link.router-link-active {
  background-color: rgba(100, 108, 255, 0.2);
  color: #535bf2;
  font-weight: 500;
}

.main-content {
  min-height: 60vh;
}
</style>
