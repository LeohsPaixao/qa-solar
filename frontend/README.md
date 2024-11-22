# Frontend - Vue Tests

Este é o projeto frontend do monorepo **Vue Tests**, construído com **Vue 3**, **Vue Router** e outras ferramentas modernas para o desenvolvimento de aplicações web. O objetivo deste projeto é implementar interfaces de usuário e validar fluxos com foco em qualidade e boas práticas.

---

## 🛠 Tecnologias Utilizadas

- **Vue 3**: Framework principal para construção da interface.  
- **Vue Router**: Gerenciamento de rotas.  
- **Vee-Validate**: Validação de formulários.  
- **Axios**: Comunicação com a API do Backend.  
- **Vue3-Toastify**: Notificações toast.  
- **Vite**: Ferramenta de build e desenvolvimento rápida.  
- **TypeScript**: Tipagem estática para maior robustez no código.

---

## 🚀 Como Rodar o Projeto

1. **Pré-requisitos**:
   - [![Node.js Version](https://img.shields.io/badge/Node.js-%3E=22.1.0-brightgreen.svg)](https://nodejs.org/)
   - [![Yarn Version](https://img.shields.io/badge/Yarn-1.22.22-blue.svg)](https://classic.yarnpkg.com/en/docs/install/)

2. **Instalação**:  
   Clone o repositório e navegue até o diretório `frontend`:
   ```bash
   git clone https://github.com/LeohsPaixao/vue-tests.git
   cd vue-tests/frontend
   yarn install
   ```

3. **Rodar o servidor de desenvolvimento**:
   ```bash
   yarn serve
   ```

4. **Build para produção**:
   ```bash
   yarn build
   ```

5. **Pré-visualização do build**:
   ```bash
   yarn preview
   ```

---

## 📂 Estrutura do Projeto

```plaintext
frontend/
├── src/
│   ├── assets/        # Recursos estáticos (imagens, fontes, etc.)
│   ├── components/    # Componentes Vue reutilizáveis
│   ├── modules/       # Páginas principais da aplicação
|   ├── plugins/       # Plugins
│   ├── router/        # Configuração de rotas com Vue Router
|   ├── utils/         # Configuração de de utilitários
│   ├── App.vue        # Componente raiz
│   └── main.ts        # Ponto de entrada do projeto
├── public/            # Arquivos públicos (ex.: index.html)
├── package.json       # Configuração do projeto e dependências
└── vite.config.ts     # Configuração do Vite
```

---

## 🔧 Scripts Disponíveis

- **`yarn serve`**: Inicia o servidor de desenvolvimento.  
- **`yarn build`**: Gera o build para produção.  
- **`yarn preview`**: Exibe o build gerado em modo de visualização.  
- **`yarn lint`**: Executa o ESLint para verificar e corrigir problemas de linting.  
- **`yarn format`**: Formata o código com Prettier.  
- **`yarn type-check`**: Verifica erros de tipo usando `vue-tsc`.  

---

## 🛡 Configuração de Lint e Formatação

- **ESLint**: Configurado para seguir boas práticas com regras específicas para Vue e TypeScript.  
- **Prettier**: Para manter a consistência na formatação do código.  
- Ambos podem ser executados com os scripts `lint` e `format`.

---

## 🌱 Instalação de Dependências Adicionais

Caso precise instalar novas dependências, utilize o Yarn:
```bash
yarn add <package>           # Para dependências de produção
yarn add -D <package>        # Para dependências de desenvolvimento
```

---

## 🤝 Contribuição

Contribuições são bem-vindas! Certifique-se de seguir as boas práticas de commit e de manter o código alinhado com o padrão definido.

---

## 📜 Licença

Este projeto está licenciado sob a [MIT License](../LICENSE).