<template>
  <div class="register-container">
    <form @submit.prevent="onSubmit">
      <img src="@/assets/images/logoqae2e-branco.jpg" alt="Logo" class="logo" />
      <h2>Bem-vindo!</h2>
      <p>Por favor, preencha os campos abaixo para se registrar:</p>
      <div class="form-group">
        <label for="fullName">Nome Completo <span class="required">*</span></label>
        <input
          type="text"
          id="fullName"
          v-model="formData.fullName"
          placeholder="Insira o Nome Completo"
        />
        <p class="error" v-if="errors.fullName">{{ errors.fullName }}</p>
      </div>
      <div class="form-group">
        <label for="socialName">Nome Social</label>
        <input
          type="text"
          id="socialName"
          v-model="formData.socialName"
          placeholder="Insira o Nome Social (opcional)"
        />
      </div>
      <div class="form-group">
        <label for="document">CPF/CNPJ <span class="required">*</span></label>
        <select id="docType" v-model="formData.docType" @change="onDocTypeChange">
          <option value="cpf">CPF</option>
          <option value="cnpj">CNPJ</option>
        </select>
        <input type="text" id="document" v-model="formData.document" :placeholder="placeholder" />
        <p class="error" v-if="errors.document">{{ errors.document }}</p>
      </div>
      <div class="form-group">
        <label for="phone">Telefone</label>
        <input
          type="text"
          id="phone"
          v-model="formData.phone"
          placeholder="Insira o Telefone (opcional)"
        />
      </div>
      <div class="form-group">
        <label for="email">Email <span class="required">*</span></label>
        <input
          type="email"
          id="email"
          autocomplete="username"
          v-model="formData.email"
          placeholder="Insira o Email"
        />
        <p class="error" v-if="errors.email">{{ errors.email }}</p>
      </div>
      <div class="form-group">
        <label for="password">Senha <span class="required">*</span></label>
        <input
          type="password"
          id="password"
          autocomplete="current-password"
          v-model="formData.password"
          placeholder="Insira a Senha"
        />
        <p class="error" v-if="errors.password">{{ errors.password }}</p>
      </div>
      <button type="submit" class="btn-submit">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import { registerUser } from '@/services/api'
import { validateFormData } from '@/utils/validateForm'
import { reactive, ref } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

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
    })

    const errors = reactive({
      fullName: '',
      document: '',
      email: '',
      password: '',
    })

    const placeholder = ref('Insira o CPF')

    const validateForm = () => {
      const result = validateFormData(formData)
      Object.assign(errors, result.errors)
      return result.isValid
    }

    const onSubmit = async () => {
      if (validateForm()) {
        try {
          const response = await registerUser(formData)
          toast.success(response.message, { autoClose: 3000 })

          Object.keys(formData).forEach((key) => {
            formData[key] = ''
          })
        } catch (error) {
          toast.error(error.message, { autoClose: 3000 })
        }
      } else {
        toast.error('Por favor, corrija os erros no formulário.', { autoClose: 3000 })
      }
    }

    const onDocTypeChange = () => {
      placeholder.value = formData.docType === 'cpf' ? 'Insira o CPF' : 'Insira o CNPJ'
    }

    return {
      formData,
      errors,
      placeholder,
      onSubmit,
      onDocTypeChange,
    }
  },
}
</script>

<style src="./RegisterStyle.css"></style>
