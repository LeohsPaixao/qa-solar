<template>
  <div class="login-container">
    <div class="content">
      <form data-testid="form-login" class="form-login" @submit.prevent="handleLogin">
        <img data-testid="logo" src="@/assets/images/logoqae2e-branco.jpg" alt="Logo" class="logo" />
        <h2>Bem-vindo de volta!</h2>
        <p>Por favor, entre com suas credenciais abaixo:</p>
        <div class="form-group-login">
          <label for="email">Insira seu E-mail</label>
          <input
            data-testid="input-email"
            type="email"
            id="email"
            autocomplete="username"
            v-model="email"
            :class="['input-email-login', { 'input-error': errors.email }]"
          />
          <span data-testid="message-error-email" v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>
        <div class="form-group-login">
          <label for="password">Insira sua Senha</label>
          <input
            data-testid="input-password"
            type="password"
            id="password"
            autocomplete="current-password"
            v-model="password"
            :class="['input-password-login', { 'input-error': errors.password }]"
          />
          <span data-testid="message-error-password" v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>
        <button data-testid="btn-login" class="btn btn-login" type="submit" :disabled="!isButtonEnabled || mutation.isLoading">
          <span v-if="mutation.isLoading">Entrando...</span>
          <span v-else>Entrar na Conta</span>
        </button>
        <div class="link-container">
          <a data-testid="link-recover-password" href="/recover-password" class="link recover-password">Esqueceu a senha?</a>
          <a data-testid="link-signup" href="/signup" class="link signup">Criar uma nova conta</a>
        </div>
        <p v-if="mutation.isError" class="error-message">{{ mutation.error?.message }}</p>
      </form>
      <p class="message-user-login">
        <strong>Atenção:</strong> Para acessar com as credenciais padrão, utilize o e-mail <em>generic@example.com</em> e a senha <em>123456</em>.
        Essas informações foram geradas automaticamente pelo seeder para facilitar testes e demonstrações.
      </p>
    </div>
  </div>
</template>

<script setup>
import { validateEmail, validatePassword } from '@/utils/validateLogin';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useLoginUser } from '../../../../hooks/useLoginUser.js';

const email = ref('');
const password = ref('');
const errors = ref({ email: '', password: '' });
const isButtonEnabled = computed(() => email.value.trim() !== '' && password.value.trim() !== '');
const mutation = useLoginUser();
const router = useRouter();

const validateForm = () => {
  const emailError = validateEmail(email.value);
  const passwordError = validatePassword(password.value);

  errors.value = {
    email: emailError,
    password: passwordError,
  };

  return !emailError && !passwordError;
};

const handleLogin = () => {
  if (validateForm()) {
    mutation.mutate(
      { email: email.value, password: password.value },
      {
        onSuccess: (response) => {
          window.localStorage.setItem('user-token', response.token);
          window.localStorage.setItem('user-email', email.value);

          toast.success(response.message, { autoClose: 1500 });

          setTimeout(() => {
            router.push('/home').then(() => {
              window.location.reload();
            });
          }, 1500);
        },
        onError: (error) => {
          const errorMessage = error.response?.data?.message || 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
          toast.error(errorMessage, { autoClose: 5000 });
        },
      },
    );
  } else {
    toast.error('Por favor, corrija os erros no formulário.', {
      autoClose: 5000,
    });
  }
};
</script>

<style src="./LoginStyle.css"></style>
