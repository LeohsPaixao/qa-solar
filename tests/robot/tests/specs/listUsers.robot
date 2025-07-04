*** Settings ***
Documentation       Suite de testes para validar funcionalidades de listagem de usuários.

Resource            ../resources/keywords.resource
Resource            ../resources/listUsersKeywords.resource

Test Setup          Preparar Teste Com API    ${BASE_URL}    listusers
Test Teardown       Fechar O Navegador


*** Test Cases ***
Deveria Ser Possível Visualizar Elementos Da Tela De Listagem De Usuários
    [Documentation]    Testa a exibição correta dos elementos na tela de listagem de usuários.
    Verificar Elemento Visível    [data-testid="table-users"]
    Verificar Elemento Visível    [data-testid="checkbox-select-all"]
    Verificar Elemento Visível    [data-testid="btn-delete-user"]

Deveria Ser Possível Selecionar Todos Os Usuários
    [Documentation]    Testa a seleção de todos os usuários.
    Selecionar Checkbox    [data-testid="checkbox-select-all"]
    Verificar Se O Checkbox Foi Selecionado

Deveria Ser Possível Selecionar Um Usuário E Excluí-lo
    [Documentation]    Testa a seleção de um usuário e sua exclusão.
    Selecionar Checkbox Por Índice    2
    Clicar Botão    [data-testid="btn-delete-user"]
    Verificar Mensagem Toast    1 usuário(s) excluído(s) com sucesso!
