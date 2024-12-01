<template>
  <div class="register-container">
    <form data-testid="form-register" class="form-register" @submit.prevent="onSubmit">
      <img src="@/assets/images/logoqae2e-branco.jpg" alt="Logo" class="logo" />
      <h2>Bem-vindo!</h2>
      <p>Por favor, preencha os campos abaixo para se registrar:</p>
      <div class="form-group">
        <label data-testid="label-fullname" for="fullName">Nome Completo <span class="required">*</span></label>
        <input data-testid="input-fullname" type="text" id="fullName" v-model="formData.fullName" placeholder="Insira o Nome Completo" />
        <p data-testid="input-error-fullname" class="error" v-if="errors.fullName">
          {{ errors.fullName }}
        </p>
      </div>
      <div class="form-group">
        <label data-testid="label-socialname" for="socialName">Nome Social</label>
        <input
          data-testid="input-socialname"
          type="text"
          id="socialName"
          v-model="formData.socialName"
          placeholder="Insira o Nome Social (opcional)"
        />
      </div>
      <div class="form-group">
        <label data-testid="label-document" for="document">CPF/CNPJ <span class="required">*</span></label>
        <select data-testid="select-document-type" id="docType" v-model="formData.docType" @change="onDocTypeChange">
          <option value="cpf">CPF</option>
          <option value="cnpj">CNPJ</option>
        </select>
        <input data-testid="input-document" type="text" id="document" v-model="formData.document" :placeholder="placeholder" />
        <p data-testid="input-error-cpfcnpj" class="error" v-if="errors.document">{{ errors.document }}</p>
      </div>
      <div class="form-group">
        <label data-testid="label-phone" for="phone">Telefone</label>
        <input data-testid="input-phone" type="text" id="phone" v-model="formData.phone" placeholder="Insira o Telefone (opcional)" />
      </div>
      <div class="form-group">
        <label data-testid="label-email" for="email">Email <span class="required">*</span></label>
        <input data-testid="input-email" type="email" id="email" autocomplete="username" v-model="formData.email" placeholder="Insira o Email" />
        <p data-testid="input-error-email" class="error" v-if="errors.email">{{ errors.email }}</p>
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
        />
        <p data-testid="input-error-password" class="error" v-if="errors.password">
          {{ errors.password }}
        </p>
      </div>
      <button data-testid="btn-register" type="submit" class="btn btn-submit" :disabled="mutation.isLoading">Cadastrar</button>
      <p v-if="mutation.isLoading" class="loading">Cadastrando...</p>
      <p v-if="mutation.isError" class="error">{{ mutation.error?.message }}</p>
      <div class="link-container">
        <router-link to="/" data-testid="link-go-to-login" class="link-go-to-login"> Voltar ao Login </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { validateFormData } from '@/utils/validateForm';
import { nextTick, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRegisterUser } from '../../../../hooks/useRegisterUser';

export default {
  setup() {
    const formData = reactive({
      fullName: '',
      socialName: '',
      document: '',
      docType: 'cpf',
      phone: '',
      email: '',
      password: '',
    });

    const errors = reactive({
      fullName: '',
      document: '',
      email: '',
      password: '',
    });

    const placeholder = ref('Insira o CPF');
    const mutation = useRegisterUser();
    const router = useRouter();

    const validateForm = () => {
      const result = validateFormData(formData);
      Object.assign(errors, result.errors);
      return result.isValid;
    };

    const onSubmit = () => {
      if (validateForm()) {
        mutation.mutate(formData, {
          onSuccess: async (data) => {
            await router.push('/');
            nextTick(() => {
              toast.success(data.message, { autoClose: 3000 });
            });
          },
          onError: (error) => {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(errorMessage, { autoClose: 5000 });
          },
        });
      } else {
        toast.error('Por favor, corrija os erros no formulário.', { autoClose: 3000 });
      }
    };

    const onDocTypeChange = () => {
      placeholder.value = formData.docType === 'cpf' ? 'Insira o CPF' : 'Insira o CNPJ';
    };

    return {
      formData,
      errors,
      placeholder,
      onSubmit,
      onDocTypeChange,
      mutation,
    };
  },
};
</script>

<style src="./RegisterStyle.css"></style>
