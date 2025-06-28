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
            :class="['input-fullname-profile', { 'input-error': formErrors.fullName && isSubmitted }]"
          />
          <span data-testid="input-error-fulname-profile" v-if="formErrors.fullName && isSubmitted" class="error-message">{{
            formErrors.fullName
          }}</span>
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
            v-model="phone"
            :class="['input-phone-profile', { 'input-error': formErrors.phone && isSubmitted }]"
          />
          <span data-testid="input-error-phone-profile" v-if="formErrors.phone && isSubmitted" class="error-message">{{ formErrors.phone }}</span>
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
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import LoadingErrorState from '@/components/LoadingErrorState.vue';
import type { Props, UpdateUserData, User } from '@/types/user.types';
import { validateProfile } from '@/utils/validateProfile';
import { computed, ref, watchEffect } from 'vue';
import { useFetchUser } from '../../../../composables/useFetchUser';
import { useUpdateUser } from '../../../../composables/useUpdateUser';

const fullName = ref<string>('');
const socialName = ref<string>('');
const phone = ref<string>('');
const cpfCnpj = ref<string>('');
const originalData = ref<User>({} as User);
const isSubmitted = ref<boolean>(false);
const formErrors = ref<{ fullName?: string; phone?: string }>({});

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
    socialName.value = user.value.social_name || '';
    phone.value = user.value.phone || '';
    cpfCnpj.value = user.value.document || '';
    originalData.value = {
      ...user.value,
    };
  }
});

const hasChanges = computed(() => {
  return (
    fullName.value !== (originalData.value.full_name || '') ||
    socialName.value !== (originalData.value.social_name || '') ||
    phone.value !== (originalData.value.phone || '')
  );
});

function handleSave() {
  isSubmitted.value = true;
  const formData: UpdateUserData = {
    full_name: fullName.value,
    social_name: socialName.value,
    phone: phone.value,
  };
  const { isValid, errors } = validateProfile({ fullName: fullName.value, phone: phone.value });
  formErrors.value = errors;
  if (!isValid) {
    return;
  }
  updateUser(formData, {
    onSuccess: () => {
      originalData.value = { ...originalData.value, ...formData };
      isSubmitted.value = false;
    },
  });
}
</script>

<style src="./ProfileStyle.css"></style>
