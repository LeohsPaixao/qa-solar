<template>
  <div class="register-container main-content">
    <form data-testid="register-form" class="register-form" @submit.prevent="handleSubmit">
      <img data-testid="logo-register" src="@/assets/images/logoqae2e-branco.jpg" alt="Logo" class="logo" />
      <h2 data-testid="title-register">Bem-vindo!</h2>
      <p data-testid="description-register">Por favor, preencha os campos abaixo para se registrar:</p>

      <div data-testid="form-group-fullname" class="form-group">
        <label data-testid="label-fullname" for="full_name">Nome Completo <span class="required">*</span></label>
        <input
          data-testid="input-fullname"
          type="text"
          id="full_name"
          v-model="formData.full_name"
          @blur="validateField('full_name')"
          placeholder="Insira o Nome Completo"
          :class="{ 'error-input': errors.full_name }"
        />
        <p data-testid="input-error-fullname" class="error" v-if="errors.full_name">
          {{ errors.full_name }}
        </p>
      </div>

      <div data-testid="form-group-socialname" class="form-group">
        <label data-testid="label-socialname" for="social_name">Nome Social</label>
        <input
          data-testid="input-socialname"
          type="text"
          id="social_name"
          v-model="formData.social_name"
          placeholder="Insira o Nome Social (opcional)"
        />
      </div>

      <div data-testid="form-group-document" class="form-group">
        <label data-testid="label-document" for="document">CPF/CNPJ <span class="required">*</span></label>
        <select
          data-testid="select-document-type"
          id="doc_type"
          v-model="formData.doc_type"
          @change="handleDocTypeChange"
          :class="{ 'error-input': errors.document }"
        >
          <option value="cpf">CPF</option>
          <option value="cnpj">CNPJ</option>
        </select>
        <input
          data-testid="input-document"
          type="text"
          id="document"
          v-model="formData.document"
          @blur="validateField('document')"
          :placeholder="placeholder"
          :class="{ 'error-input': errors.document }"
        />
        <p data-testid="input-error-cpfcnpj" class="error" v-if="errors.document">
          {{ errors.document }}
        </p>
      </div>

      <div data-testid="form-group-phone" class="form-group">
        <label data-testid="label-phone" for="phone">Telefone</label>
        <input
          data-testid="input-phone"
          type="text"
          id="phone"
          v-model="formData.phone"
          @blur="validateField('phone')"
          placeholder="Insira o Telefone (opcional)"
          :class="{ 'error-input': errors.phone }"
        />
        <p data-testid="input-error-phone" class="error" v-if="errors.phone">
          {{ errors.phone }}
        </p>
      </div>

      <div data-testid="form-group-email" class="form-group">
        <label data-testid="label-email" for="email">Email <span class="required">*</span></label>
        <input
          data-testid="input-email"
          type="email"
          id="email"
          autocomplete="username"
          v-model="formData.email"
          @blur="validateField('email')"
          placeholder="Insira o Email"
          :class="{ 'error-input': errors.email }"
        />
        <p data-testid="input-error-email" class="error" v-if="errors.email">
          {{ errors.email }}
        </p>
      </div>

      <div data-testid="form-group-password" class="form-group">
        <label data-testid="label-password" for="password">Senha <span class="required">*</span></label>
        <input
          data-testid="input-password"
          type="password"
          id="password"
          autocomplete="current-password"
          v-model="formData.password"
          @blur="validateField('password')"
          placeholder="Insira a Senha"
          :class="{ 'error-input': errors.password }"
        />
        <p data-testid="input-error-password" class="error" v-if="errors.password">
          {{ errors.password }}
        </p>
      </div>

      <div data-testid="form-group-password-confirmation" class="form-group">
        <label data-testid="label-password-confirmation" for="password_confirmation">Confirmar Senha <span class="required">*</span></label>
        <input
          data-testid="input-password-confirmation"
          type="password"
          id="password_confirmation"
          autocomplete="new-password"
          v-model="formData.password_confirmation"
          @blur="validateField('password_confirmation')"
          placeholder="Confirme a Senha"
          :class="{ 'error-input': errors.password_confirmation }"
        />
        <p data-testid="input-error-password-confirmation" class="error" v-if="errors.password_confirmation">
          {{ errors.password_confirmation }}
        </p>
      </div>

      <button data-testid="btn-register" type="submit" class="btn btn-submit" :disabled="isPending || !isFormValid">
        {{ isPending ? 'Cadastrando...' : 'Cadastrar' }}
      </button>

      <div class="link-container">
        <router-link to="/" data-testid="link-go-to-login" class="link-go-to-login"> Voltar ao Login </router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { ApiErrorResponse } from '@/types/error.types';
import type { FormData, FormErrors, RegisterResponse } from '@/types/user.types';
import { validateFormData } from '@/utils/validateForm';
import { computed, reactive, watch } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRegisterUser } from '../../../../composables/useRegisterUser';

// Composables
const { mutate: registerUserMutation, isPending } = useRegisterUser();

const formData = reactive<FormData>({
  full_name: '',
  social_name: '',
  document: '',
  doc_type: 'cpf',
  phone: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const errors = reactive<FormErrors>({
  full_name: '',
  document: '',
  phone: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const isFormValid = computed(() => {
  const result = validateFormData(formData);
  return result.isValid;
});

const placeholder = computed<string>(() => (formData.doc_type === 'cpf' ? 'Insira o CPF' : 'Insira o CNPJ'));

watch(
  () => formData.full_name,
  (newValue) => {
    if (newValue) {
      const result = validateFormData({ ...formData, full_name: newValue });
      errors.full_name = result.errors.full_name || '';
    } else {
      errors.full_name = '';
    }
  },
);

watch(
  () => formData.document,
  (newValue) => {
    if (newValue) {
      const result = validateFormData({ ...formData, document: newValue });
      errors.document = result.errors.document || '';
    } else {
      errors.document = '';
    }
  },
);

watch(
  () => formData.phone,
  (newValue) => {
    if (newValue) {
      const result = validateFormData({ ...formData, phone: newValue });
      errors.phone = result.errors.phone || '';
    } else {
      errors.phone = '';
    }
  },
);

watch(
  () => formData.email,
  (newValue) => {
    if (newValue) {
      const result = validateFormData({ ...formData, email: newValue });
      errors.email = result.errors.email || '';
    } else {
      errors.email = '';
    }
  },
);

watch(
  () => formData.password,
  (newValue) => {
    if (newValue) {
      const result = validateFormData({ ...formData, password: newValue });
      errors.password = result.errors.password || '';
      if (formData.password_confirmation) {
        const confirmResult = validateFormData({ ...formData, password: newValue, password_confirmation: formData.password_confirmation });
        errors.password_confirmation = confirmResult.errors.password_confirmation || '';
      }
    } else {
      errors.password = '';
    }
  },
);

watch(
  () => formData.password_confirmation,
  (newValue) => {
    if (newValue) {
      const result = validateFormData({ ...formData, password_confirmation: newValue });
      errors.password_confirmation = result.errors.password_confirmation || '';
    } else {
      errors.password_confirmation = '';
    }
  },
);

// Methods
const handleDocTypeChange = (): void => {
  formData.document = '';
  errors.document = '';
};

const handleSubmit = async (): Promise<void> => {
  const result = validateFormData(formData);
  Object.assign(errors, result.errors);

  if (!result.isValid) {
    return;
  }

  registerUserMutation(
    {
      full_name: formData.full_name.trim(),
      social_name: formData.social_name?.trim() || '',
      document: formData.document.trim(),
      doc_type: formData.doc_type,
      phone: formData.phone?.trim() || '',
      email: formData.email.trim(),
      password: formData.password.trim(),
      password_confirmation: formData.password_confirmation.trim(),
    },
    {
      onSuccess: (data: RegisterResponse): void => {
        toast.success(data.message || 'Usuário criado com sucesso!', { autoClose: 3000 });
      },
      onError: (error: ApiErrorResponse): void => {
        toast.error(error.response?.data?.message || 'Erro ao registrar usuário', { autoClose: 5000 });
      },
    },
  );
};

const validateField = (field: keyof FormErrors): void => {
  const result = validateFormData(formData);
  errors[field] = result.errors[field] || '';
};
</script>

<style src="./RegisterStyle.css"></style>
