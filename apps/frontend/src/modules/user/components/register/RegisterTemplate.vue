<template>
  <div class="register-container">
    <form data-testid="form-register" class="form-register" @submit.prevent="handleSubmit">
      <img src="@/assets/images/logoqae2e-branco.jpg" alt="Logo" class="logo" />
      <h2>Bem-vindo!</h2>
      <p>Por favor, preencha os campos abaixo para se registrar:</p>

      <div class="form-group">
        <label data-testid="label-fullname" for="full_name">Nome Completo <span class="required">*</span></label>
        <input
          data-testid="input-fullname"
          type="text"
          id="full_name"
          v-model="formData.full_name"
          placeholder="Insira o Nome Completo"
          :class="{ 'error-input': errors.full_name }"
        />
        <p data-testid="input-error-fullname" class="error" v-if="errors.full_name">
          {{ errors.full_name }}
        </p>
      </div>

      <div class="form-group">
        <label data-testid="label-socialname" for="social_name">Nome Social</label>
        <input
          data-testid="input-socialname"
          type="text"
          id="social_name"
          v-model="formData.social_name"
          placeholder="Insira o Nome Social (opcional)"
        />
      </div>

      <div class="form-group">
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
          :placeholder="placeholder"
          :class="{ 'error-input': errors.document }"
        />
        <p data-testid="input-error-cpfcnpj" class="error" v-if="errors.document">
          {{ errors.document }}
        </p>
      </div>

      <div class="form-group">
        <label data-testid="label-phone" for="phone">Telefone</label>
        <input
          data-testid="input-phone"
          type="text"
          id="phone"
          v-model="formData.phone"
          placeholder="Insira o Telefone (opcional)"
          :class="{ 'error-input': errors.phone }"
        />
        <p data-testid="input-error-phone" class="error" v-if="errors.phone">
          {{ errors.phone }}
        </p>
      </div>

      <div class="form-group">
        <label data-testid="label-email" for="email">Email <span class="required">*</span></label>
        <input
          data-testid="input-email"
          type="email"
          id="email"
          autocomplete="username"
          v-model="formData.email"
          placeholder="Insira o Email"
          :class="{ 'error-input': errors.email }"
        />
        <p data-testid="input-error-email" class="error" v-if="errors.email">
          {{ errors.email }}
        </p>
      </div>

      <div class="form-group">
        <label data-testid="label-password" for="password">Senha <span class="required">*</span></label>
        <input
          data-testid="input-password"
          type="password"
          id="password"
          autocomplete="current-password"
          v-model="formData.password"
          placeholder="Insira a Senha"
          :class="{ 'error-input': errors.password }"
        />
        <p data-testid="input-error-password" class="error" v-if="errors.password">
          {{ errors.password }}
        </p>
      </div>

      <button data-testid="btn-register" type="submit" class="btn btn-submit" :disabled="isLoading">
        {{ isLoading ? 'Cadastrando...' : 'Cadastrar' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>

      <div class="link-container">
        <router-link to="/" data-testid="link-go-to-login" class="link-go-to-login"> Voltar ao Login </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { validateFormData } from '@/utils/validateForm';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useRegisterUser } from '../../../../composables/useRegisterUser';

const router = useRouter();
const { mutate, isLoading, error } = useRegisterUser();

const formData = reactive({
  full_name: '',
  social_name: '',
  document: '',
  doc_type: 'cpf',
  phone: '',
  email: '',
  password: '',
});

const errors = reactive({
  full_name: '',
  document: '',
  phone: '',
  email: '',
  password: '',
});

const placeholder = computed(() => (formData.doc_type === 'cpf' ? 'Insira o CPF' : 'Insira o CNPJ'));

const handleDocTypeChange = () => {
  formData.document = '';
  errors.document = '';
};

const handleSubmit = async () => {
  const result = validateFormData(formData);
  Object.assign(errors, result.errors);

  if (!result.isValid) {
    return;
  }

  try {
    await mutate(formData, {
      onSuccess: async () => {
        await router.push('/');
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
</script>

<style src="./RegisterStyle.css"></style>
