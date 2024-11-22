<template>
  <header class="app-header">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/signup">Sign Up</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
</script>

<style scoped>
.app-header {
  background-color: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  margin-bottom: 20px;
  width: 100%;
}

.app-header ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

.app-header a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
</style>
