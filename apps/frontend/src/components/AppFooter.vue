<template>
  <footer class="app-footer">
    <p class="message-footer">© 2024 QA Solar - Todos os direitos reservados</p>
    <a href="https://github.com/LeohsPaixao/qa-solar" target="_blank" rel="noopener noreferrer" class="github-link">
      <img src="@/assets/images/github-mark-white.svg" alt="GitHub" class="github-icon" />
    </a>
  </footer>
</template>

<script setup></script>

<style scoped>
.app-footer {
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  background-color: white;
  z-index: 99;
  width: 100%;
  height: 3vh;
  display: flex;
  flex-wrap: wrap;
  padding: rem(30) 0;
}

.github-link {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.github-icon {
  width: 20px;
  height: 20px;
  filter: invert(100%);
  left: 1.5rem;
}

.message-footer {
  font-size: 0.8rem;
  margin: 0;
  right: 1.5rem;
}
</style>
