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
            v-model="formData.full_name"
            @blur="validateField('full_name')"
            :class="['input-fullname-profile', { 'input-error': formErrors.full_name }]"
          />
          <span data-testid="input-error-fulname-profile" v-if="formErrors.full_name" class="error-message">{{ formErrors.full_name }}</span>
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
            v-model="formData.phone"
            @blur="validateField('phone')"
            :class="['input-phone-profile', { 'input-error': formErrors.phone }]"
          />
          <span data-testid="input-error-phone-profile" v-if="formErrors.phone" class="error-message">{{ formErrors.phone }}</span>
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
import type { FormDataProfile, FormErrorsProfile, Props, UpdateUserData, User } from '@/types/user.types';
import { validateProfile } from '@/utils/validateProfile';
import { computed, reactive, ref, watch, watchEffect } from 'vue';
import { useFetchUser } from '../../../../composables/useFetchUser';
import { useUpdateUser } from '../../../../composables/useUpdateUser';

const formData = reactive<FormDataProfile>({
  full_name: '',
  phone: '',
});

const socialName = ref<string>('');
const cpfCnpj = ref<string>('');
const originalData = ref<User>({} as User);
const formErrors = reactive<FormErrorsProfile>({
  full_name: '',
  phone: '',
});

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
    formData.full_name = user.value.full_name || '';
    formData.phone = user.value.phone || '';
    socialName.value = user.value.social_name || '';
    cpfCnpj.value = user.value.document || '';
    originalData.value = {
      ...user.value,
    };
  }
});

const isFormValid = computed(() => {
  const result = validateProfile(formData);
  return result.isValid;
});

const hasChanges = computed(() => {
  return (
    formData.full_name !== (originalData.value.full_name || '') ||
    socialName.value !== (originalData.value.social_name || '') ||
    formData.phone !== (originalData.value.phone || '')
  );
});

watch(
  () => formData.full_name,
  (newValue) => {
    if (newValue) {
      const result = validateProfile({ ...formData, full_name: newValue });
      formErrors.full_name = result.errors.full_name || '';
    } else {
      formErrors.full_name = '';
    }
  },
);

watch(
  () => formData.phone,
  (newValue) => {
    if (newValue) {
      const result = validateProfile({ ...formData, phone: newValue });
      formErrors.phone = result.errors.phone || '';
    } else {
      formErrors.phone = '';
    }
  },
);

function validateField(field: keyof FormErrorsProfile): void {
  const result = validateProfile(formData);
  formErrors[field] = result.errors[field] || '';
}

function handleSave() {
  const updateData: UpdateUserData = {
    full_name: formData.full_name,
    social_name: socialName.value,
    phone: formData.phone,
  };

  const { isValid, errors } = validateProfile(formData);
  Object.assign(formErrors, errors);

  if (!isValid) {
    return;
  }

  updateUser(updateData, {
    onSuccess: () => {
      originalData.value = { ...originalData.value, ...updateData };
    },
  });
}
</script>

<style src="./ProfileStyle.css"></style>
