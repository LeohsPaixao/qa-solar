<template>
  <LoadingErrorState :isLoading="isLoadingFetch" :isError="isError" />
  <div v-if="!isLoadingFetch && !isError" data-testid="profile-page" class="profile-page main-content">
    <form data-testid="form-profile" class="form-profile">
      <h1 data-testid="profile-title" class="title">Perfil</h1>
      <div data-testid="profile-container-form" class="profile-container">
        <div class="form-group">
          <label for="fullName">Nome Completo</label>
          <input
            data-testid="input-fullname-profile"
            id="fullName"
            type="text"
            placeholder="Digite seu nome completo"
            v-model="fullName"
            @blur="validateFullNameField"
            :class="['input-fullname-profile', { 'input-error': errors.full_name }]"
          />
          <span data-testid="input-error-fulname-profile" v-if="errors.full_name" class="error-message">{{ errors.full_name }}</span>
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
          <input
            data-testid="input-phone-profile"
            id="phone"
            type="tel"
            placeholder="(00) 00000-0000"
            v-model="phone_number"
            @blur="validatePhoneField"
            :class="['input-phone-profile', { 'input-error': errors.phone_number }]"
          />
          <span data-testid="input-error-phone-profile" v-if="errors.phone_number" class="error-message">{{ errors.phone_number }}</span>
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
            :disabled="!hasChanges || isUpdating || !isFormValid"
            @click="handleSave"
          >
            {{ isUpdating ? 'Salvando...' : 'Salvar' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import LoadingErrorState from '@/components/LoadingErrorState.vue';
import type { Props, UpdateUserData, User } from '@/types/user.types';
import { validateFullName, validatePhone } from '@/utils/validateProfile';
import { computed, ref, watch, watchEffect } from 'vue';
import { useFetchUser } from '../../../../composables/useFetchUser';
import { useUpdateUser } from '../../../../composables/useUpdateUser';

const fullName = ref('');
const phone_number = ref('');
const socialName = ref('');
const cpfCnpj = ref('');
const errors = ref({ full_name: '', phone_number: '' });

const props = defineProps<Props>();

const { data: fetchedUser, isLoading: isLoadingFetch, isError } = useFetchUser();
const mutation = useUpdateUser();
const updateUser = mutation.mutate;
const isUpdating = mutation.isPending;

watchEffect(() => {
  const user = computed<User | undefined>(() => {
    if (props.user) {
      return Array.isArray(props.user) ? props.user[0] : props.user;
    }
    return fetchedUser.value;
  });

  if (user.value) {
    fullName.value = user.value.full_name || '';
    phone_number.value = user.value.phone || '';
    socialName.value = user.value.social_name || '';
    cpfCnpj.value = user.value.document || '';
  }
});

const isFormValid = computed(() => {
  return fullName.value.trim() !== '' && phone_number.value.trim() !== '' && !errors.value.full_name && !errors.value.phone_number;
});

const hasChanges = computed(() => {
  const user = props.user ? (Array.isArray(props.user) ? props.user[0] : props.user) : fetchedUser.value;
  if (!user) {
    return false;
  }

  return fullName.value !== (user.full_name || '') || socialName.value !== (user.social_name || '') || phone_number.value !== (user.phone || '');
});

watch(fullName, (newValue) => {
  if (newValue && errors.value.full_name) {
    validateFullNameField();
  }
});

watch(phone_number, (newValue) => {
  if (newValue && errors.value.phone_number) {
    validatePhoneField();
  }
});

const validateFullNameField = () => {
  errors.value.full_name = validateFullName(fullName.value);
};

const validatePhoneField = () => {
  errors.value.phone_number = validatePhone(phone_number.value);
};

const validateForm = () => {
  validateFullNameField();
  validatePhoneField();
  return !errors.value.full_name && !errors.value.phone_number;
};

const handleSave = () => {
  if (validateForm()) {
    const updateData: UpdateUserData = {
      full_name: fullName.value.trim(),
      social_name: socialName.value.trim(),
      phone_number: phone_number.value.trim(),
    };

    updateUser(updateData);
  }
};
</script>

<style src="./ProfileStyle.css"></style>
