<template>
  <div class="recover-password-container">
    <form data-testid="form-recover-password" class="form-recover-password" @submit.prevent="handleRecoverPassword">
      <img data-testid="logo-recover-password" src="@/assets/images/logoqae2e-branco.jpg" alt="Logo" class="logo" />
      <h2>Recuperar Senha</h2>
      <p>Por favor, insira o seu e-mail para recuperar a senha:</p>

      <div class="form-group-recover-password">
        <label class="label-email" for="email">E-mail</label>
        <input
          data-testid="input-email-recover-password"
          type="email"
          id="email"
          v-model="email"
          class="input-email-recover-password"
          placeholder="Digite seu e-mail"
          required
        />
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useFetchEmailUser } from '../../../../hooks/useFetchEmailUser.js';

const email = ref('');
const router = useRouter();

const mutation = useFetchEmailUser();

const handleRecoverPassword = () => {
  if (!email.value) {
    toast.error('Por favor, insira um e-mail válido.', { autoClose: 3000 });
    return;
  }

  mutation.mutate(email.value, {
    onSuccess: (data) => {
      toast.success(data.message || 'Um e-mail foi enviado!', { autoClose: 3000 });
      setTimeout(() => {
        router.push('/');
      }, 3000);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Erro ao verificar e-mail';
      toast.error(errorMessage, { autoClose: 5000 });
      email.value = '';
    },
  });
};
</script>

<style src="./RecoverPasswordStyle.css"></style>
