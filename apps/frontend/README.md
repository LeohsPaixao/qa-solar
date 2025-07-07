# Frontend - QA Solar

Este é o projeto frontend do monorepo **QA Solar**, construído com **Vue 3**, **TypeScript** e **Vite**. Ele fornece uma interface moderna e responsiva para interagir com a API do backend, implementando interfaces de usuário e validando fluxos com foco em qualidade e boas práticas.

---

## 📋 Índice

- [🛠 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [🚀 Como Executar o Projeto](#-como-executar-o-projeto)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [🔧 Scripts Disponíveis](#-scripts-disponíveis)
- [🧪 Testes](#-testes)
- [📚 Configuração e Plugins](#-configuração-e-plugins)

---

## 🛠 Tecnologias Utilizadas

### **Framework e Runtime**
- **Vue 3**: Framework progressivo para construção de interfaces de usuário
- **TypeScript**: Linguagem de programação tipada
- **Vite**: Ferramenta de build e desenvolvimento rápida

### **Roteamento e Navegação**
- **Vue Router**: Gerenciamento de rotas e navegação SPA

### **Gerenciamento de Estado e Dados**
- **TanStack Vue Query**: Gerenciamento de estado do servidor e cache
- **Axios**: Cliente HTTP para comunicação com APIs

### **Validação e Formulários**
- **Vee-Validate**: Validação de formulários com Vue 3
- **class-validator**: Validação de dados

### **Interface e UX**
- **Vue3-Toastify**: Sistema de notificações toast
- **Material Design Icons**: Biblioteca de ícones
- **Vue Icon**: Componente de ícones

### **Desenvolvimento e Qualidade**
- **ESLint**: Linting de código
- **Prettier**: Formatação de código
- **Vue DevTools**: Ferramentas de desenvolvimento

---

## 🚀 Como Executar o Projeto

### **1. Configuração do Ambiente**
- Copie o arquivo `.env.example` para `.env` e configure a URL da API:
  ```plaintext
  VITE_API_URL=http://localhost:3001
  ```

### **2. Iniciar o Servidor de Desenvolvimento**
```bash
# Desenvolvimento
yarn workspace frontend dev

# Build para produção
yarn workspace frontend build

# Pré-visualização do build
yarn workspace frontend preview
```

---

## 📂 Estrutura do Projeto

```plaintext
frontend/
├── src/
│   ├── assets/              # Recursos estáticos (imagens, fontes, etc.)
│   ├── components/          # Componentes Vue reutilizáveis
│   │   ├── AppHeader.vue    # Cabeçalho da aplicação
│   │   ├── AppFooter.vue    # Rodapé da aplicação
│   │   ├── AppHome.vue      # Página inicial
│   │   └── LoadingErrorState.vue # Estados de carregamento e erro
│   ├── composables/         # Composables Vue 3 (lógica reutilizável)
│   ├── modules/             # Módulos da aplicação
│   │   ├── auth/           # Módulo de autenticação
│   │   └── user/           # Módulo de usuários
│   ├── plugins/            # Plugins da aplicação
│   │   ├── index.ts        # Registro de plugins
│   │   ├── vueQuery.ts     # Configuração do TanStack Query
│   │   └── vueToastify.ts  # Configuração das notificações
│   ├── router/             # Configuração de rotas com Vue Router
│   ├── services/           # Serviços e comunicação com API
│   │   └── api.ts         # Cliente Axios e configurações
│   ├── types/              # Definições de tipos TypeScript
│   ├── utils/              # Utilitários e helpers
│   ├── App.vue             # Componente raiz da aplicação
│   └── main.ts             # Ponto de entrada do projeto
├── public/                 # Arquivos públicos (ex.: index.html)
├── .env.example            # Exemplo de variáveis de ambiente
├── package.json            # Configuração do projeto e dependências
├── vite.config.ts          # Configuração do Vite
└── tsconfig.json           # Configuração do TypeScript
```

---

## 🔧 Scripts Disponíveis

### **Desenvolvimento**
- **`yarn dev`**: Inicia o servidor de desenvolvimento na porta 8181
- **`yarn build`**: Gera o build para produção
- **`yarn preview`**: Exibe o build gerado em modo de visualização

### **Qualidade de Código**
- **`yarn lint`**: Executa o ESLint para verificar e corrigir problemas
- **`yarn format`**: Formata o código com Prettier
- **`yarn type-check`**: Verifica erros de tipo usando `vue-tsc`

---

## 🧪 Testes

### **Cobertura de Código**
O projeto está configurado com:
- **Istanbul**: Plugin para cobertura de código
- **C8**: Gerador de relatórios de cobertura

### **Configuração de Testes**
- **Vite Plugin Istanbul**: Configurado para cobertura de arquivos `.js`, `.ts` e `.vue`
- **Source Maps**: Habilitados para melhor debugging
- **Vue DevTools**: Plugin habilitado para desenvolvimento

---

## 📚 Configuração e Plugins

### **Plugins Registrados**
- **Vue Router**: Gerenciamento de rotas
- **Vue3-Toastify**: Sistema de notificações
- **TanStack Vue Query**: Gerenciamento de estado do servidor

### **Configurações do Vite**
- **Porta**: 8181 (configurada no servidor de desenvolvimento)
- **Alias**: `@` aponta para `./src`
- **Source Maps**: Habilitados para produção
- **Vue DevTools**: Plugin habilitado

### **Configurações do TypeScript**
- **Configuração Node 22**: Otimizada para Node.js 22
- **Vue TSConfig**: Configuração específica para Vue 3
- **Strict Mode**: Habilitado para maior segurança