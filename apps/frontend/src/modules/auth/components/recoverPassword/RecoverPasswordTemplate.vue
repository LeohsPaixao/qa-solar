<template>
  <div class="recover-password-container main-content">
    <form data-testid="form-recover-password" class="form-recover-password" @submit.prevent="handleRecoverPassword">
      <img data-testid="logo-recover-password" src="@/assets/images/logoqae2e-branco.jpg" alt="Logo" class="logo" />
      <h2>Recuperar Senha</h2>
      <p>Por favor, insira o seu e-mail para recuperar a senha:</p>

      <div class="form-group-recover-password">
        <label class="label-email" for="email" data-testid="label-email-recover-password">E-mail</label>
        <input
          data-testid="input-email-recover-password"
          type="email"
          id="email"
          v-model="email"
          class="input-email-recover-password"
          placeholder="Digite seu e-mail"
          required
          @blur="validateEmailField"
          @input="clearEmailError"
          :class="['input-email-recover-password', { 'input-error': errors.email }]"
        />
        <span data-testid="message-error-email-recover-password" v-if="errors.email" class="error-message">
          {{ errors.email }}
        </span>
      </div>
      <button data-testid="btn-recover-password" class="btn btn-recover btn-recover-password" type="submit">Recuperar a senha</button>
      <div class="link-container">
        <router-link to="/" data-testid="link-go-to-login" class="link-go-to-login"> Voltar ao Login </router-link>
      </div>
    </form>
    <p class="message-user-recover-password">
      <strong>Atenção:</strong> Este projeto não realiza envio de e-mails. Certifique-se de testar apenas para fins de validação da interface.
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useForgotPassword } from '../../../../composables/useForgotPassword';
import { validateEmail } from '../../../../utils/validateLogin';

const email = ref('');
const errors = ref({ email: '' });

// Composables
const mutation = useForgotPassword();

watch(email, (newValue) => {
  if (newValue && errors.value.email) {
    validateEmailField();
  }
});

const validateEmailField = () => {
  errors.value.email = validateEmail(email.value);
};

const clearEmailError = () => {
  if (errors.value.email) {
    errors.value.email = '';
  }
};

const handleRecoverPassword = () => {
  if (!email.value) {
    return;
  }

  mutation.mutate(email.value);
};
</script>

<style src="./RecoverPasswordStyle.css"></style>
