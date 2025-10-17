---
"frontend": patch
---

test: adiciona testes unitários para componentes principais e melhora infraestrutura de testes

- Configura infraestrutura de testes com Vitest, mocks e setup
- Cria novos testes unitários para AppFooter, AppHeader, AppHome e LoadingErrorState
- Corrige falhas nos testes existentes (api.spec.ts, isAuthenticated.spec.ts)
- Melhora testabilidade da função handleClickOutside no AppHeader
- Adiciona data-testid para melhor identificação de elementos nos testes
