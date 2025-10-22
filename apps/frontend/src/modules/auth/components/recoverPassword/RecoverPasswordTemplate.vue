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
          autocomplete="username"
          v-model="email"
          class="input-email-recover-password"
          placeholder="Digite seu e-mail"
          required
          @blur="validateEmailField"
          :class="['input-email-recover-password', { 'input-error': errors.email }]"
        />
        <span data-testid="message-error-email-recover-password" v-if="errors.email" class="error-message">
          {{ errors.email }}
        </span>
      </div>
      <button data-testid="btn-recover-password" class="btn btn-recover btn-recover-password" type="submit" :disabled="!isFormValid || isPending">
        {{ isPending ? 'Enviando e-mail...' : 'Enviar instruções' }}
      </button>
      <div class="link-container">
        <router-link to="/" data-testid="link-go-to-login" class="link-go-to-login"> Voltar ao Login </router-link>
      </div>
    </form>
    <p class="message-user-recover-password">
      <strong>Atenção:</strong> Este projeto não realiza envio de e-mails. Certifique-se de testar apenas para fins de validação da interface.
    </p>
  </div>
</template>

<script setup lang="ts">
import type { ApiErrorResponse } from '@/types/error.types';
import type { ForgotPasswordFormData, ForgotPasswordFormErrors } from '@/types/user.types';
import { validateForgotPasswordFormData } from '@/utils/validateForgotPasswordFormData';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useForgotPassword } from '../../../../composables/useForgotPassword';

const email = ref<string>('');
const errors = ref<ForgotPasswordFormErrors>({ email: '' });

const { mutate: sendForgotPasswordEmailMutation, isPending } = useForgotPassword();
const router = useRouter();

const isFormValid = computed(() => {
  return email.value.trim() !== '' && !errors.value.email;
});

watch(email, (newValue: string) => {
  if (newValue && errors.value.email) {
    validateEmailField();
  }
});

const validateEmailField = (): void => {
  const formData: ForgotPasswordFormData = {
    email: email.value,
  };
  const validation = validateForgotPasswordFormData(formData);
  errors.value.email = validation.errors.email || '';
};

const handleRecoverPassword = (): void => {
  if (!errors.value.email) {
    sendForgotPasswordEmailMutation(
      { email: email.value.trim() },
      {
        onSuccess: async (): Promise<void> => {
          await router.push('/');
          toast.success('Um e-mail foi enviado com instruções para recuperar a senha.', { autoClose: 3000 });
        },
        onError: (error: ApiErrorResponse): void => {
          toast.error(error.response?.data?.message || 'Erro ao enviar e-mail de recuperação de senha', { autoClose: 5000 });
        },
      },
    );
  }
};
</script>

<style src="./RecoverPasswordStyle.css"></style>
