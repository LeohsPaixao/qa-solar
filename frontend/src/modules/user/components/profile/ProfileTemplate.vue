<template>
  <div class="profile-page">
    <h1 class="title">Perfil</h1>
    <div class="profile-container">
      <div class="form-group">
        <label for="fullName">Nome Completo</label>
        <input id="fullName" type="text" placeholder="Digite seu nome completo" />
      </div>
      <div class="form-group">
        <label for="socialName">Nome Social</label>
        <input id="socialName" type="text" placeholder="Digite seu nome social (opcional)" />
      </div>
      <div class="form-group">
        <label for="phone">Telefone</label>
        <input id="phone" type="tel" placeholder="(00) 00000-0000" />
      </div>
      <div class="form-group">
        <label for="cpfCnpj">CPF ou CNPJ</label>
        <input id="cpfCnpj" type="text" placeholder="Digite seu CPF ou CNPJ" />
      </div>
      <button type="submit" class="save-button">Salvar</button>
    </div>
  </div>
</template>

<script setup></script>

<style src="./ProfileStyle.css"></style>
