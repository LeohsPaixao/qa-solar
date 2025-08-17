---
sidebar_position: 3
---

# 📂 Projeto

### Como Executar o Projeto

#### **1. Configurar Variáveis**

    * Copiar o arquivo `.env.example` para `.env` e preencha as informações:
      ```bash
      cp .env.example .env
      ```

#### **2. Iniciar o Servidor**

    * Desenvolvimento:
        ```bash
        yarn workspace frontend dev
        ```

    * Build:
        ```bash
        yarn workspace frontend build
        ```

    * Preview:
        ```bash
        yarn workspace frontend preview
        ```

### Estrutura

```
frontend/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── composables/    # Lógica reutilizável
│   ├── modules/        # Módulos da aplicação
│   │   ├── auth/       # Autenticação
│   │   └── user/       # Usuários
│   ├── plugins/        # Plugins Vue
│   ├── router/         # Configuração de rotas
│   ├── services/       # Comunicação com API
│   ├── types/          # Tipos TypeScript
│   └── utils/          # Utilitários
├── public/             # Arquivos públicos
└── vite.config.ts      # Configuração Vite
```

### Scripts

- `yarn dev` - Servidor de desenvolvimento (porta 8181)
- `yarn build` - Build para produção
- `yarn preview` - Preview do build
- `yarn lint` - Verificação de código
- `yarn format` - Formatação automática
- `yarn type-check` - Verificação de tipos