# cypress-ui-tests

## 1.3.0

### Minor Changes

- b1fdd03: test: adiciona testes na tela de cadastro de usuário com o projeto Cypress
- c3483be: test: adiciona testes na tela de listagem de usuários com o projeto Cypress
- b6f447d: test: adiciona testes na tela de recuperação de senha com o projeto Cypress

## 1.2.5

### Patch Changes

- e43fff5: feat: corrige os testes e o workflow

## 1.2.4

### Patch Changes

- cda13b4: test: resolve os testes quebrados apos a atualização dos componentes
- 0069498: test: ajusta os testes quebrados devido a atualizações

## 1.2.3

### Patch Changes

- chore: aprimora o workflow main.yml

## 1.2.2

### Patch Changes

- 8b3d4bc: test: tira o teste ignorado do login.cy.ts

## 1.2.1

### Patch Changes

- 224ec1d: test: corrige alguns testes de login

## 1.2.0

### Minor Changes

- 8bb98a4: test: finaliza os testes do login.cy.ts

### Patch Changes

- 8e12f26: feat: remove @see dos comentários de declaração dos comandos customizados

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
