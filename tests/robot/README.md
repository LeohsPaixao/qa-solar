# Robot Framework Tests

![Python Version](https://img.shields.io/badge/python-v3.10.2-blue)
![Robot Framework Version](https://img.shields.io/badge/robot--framework-v7.1.1-green)

Projeto de testes automatizados utilizando Robot Framework com suporte a paralelismo e integração de bibliotecas como Browser e Requests. Este projeto faz parte do monorepo QA Solar e foca em cenários complexos de testes, abrangendo tanto UI quanto API.

## 📋 Índice

- [Robot Framework Tests](#robot-framework-tests)
  - [📋 Índice](#-índice)
  - [🔧 Instalação](#-instalação)
  - [🚀 Como executar os testes](#-como-executar-os-testes)
  - [📂 Estrutura do Projeto](#-estrutura-do-projeto)
  - [🛠️ Automação com Makefile](#️-automação-com-makefile)
  - [🏗️ Exemplo de Teste](#️-exemplo-de-teste)
  - [📊 Relatórios](#-relatórios)
  - [📚 Recursos Úteis](#-recursos-úteis)


## 🔧 Instalação

1. Criar um ambiente virtual Python:
   ```bash
   python -m venv venv
   source venv/bin/activate  # No Windows: venv\Scripts\activate
   ```
2. Instalar dependências:
   ```bash
   pip install -r requirements.txt
   ```

## 🚀 Como executar os testes

1. Executar todos os testes:
   ```bash
   make test-all
   ```
2. Executar testes por tag específica:
   ```bash
   make test-scenario TAG=<tag>
   ```
3. Executar um arquivo de teste específico:
   ```bash
   make test-file FILE_PATH=<path_do_arquivo>
   ```
4. Executar com paralelismo:
   ```bash
   make parallel
   ```

## 📂 Estrutura do Projeto

```plaintext
.
├── tests/
│   ├── data/               # Variáveis e dados reutilizáveis
│   ├── library/            # Bibliotecas customizadas feitas em Python
│   ├── resources/          # Keywords e outros recursos para testes
│   ├── specs/              # Testes
├── results/                # Relatórios e logs gerados
├── .env                    # Variáveis de ambiente
├── Makefile                # Scripts para automatização
├── requirements.txt        # Dependências do Python
├── package.json            # Informações do monorepo
```

## 🛠️ Automação com Makefile

O `Makefile` oferece comandos úteis para executar, limpar e validar os testes. Alguns exemplos:

- Limpar resultados anteriores:
  ```bash
  make clean
  ```
- Validar estilo com Robocop:
  ```bash
  make lint
  ```
- Formatar arquivos `.robot` com Robotidy:
  ```bash
  make tidy
  ```
- Executar com argumentos personalizados:
  ```bash
  make test-args
  ```

## 🏗️ Exemplo de Teste
```robotframework
*** Settings ***
Documentation    Descrição clara do que o teste faz
Resource         ../resources/keywords.resource
Library          Browser

Test Setup       Preparar Teste
Test Teardown    Limpar Teste

*** Test Cases ***
Cenário 1: Descrição do Cenário
    [Documentation]    Explicação detalhada do teste
    [Tags]            smoke    ui
    # Implementação do teste
```

## 📊 Relatórios

Os relatórios são gerados na pasta `results/reports` com o formato padrão do Robot Framework. Em execuções paralelas, os logs individuais ficam em `results/logs`.

## 📚 Recursos Úteis
- [Documentação Robot Framework](https://robotframework.org/robotframework/)
- [Browser Library](https://marketsquare.github.io/robotframework-browser/Browser.html)
- [Requests Library](https://marketsquare.github.io/robotframework-requests/)
- [Robocop Documentation](https://robocop.readthedocs.io/)
