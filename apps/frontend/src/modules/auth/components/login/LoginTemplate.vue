<template>
  <div class="login-container main-content">
    <div class="content">
      <form data-testid="form-login" class="form-login" @submit.prevent="handleLogin">
        <img data-testid="logo" src="@/assets/images/logoqae2e-branco.jpg" alt="Logo" class="logo" />
        <h2>Bem-vindo de volta!</h2>
        <p>Por favor, entre com suas credenciais abaixo:</p>

        <div class="form-group-login">
          <label for="email" data-testid="label-email">Insira seu E-mail</label>
          <input
            data-testid="input-email"
            type="email"
            id="email"
            autocomplete="username"
            v-model="email"
            @blur="validateEmailField"
            @input="clearEmailError"
            :class="['input-email-login', { 'input-error': errors.email }]"
          />
          <span data-testid="message-error-email" v-if="errors.email" class="error-message">
            {{ errors.email }}
          </span>
        </div>

        <div class="form-group-login">
          <label for="password" data-testid="label-password">Insira sua Senha</label>
          <input
            data-testid="input-password"
            type="password"
            id="password"
            autocomplete="current-password"
            v-model="password"
            @blur="validatePasswordField"
            @input="clearPasswordError"
            :class="['input-password-login', { 'input-error': errors.password }]"
          />
          <span data-testid="message-error-password" v-if="errors.password" class="error-message">
            {{ errors.password }}
          </span>
        </div>

        <button data-testid="btn-login" class="btn btn-login" type="submit" :disabled="!isFormValid || isPending">
          {{ isPending ? 'Entrando...' : 'Entrar na Conta' }}
        </button>

        <div class="link-container">
          <a data-testid="link-recover-password" href="/recover-password" class="link recover-password"> Esqueceu a senha? </a>
          <a data-testid="link-signup" href="/signup" class="link signup"> Criar uma nova conta </a>
        </div>

        <p v-if="error" class="error-message">
          {{ error?.message }}
        </p>
      </form>

      <p class="message-user-login">
        <strong>Atenção:</strong> Para acessar com as credenciais padrão, utilize o e-mail <em>generic@example.com</em> e a senha <em>123456</em>.
        Essas informações foram geradas automaticamente pelo seeder para facilitar testes e demonstrações.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LoginFormData, LoginFormErrors } from '@/types/user.types';
import { validateLoginFormData } from '@/utils/validateLogin';
import { computed, ref, watch } from 'vue';
import { useLoginUser } from '../../../../composables/useLoginUser';

const email = ref<string>('');
const password = ref<string>('');
const errors = ref<LoginFormErrors>({ email: '', password: '' });

const { mutate, isPending, error } = useLoginUser();

const isFormValid = computed(() => {
  return email.value.trim() !== '' && password.value.trim() !== '' && !errors.value.email && !errors.value.password;
});

watch(email, (newValue: string) => {
  if (newValue && errors.value.email) {
    validateEmailField();
  }
});

watch(password, (newValue: string) => {
  if (newValue && errors.value.password) {
    validatePasswordField();
  }
});

const validateEmailField = (): void => {
  const formData: LoginFormData = {
    email: email.value,
    password: password.value,
  };
  const validation = validateLoginFormData(formData);
  errors.value.email = validation.errors.email || '';
};

const validatePasswordField = (): void => {
  const formData: LoginFormData = {
    email: email.value,
    password: password.value,
  };
  const validation = validateLoginFormData(formData);
  errors.value.password = validation.errors.password || '';
};

const clearEmailError = (): void => {
  if (errors.value.email) {
    errors.value.email = '';
  }
};

const clearPasswordError = (): void => {
  if (errors.value.password) {
    errors.value.password = '';
  }
};

const validateForm = (): boolean => {
  const formData: LoginFormData = {
    email: email.value,
    password: password.value,
  };
  const validation = validateLoginFormData(formData);
  errors.value = validation.errors;
  return validation.isValid;
};

const handleLogin = (): void => {
  if (validateForm()) {
    mutate({
      email: email.value.trim(),
      password: password.value.trim(),
    });
  }
};
</script>

<style src="./LoginStyle.css"></style>
