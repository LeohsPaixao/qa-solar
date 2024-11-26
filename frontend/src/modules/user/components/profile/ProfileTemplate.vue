<template>
  <div data-testid="profile-page" class="profile-page">
    <h1 data-testid="profile-title" class="title">Perfil</h1>
    <div data-testid="profile-container-form" class="profile-container">
      <div class="form-group">
        <label for="fullName">Nome Completo</label>
        <input data-testid="input-fullname-profile" id="fullName" type="text" placeholder="Digite seu nome completo" />
      </div>
      <div class="form-group">
        <label for="socialName">Nome Social</label>
        <input data-testid="input-socialname-profile" id="socialName" type="text" placeholder="Digite seu nome social (opcional)" />
      </div>
      <div class="form-group">
        <label for="phone">Telefone</label>
        <input data-testid="input-phone-profile" id="phone" type="tel" placeholder="(00) 00000-0000" />
      </div>
      <div class="form-group">
        <label for="cpfCnpj">CPF ou CNPJ</label>
        <input data-testid="input-cpfcnpj-profile" id="cpfCnpj" type="text" placeholder="Digite seu CPF ou CNPJ" />
      </div>
      <button data-testid="btn-save-profile" type="submit" class="btn btn-save save-button">Salvar</button>
    </div>
  </div>
</template>

<script setup></script>

<style src="./ProfileStyle.css"></style>
