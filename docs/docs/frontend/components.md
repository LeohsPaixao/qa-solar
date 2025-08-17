---
sidebar_position: 4
---

# 📚 Componentes

## Base

    #### AppHeader
    Cabeçalho com navegação e menu de usuário.

    #### AppFooter
    Rodapé com links e informações.

    #### AppHome
    Página inicial com dashboard.

    #### LoadingErrorState
    Estados de carregamento e erro.

## Composables

    #### useAuth
    - Login/logout
    - Verificação de sessão
    - Gerenciamento de tokens

    #### useApi
    - Requisições HTTP
    - Tratamento de erros
    - Cache de dados

## Módulos

    #### Auth
    ```plaintext
    modules/auth/
    ├── components/     # Componentes auth
    ├── composables/    # Lógica auth
    ├── services/       # Serviços auth
    └── types/          # Tipos
    ```

    #### User
    ```plaintext
    modules/user/
    ├── components/     # Componentes user
    ├── composables/    # Lógica user
    ├── services/       # Serviços user
    └── types/          # Tipos
    ```

## Utilitários

    #### Helpers
      - Formatação de dados
      - Validação de forms
      - Manipulação de datas

    #### Constants
      - URLs da API
      - Configurações
      - Mensagens de erro
