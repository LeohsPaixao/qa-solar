<template>
  <LoadingErrorState :isLoading="isLoadingFetch" :isError="isError" />
  <div v-if="!isLoadingFetch && !isError" data-testid="profile-page" class="profile-page">
    <h1 data-testid="profile-title" class="title">Perfil</h1>
    <div data-testid="profile-container-form" class="profile-container">
      <form data-testid="form-profile" class="form-profile">
        <div class="form-group">
          <label for="fullName">Nome Completo</label>
          <input
            data-testid="input-fullname-profile"
            id="fullName"
            type="text"
            placeholder="Digite seu nome completo"
            v-model="fullName"
            required
            :class="['input-fullname-profile', { 'input-error': !fullName && isSubmitted }]"
          />
          <span v-if="!fullName && isSubmitted" class="error-message">Este campo é obrigatório.</span>
        </div>
        <div class="form-group">
          <label for="socialName">Nome Social</label>
          <input
            data-testid="input-socialname-profile"
            id="socialName"
            type="text"
            class="input-socialname-profile"
            placeholder="Digite seu nome social (opcional)"
            v-model="socialName"
          />
        </div>
        <div class="form-group">
          <label for="phone">Telefone</label>
          <input data-testid="input-phone-profile" id="phone" type="tel" placeholder="(00) 00000-0000" v-model="phone" class="input-phone-profile" />
        </div>
        <div class="form-group">
          <label for="cpfCnpj">CPF ou CNPJ</label>
          <input
            data-testid="input-cpfcnpj-profile"
            id="cpfCnpj"
            type="text"
            class="input-cpfcnpj-profile"
            placeholder="Digite seu CPF ou CNPJ"
            v-model="cpfCnpj"
            disabled
          />
        </div>
        <div class="button-container-profile">
          <button
            data-testid="btn-save-profile"
            type="button"
            class="btn btn-save-profile save-button"
            :disabled="!hasChanges || isUpdating"
            @click="handleSave"
          >
            {{ isUpdating ? 'Salvando...' : 'Salvar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import LoadingErrorState from '@/components/LoadingErrorState.vue';
import { computed, ref, watchEffect } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useFetchUser } from '../../../../hooks/useFetchUser.js';
import { useUpdateUser } from '../../../../hooks/useUpdateUser.js';

const fullName = ref('');
const socialName = ref('');
const phone = ref('');
const cpfCnpj = ref('');
const originalData = ref({});
const isSubmitted = ref(false);

const userEmail = localStorage.getItem('user-email');

const { data: user, isLoading: isLoadingFetch, isError } = useFetchUser(userEmail);
const { mutate: updateUser, isLoading: isUpdating } = useUpdateUser();

watchEffect(() => {
  if (user.value) {
    fullName.value = user.value.full_name || '';
    socialName.value = user.value.social_name || '';
    phone.value = user.value.phone || '';
    cpfCnpj.value = user.value.document || '';

    originalData.value = {
      fullName: user.value.full_name || '',
      socialName: user.value.social_name || '',
      phone: user.value.phone || '',
      document: user.value.document || '',
    };
  }
});

const hasChanges = computed(() => {
  return (
    fullName.value !== originalData.value.fullName || socialName.value !== originalData.value.socialName || phone.value !== originalData.value.phone
  );
});

const handleSave = () => {
  isSubmitted.value = true;

  const userData = {
    fullName: fullName.value,
    socialName: socialName.value,
    phone: phone.value,
    document: cpfCnpj.value,
  };

  updateUser(userData, {
    onSuccess: (response) => {
      toast.success(response.message || 'Dados salvos com sucesso!');
      originalData.value = { ...userData.value };
      isSubmitted.value = false;
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Erro ao salvar os dados.';
      toast.error(errorMessage);
    },
  });
};
</script>

<style src="./ProfileStyle.css"></style>
