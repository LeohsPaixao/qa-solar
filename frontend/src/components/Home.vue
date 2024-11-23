<template>
  <div class="main-container">
    <div class="logo-container">
      <img src="@/assets/images/logoqae2e.jpg" alt="Logo QA E2E" class="logo" />
      <div class="project-description">
        <p>
          Este projeto é <strong>Open Source</strong> e visa servir para fins de
          <strong>UI Tests</strong>, utilizando diversos frameworks de testes. Ele pode servir como
          um "Hello World" para os frameworks de testes. Atualmente, foi pensado utilizar
          <strong>Cypress</strong>, <strong>Playwright</strong> e <strong>Robot Framework</strong>,
          mas futuramente esta lista pode aumentar.
        </p>
      </div>
    </div>
    <RouterView />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  min-height: calc(100vh - 80px);
}

.logo-container {
  text-align: center;
  margin-bottom: 2rem;
}

.project-description {
  max-width: 600px;
  text-align: center;
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
}

.project-description p {
  font-family: 'Arial', sans-serif;
  margin: 0;
}
</style>
