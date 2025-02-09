# Projeto de Performance do Monorepo

Este projeto tem como objetivo medir, monitorar e otimizar a performance dos componentes do sistema. Ele executa testes automatizados com diferentes cenários de carga para identificar gargalos e oportunidades de melhoria na API.

---

## Índice

- [Projeto de Performance do Monorepo](#projeto-de-performance-do-monorepo)
  - [Índice](#índice)
  - [Descrição](#descrição)
  - [Execução dos Testes](#execução-dos-testes)
  - [Cenários de Teste](#cenários-de-teste)
    - [1. login\_success](#1-login_success)
    - [2. login\_invalid](#2-login_invalid)
    - [3. login\_concurrent](#3-login_concurrent)
    - [4. login\_ramp](#4-login_ramp)
  - [Relatórios](#relatórios)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Configuração](#configuração)

---

## Descrição

O projeto de performance utiliza o [k6](https://k6.io/) para simular diferentes cenários de acesso à API de login, verificando o comportamento do sistema sob condições variadas de carga e falhas.

---

## Execução dos Testes

Os testes de carga são executados via script definido no `package.json`, que utiliza o comando:
```bash
rimraf ./reports/* && k6 run --out json=reports/results.json k6/loadtest.js
```
Você pode escolher qual cenário executar utilizando a variável de ambiente `SCENARIO`. Por exemplo:
```bash
yarn test:loadtest -- --env SCENARIO=login_success
```

---

## Cenários de Teste

Este projeto oferece diferentes cenários para o endpoint de login. A seguir, veja uma breve descrição de cada um, sua configuração e um exemplo de comando para executá-los:

### 1. login_success
- **Descrição:** Simula o fluxo ideal de login com credenciais válidas.
- **Configuração:**  
  - Executor: `per-vu-iterations`  
  - 1 VU executa 100 iterações sequencialmente.
- **Objetivo:** Verificar se o endpoint responde corretamente com status 200, confirmando o fluxo normal de autenticação.
- **Exemplo de Execução:**
  ```bash
  yarn test:loadtest -- --env SCENARIO=login_success
  ```

### 2. login_invalid
- **Descrição:** Simula tentativas de login com credenciais inválidas (usuário inexistente ou senha incorreta).
- **Configuração:**  
  - Executor: `per-vu-iterations`  
  - 1 VU executa 50 iterações.
- **Objetivo:** Garantir que a API retorne status 400 ou 402 quando os dados de login não forem válidos.
- **Exemplo de Execução:**
  ```bash
  yarn test:loadtest -- --env SCENARIO=login_invalid
  ```

### 3. login_concurrent
- **Descrição:** Simula um ambiente com alta concorrência, onde vários usuários tentam logar simultaneamente.
- **Configuração:**  
  - Executor: `per-vu-iterations`  
  - 100 VUs executando 1 iteração cada.
- **Objetivo:** Analisar o comportamento do sistema sob carga simultânea e identificar possíveis gargalos.
- **Exemplo de Execução:**
  ```bash
  yarn test:loadtest -- --env SCENARIO=login_concurrent
  ```

### 4. login_ramp
- **Descrição:** Realiza um aumento progressivo (ramp-up) seguido de uma redução (ramp-down) no número de VUs.
- **Configuração:**  
  - Executor: `ramping-vus`  
  - Estágios: 0 a 20 VUs em 30s, depois de 20 para 50 VUs em outros 30s, e finalmente retornando a 0, com uma rampa final de 30s.
- **Objetivo:** Avaliar a escalabilidade e resiliência do endpoint de login, observando o impacto das variações graduais de carga.
- **Exemplo de Execução:**
  ```bash
  yarn test:loadtest -- --env SCENARIO=login_ramp
  ```

---

## Relatórios

Após a execução dos testes, os relatórios são gerados no diretório `reports`, com o arquivo `results.json` contendo os dados brutos.

Basta executar o comando:
```bash
yarn view:report
```

Para visualizar o relatório, abra o arquivo `reports/performance-report.html` no seu navegador.

Exemplo de relatório:

![Relatório de Performance](./reports/performance-report.png)

---

## Tecnologias Utilizadas

- **[k6](https://k6.io/):** Biblioteca para testes de carga.
- **[Node.js](https://nodejs.org/en/):** Gerenciamento de scripts e automação dos testes.
- **[ts-node](https://k6.io/docs/using-k6-with-typescript/):** Para executar o script TypeScript.
- **[rimraf](https://github.com/isaacs/rimraf):** Para limpar o diretório de relatórios antes de cada execução.
- **[open](https://github.com/sindresorhus/open):** Para abrir o relatório no navegador.
- **[express](https://expressjs.com/):** Para servir o relatório.
- **[path](https://nodejs.org/api/path.html):** Para construir o caminho do relatório.
- **[fileURLToPath](https://nodejs.org/api/url.html#url_url_fileurltopath_url):** Para converter o URL do arquivo para um caminho de arquivo.
- **[ts-node](https://k6.io/docs/using-k6-with-typescript/):** Para executar o script TypeScript.

---

## Configuração

Antes de executar os testes, certifique-se de que:
- Todas as dependências estão instaladas:
  ```bash
  yarn install
  ```
- O ambiente de teste está configurado corretamente (variáveis de ambiente, URL do servidor, etc.).
- O comando de execução (`test:loadtest`) está definido corretamente no `package.json` para acionar os testes e gerar os relatórios.

---

Com esses cenários, você poderá avaliar tanto o comportamento ideal quanto as possíveis falhas e gargalos do endpoint de login sob diversas condições de carga e erro. 