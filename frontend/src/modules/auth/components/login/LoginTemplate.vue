<template>
  <div class="login-container">
    <div class="content">
      <form data-testid="form" @submit.prevent="handleLogin">
        <img data-testid="logo" src="@/assets/images/logoqae2e-branco.jpg" alt="Logo" class="logo" />
        <h2>Bem-vindo de volta!</h2>
        <p>Por favor, entre com suas credenciais abaixo:</p>
        <div class="form-group">
          <label for="email">Insira seu E-mail</label>
          <input
            data-testid="input-email"
            type="email"
            id="email"
            v-model="email"
            :class="['input-email', { 'input-error': errors.email }]"
          />
          <span data-testid="message-error-email" v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>
        <div class="form-group">
          <label for="password">Insira sua Senha</label>
          <input
            data-testid="input-password"
            type="password"
            id="password"
            v-model="password"
            :class="['input-password', { 'input-error': errors.password }]"
          />
          <span data-testid="message-error-password" v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>
        <button data-testid="btn-login" class="btn btn-login" type="submit" :disabled="!isButtonEnabled">Entrar na Conta</button>
        <div class="link-container">
          <a data-testid="link-recover-password" href="/recover-password" class="link recover-password">Esqueceu a senha?</a>
          <a data-testid="link-singup" href="/signup" class="link signup">Criar uma nova conta</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { loginUser } from '@/services/api';
import { validateEmail, validatePassword } from '@/utils/validateLogin';
import { computed, ref } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const email = ref('');
const password = ref('');
const errors = ref({ email: '', password: '' });

const isButtonEnabled = computed(() => email.value.trim() !== '' && password.value.trim() !== '');

const validateForm = () => {
  const emailError = validateEmail(email.value);
  const passwordError = validatePassword(password.value);

  errors.value = {
    email: emailError,
    password: passwordError,
  };

  return !emailError && !passwordError;
};

const handleLogin = async () => {
  const isValid = validateForm();
  if (isValid) {
    try {
      const loginData = { email: email.value, password: password.value };
      const response = await loginUser(loginData);

      toast.success(response.message, { autoClose: 3000 });
      window.localStorage.setItem('user-token', response.token);
    } catch (error) {
      toast.error(error.message, { autoClose: 5000 });
    }
  } else {
    toast.error('Por favor, corrija os erros no formulário.', {
      autoClose: 5000,
    });
  }
};
</script>

<style src="./LoginStyle.css"></style>
