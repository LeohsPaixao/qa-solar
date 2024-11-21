<template>
  <div class="login-container">
    <div class="content">
      <img src="@/assets/images/logoqae2e.jpg" alt="Logo" class="logo" />
      <form @submit.prevent="handleLogin">
        <h2>Bem-vindo de volta!</h2>
        <p>Por favor, entre com suas credenciais abaixo:</p>
        <div class="form-group">
          <label for="email">Insira o Email</label>
          <input type="email" id="email" v-model="email" :class="{ 'input-error': errors.email }" />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>
        <div class="form-group">
          <label for="password">Insira a Senha</label>
          <input type="password" id="password" v-model="password" :class="{ 'input-error': errors.password }" />
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>
        <button type="submit" :disabled="isSubmitting">Entrar na Conta</button>
        <div class="link-container">
          <a href="/recover-password" class="link">Esqueceu a senha?</a>
          <a href="/signup" class="link">Criar uma nova conta</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { toast } from 'vue3-toastify'; // Importa a função toast
import 'vue3-toastify/dist/index.css';
import * as yup from 'yup';

const loginSchema = yup.object({
  email: yup.string().email('Por favor, insira um email válido').required('O email é obrigatório'),
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('A senha é obrigatória'),
});

const email = ref('');
const password = ref('');
const isSubmitting = ref(false);
const errors = ref({
  email: '',
  password: '',
});

// Validação do formulário
const validateForm = async () => {
  try {
    await loginSchema.validate(
      { email: email.value, password: password.value },
      { abortEarly: false }
    );
    errors.value = { email: '', password: '' };
    return true;
  } catch (err) {
    console.log('Erros de validação:', err);
    const validationErrors = err.inner.reduce((acc, curr) => {
      acc[curr.path] = curr.message;
      return acc;
    }, {});
    errors.value = validationErrors;
    return false;
  }
};

// Função de login
const handleLogin = async () => {
  isSubmitting.value = true;

  const isValid = await validateForm();
  if (isValid) {
    toast.success('Login realizado com sucesso!', {
      autoClose: 3000,
    });
  } else {
    toast.error('Por favor, corrija os erros no formulário.', {
      autoClose: 5000,
    });
  }

  isSubmitting.value = false;
};
</script>

<style src="./LoginStyle.css"></style>
