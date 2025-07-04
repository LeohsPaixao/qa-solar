# Robot Framework Tests

![Python Version](https://img.shields.io/badge/python-v3.10.2-blue)
![Robot Framework Version](https://img.shields.io/badge/robot--framework-v7.1.1-green)

## 📝 Descrição

Projeto de testes automatizados utilizando Robot Framework com suporte a paralelismo e integração de bibliotecas como Browser e Requests. Este projeto faz parte do monorepo QA Solar e foca em cenários complexos de testes, abrangendo tanto UI quanto API.

## ✅ Pré-requisitos

- **Python** v3.10.2
- **pip** para instalação de pacotes Python
- **Node.js** e **Yarn** configurados para integração com o monorepo (opcional)
- Variáveis de ambiente configuradas no arquivo `.env` (caso necessário)

## ⚙️ Configuração

### 🔧 Instalação

1. Criar um ambiente virtual Python:
   ```bash
   python -m venv venv
   source venv/bin/activate  # No Windows: venv\Scripts\activate
   ```
2. Instalar dependências:
   ```bash
   pip install -r requirements.txt
   ```

### 🚀 Como executar os testes

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

## 🔍 Linter e Formatação

- **Linter:** Robocop é utilizado para garantir boas práticas em arquivos `.robot`.
- **Formatação:** Robotidy é usado para manter um padrão consistente nos arquivos.

## 📊 Relatórios

Os relatórios são gerados na pasta `results/reports` com o formato padrão do Robot Framework. Em execuções paralelas, os logs individuais ficam em `results/logs`.

## 🤝 Guia de Contribuição

### Padrões de Desenvolvimento

Este projeto segue padrões específicos para manter a qualidade e consistência do código:

#### 📝 Convenções de Nomenclatura
- **Arquivos de teste**: Use nomes descritivos em português (ex: `login.robot`, `cadastro_usuario.robot`)
- **Keywords**: Use camelCase para nomes de keywords (ex: `Verificar Elementos Da Tela`)
- **Variáveis**: Use UPPER_CASE para constantes, camelCase para variáveis locais
- **Tags**: Use tags descritivas em português (ex: `smoke`, `regressao`, `api`)

#### 🏗️ Estrutura de Testes
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

#### 📋 Checklist para Novos Testes
- [ ] Teste possui documentação clara
- [ ] Keywords estão organizadas em arquivos apropriados
- [ ] Dados de teste estão separados da lógica
- [ ] Teste possui tags apropriadas
- [ ] Código foi validado com `make lint`
- [ ] Código foi formatado com `make tidy`

#### 🔧 Processo de Desenvolvimento
1. **Fork** do repositório principal
2. Crie uma **branch** para sua feature: `git checkout -b feature/nova-funcionalidade`
3. Desenvolva seguindo os padrões estabelecidos
4. Execute os testes localmente: `make test-all`
5. Valide o código: `make lint && make tidy`
6. **Commit** suas mudanças com mensagens descritivas
7. **Push** para sua branch
8. Abra um **Pull Request** com descrição detalhada

### 📚 Recursos Úteis
- [Documentação Robot Framework](https://robotframework.org/robotframework/)
- [Browser Library](https://marketsquare.github.io/robotframework-browser/Browser.html)
- [Requests Library](https://marketsquare.github.io/robotframework-requests/)
- [Robocop Documentation](https://robocop.readthedocs.io/)

## 📞 Suporte

Para dúvidas sobre o projeto ou problemas técnicos:
- **Issues**: Abra uma issue no repositório do monorepo
- **Documentação**: Consulte a documentação interna do QA Solar
- **Equipe**: Entre em contato com a equipe de QA


