# frontend

## 1.6.0

### Minor Changes

- 44a4ff9: feat: criação do arquivo Dockerfile para o serviço de frontend

## 1.5.2

### Patch Changes

- 5626cda: feat: adiciona novos pacotes e remove outros para resolver as dependências do projeto frontend

## 1.5.1

### Patch Changes

- b72726c: feat: altera o hook useFetchUser para enviar o email no parâmetro pela url

## 1.5.0

### Minor Changes

- 0842e53: feat: instala e configura o plugin de instrumentação de código
- 0be3ecb: feat: instala e configura o coverage do cypress no projeto

## 1.4.2

### Patch Changes

- b1fdd03: test: adiciona alguns data-testid nos componentes da tela de cadastro de usuário
- c3483be: test: ajusta alguns data-testid no componente ListUsersTemplate.vue
- b6f447d: chore: adiciona validações no campo de telefone

## 1.4.1

### Patch Changes

- db38215: chore: configura melhor o eslint do frontend

## 1.4.0

### Minor Changes

- e4c10b8: feat: adiciona a nova tela de tabela de usuários

## 1.3.1

### Patch Changes

- 3ca055a: chore: padroniza o estilo dos botoes e remove consoles

## 1.3.0

### Minor Changes

- 491db2b: feat: melhora a experencia do usuario com hooks e feedbacks
- 82c276b: feat: cria a nova tela do projeto
- 4d602ef: feat: cria a tela de recuperar a senha

### Patch Changes

- cda13b4: feat: altera a rota de login

## 1.2.1

### Patch Changes

- chore: aprimora o workflow main.yml

## 1.2.0

### Minor Changes

- 224ec1d: feat: ajusta a conexao entre o frontend e backend

## 1.1.0

### Minor Changes

- dae790c: feat: ajusta o projeto inteiro

  description: |
  **O que mudou:**
  Foram realizadas melhorias gerais em todo o projeto, incluindo ajustes nas configurações de testes de UI, atualizações no frontend e no backend para melhorar a estrutura do código e a integração entre as partes.

  **Por que a mudança foi feita:**
  As mudanças foram necessárias para garantir uma maior consistência no código, facilitar a manutenção e otimizar a execução dos testes. Além disso, a atualização melhora a integração entre o frontend e o backend.

  **Como atualizar o código:**

  - **Playwright e Cypress (UI Tests):** Certifique-se de que todas as dependências de teste estão atualizadas e reconfigure os testes conforme as novas práticas e integrações.
  - **Frontend:** Verifique as atualizações nas dependências do frontend e adapte os componentes que possam ter sido refatorados.
  - **Backend:** Se você estiver utilizando o backend, atualize para as novas versões das APIs e ajuste suas chamadas conforme necessário.

  **Exemplo de código de ajuste:**

  - Para conexões com o backend, agora você pode usar hooks ao invés de axios puro.

  ```js
  // Antes:
  export const registerUser = async (userData) => {
    try {
      const response = await axios.post('http://localhost:3001/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message);
    }
  };

  // Depois:
  const registerUser = async (userData) => {
    const response = await api.post('/register', userData);
    return response.data;
  };

  export const useRegisterUser = () => {
    return useMutation({
      mutationFn: registerUser,
      onSuccess: (data) => {
        toast.success(data.message, { autoClose: 3000 });
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage, { autoClose: 5000 });
      },
    });
  };
  ```
