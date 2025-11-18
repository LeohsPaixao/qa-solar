<template>
  <LoadingErrorState :isLoading="isLoadingFetch" :isError="isError" />
  <div v-if="!isLoadingFetch && !isError" data-testid="profile-page" class="profile-page main-content">
    <form data-testid="form-profile" class="form-profile" @submit.prevent="onSubmit">
      <h1 data-testid="profile-title" class="title">Perfil</h1>
      <div data-testid="profile-container-form" class="profile-container">
        <div class="form-group">
          <label for="fullName">Nome Completo</label>
          <Field
            data-testid="input-fullname-profile"
            id="fullName"
            type="text"
            placeholder="Digite seu nome completo"
            name="full_name"
            :class="['input-fullname-profile', { 'input-error': fullNameError }]"
          />
          <ErrorMessage data-testid="input-error-fulname-profile" name="full_name" class="error-message" />
        </div>
        <div class="form-group">
          <label for="socialName">Nome Social</label>
          <Field
            data-testid="input-socialname-profile"
            id="socialName"
            type="text"
            class="input-socialname-profile"
            placeholder="Digite seu nome social (opcional)"
            name="social_name"
          />
        </div>
        <div class="form-group">
          <label for="phone">Telefone</label>
          <Field
            data-testid="input-phone-profile"
            id="phone"
            type="tel"
            placeholder="(00) 00000-0000"
            name="phone"
            :class="['input-phone-profile', { 'input-error': phoneError }]"
          />
          <ErrorMessage data-testid="input-error-phone-profile" name="phone" class="error-message" />
        </div>
        <div class="form-group">
          <label for="cpfCnpj">CPF ou CNPJ</label>
          <Field
            data-testid="input-cpfcnpj-profile"
            id="cpfCnpj"
            type="text"
            class="input-cpfcnpj-profile"
            placeholder="Digite seu CPF ou CNPJ"
            name="document"
            disabled
          />
        </div>
        <div class="button-container-profile">
          <button data-testid="btn-save-profile" type="submit" class="btn btn-save-profile save-button" :disabled="isPending">
            {{ btnText }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import LoadingErrorState from '@/components/LoadingErrorState.vue';
import type { ApiErrorResponse } from '@/types/error.types';
import type { Props, UpdateUserData, UpdateUserResponse, User } from '@/types/user.types';
import { toTypedSchema } from '@vee-validate/yup';
import { ErrorMessage, Field, useField, useForm } from 'vee-validate';
import { computed, watchEffect } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import * as yup from 'yup';
import { useFetchUser } from '../../../../composables/useFetchUser';
import { useUpdateUser } from '../../../../composables/useUpdateUser';

const props = defineProps<Props>();

const { data: fetchedUser, isLoading: isLoadingFetch, isError } = useFetchUser();
const { mutate: updateUserMutation, isPending } = useUpdateUser();

const validationSchema = toTypedSchema(
  yup.object({
    full_name: yup
      .string()
      .required('O Nome Completo é obrigatório.')
      .matches(/^[a-zA-ZÀ-ÿ.]+(\s+[a-zA-ZÀ-ÿ.]+)+$/, 'O Nome Completo deve conter pelo menos Nome e Sobrenome.'),
    phone: yup
      .string()
      .required('O Telefone é obrigatório.')
      .test('phone-format', 'O telefone deve conter apenas números.', function (value) {
        if (!value) {
          return false;
        }
        const normalizedValue = value.replace(/[^0-9a-zA-Z]/g, '');
        return !/[a-zA-Z]/.test(normalizedValue);
      })
      .test('phone-length-min', 'O telefone deve ter no mínimo 10 dígitos.', function (value) {
        if (!value) {
          return false;
        }
        const normalizedValue = value.replace(/[^0-9]/g, '');
        return normalizedValue.length >= 10;
      })
      .test('phone-length-max', 'O telefone deve ter no máximo 11 dígitos.', function (value) {
        if (!value) {
          return false;
        }
        const normalizedValue = value.replace(/[^0-9]/g, '');
        return normalizedValue.length <= 11;
      }),
    social_name: yup.string().optional(),
    document: yup.string().optional(),
  }),
);

const { handleSubmit, setFieldValue } = useForm({
  initialValues: {
    full_name: '',
    social_name: '',
    phone: '',
    document: '',
  },
  validationSchema,
});

const { errorMessage: fullNameError } = useField('full_name');
const { errorMessage: phoneError } = useField('phone');

const btnText = computed(() => {
  return isPending.value ? 'Salvando...' : 'Salvar';
});

watchEffect(() => {
  const user = computed<User | undefined>(() => {
    if (props.user) {
      return Array.isArray(props.user) ? props.user[0] : props.user;
    }
    return fetchedUser.value;
  });

  if (user.value) {
    setFieldValue('full_name', user.value.full_name || '');
    setFieldValue('phone', user.value.phone || '');
    setFieldValue('social_name', user.value.social_name || '');
    setFieldValue('document', user.value.document || '');
  }
});

const onSubmit = handleSubmit((formValues: UpdateUserData) => {
  const updateData: UpdateUserData = {
    full_name: formValues.full_name?.trim() || undefined,
    social_name: formValues.social_name?.trim() || undefined,
    phone: formValues.phone?.trim() || undefined,
  };

  updateUserMutation(updateData, {
    onSuccess: (data: UpdateUserResponse) => {
      toast.success(data.message || 'Usuário alterado com sucesso!', { autoClose: 3000 });
    },
    onError: (error: ApiErrorResponse) => {
      toast.error(error.response?.data?.message || 'Erro ao alterar perfil', { autoClose: 5000 });
    },
  });
});
</script>

<style src="./ProfileStyle.css"></style>
