# Projeto de Performance do Monorepo

Este projeto mede, monitora e otimiza a performance dos componentes do sistema, realizando testes automatizados e benchmarks para identificar gargalos e melhorias.

## Índice
- [Projeto de Performance do Monorepo](#projeto-de-performance-do-monorepo)
  - [Índice](#índice)
  - [Descrição](#descrição)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Configuração](#configuração)
  - [Execução dos Testes](#execução-dos-testes)
  - [Relatórios](#relatórios)

## Descrição

Este projeto foca em testes de carga na API do backend utilizando o **k6**. O principal teste consiste em simular **100 logins simultâneos** para validar a capacidade de resposta e estabilidade da API.

## Tecnologias Utilizadas

- **k6** para testes de carga.
- **Node.js** para gerenciar scripts.

## Configuração

1. Ajuste os parâmetros do teste no arquivo `test/loadtest.js` caso necessário.

## Execução dos Testes

Para rodar o teste de carga:
```bash
yarn test:loadtest
```
O script executa o **k6**, simulando **100 logins simultâneos**, verificando tempos de resposta e estabilidade.

## Relatórios

Os relatórios são gerados no diretório `reports` com o nome `performance-report.html`.

