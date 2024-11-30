# backend

## 2.0.0

### Major Changes

- abe1ffc: feat: migra o projeto de JavaScript para TypeScript

  BREAKING CHANGE:

  ### O que mudou:

  - Todo o código do backend foi reescrito de JavaScript para TypeScript.
  - Foram adicionados tipos para garantir maior segurança e previsibilidade no código.
  - Algumas estruturas e middlewares foram refatorados para aderir às melhores práticas do TypeScript.

  ### Por que a mudança foi feita:

  - Para melhorar a qualidade do código e reduzir erros em tempo de execução.
  - Para facilitar a manutenção do projeto e a escalabilidade futura.
  - Para alinhar o projeto com padrões modernos de desenvolvimento.

  ### Como atualizar seu código:

  1. Certifique-se de ter o TypeScript instalado no seu ambiente de desenvolvimento.
  2. Atualize os comandos de execução do projeto para usar `ts-node` ou compile os arquivos com `tsc`.
  3. Verifique suas integrações externas para ajustar chamadas e tipos, se necessário.
  4. Revise os exemplos no `README.md` (se aplicável) para garantir compatibilidade com o novo código.

### Minor Changes

- 8f35ad9: feat: finaliza a configuração do eslint no projeto backend

### Patch Changes

- 9cda398: chore: correcao de codigo e configuracao

## 1.4.0

### Minor Changes

- e4c10b8: feat: cria novos endpoints para a nova tela de tabela de usuários

## 1.3.1

### Patch Changes

- 3ca055a: chore: padroniza o estilo dos botoes e remove consoles

## 1.3.0

### Minor Changes

- 4d602ef: feat: cria novos endpoints para busca de usuário e logout
- 491db2b: feat: adiciona um novo endpoint para usuarios

### Patch Changes

- 82c276b: feat: organiza o código com o Prettier

## 1.2.1

### Patch Changes

- chore: aprimora o workflow main.yml

## 1.2.0

### Minor Changes

- 224ec1d: feat: ajusta a conexao entre o frontend e backend
- 4f72bac: feat: cria seed genericUser.js para gerar usuario generico

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
