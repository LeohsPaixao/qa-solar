# QA Solar - Testes de Performance

Este projeto contém os testes de performance para o QA Solar utilizando o K6.

## Estrutura do Projeto

```
performance/
├── k6/
│   ├── src/
│   │   ├── config/
│   │   │   ├── base.js      # Configurações base para todos os testes
│   │   │   └── scenarios.js # Configurações dos cenários de teste
│   │   ├── utils/
│   │   │   └── http.js      # Utilitários para requisições HTTP
│   │   └── index.js         # Ponto de entrada dos testes
│   └── tests/
│       └── login.test.js    # Testes específicos do endpoint de login
├── reports/                 # Reportes e logs dos testes
├── package.json
└── README.md
```

## Instalação

1. Instale o K6 seguindo as instruções em [https://k6.io/docs/get-started/installation/](https://k6.io/docs/get-started/installation/)
2. Instale as dependências do projeto:
   ```bash
   yarn install
   ```

## Executando os Testes

O projeto possui scripts pré-configurados para executar diferentes cenários de teste:

- Executar todos os cenários:
  ```bash
  yarn run test
  ```

- Executar cenário específico:
  ```bash
  yarn run test -- --env SCENARIO=login_success    # Teste de login bem-sucedido
  yarn run test -- --env SCENARIO=login_invalid    # Teste de login com credenciais inválidas
  yarn run test -- --env SCENARIO=login_concurrent # Teste de login com carga concorrente
  yarn run test -- --env SCENARIO=login_ramp       # Teste de login com aumento progressivo
  ```

## Cenários de Teste

1. **Login Bem-sucedido (login_success)**
   - 1 usuário virtual
   - 100 iterações
   - Duração máxima: 2 minutos

2. **Login com Credenciais Inválidas (login_invalid)**
   - 1 usuário virtual
   - 50 iterações
   - Duração máxima: 1 minuto

3. **Login Sob Carga Concorrente (login_concurrent)**
   - 100 usuários virtuais
   - 1 iteração por usuário
   - Duração máxima: 2 minutos

4. **Aumento Progressivo (login_ramp)**
   - Aumento gradual de 0 a 20 usuários em 30s
   - Aumento para 50 usuários em 30s
   - Redução gradual para 0 usuários em 30s

## Adicionando Novos Testes

Para adicionar novos testes:

1. Crie um novo arquivo em `k6/tests/` para o endpoint específico
2. Implemente as funções de teste necessárias
3. Adicione os cenários correspondentes em `k6/src/config/scenarios.js`
4. Atualize o `k6/src/index.js` para incluir os novos testes

## Relatórios

Os relatórios são gerados automaticamente após a execução dos testes usando o plugin k6-html-reporter. 