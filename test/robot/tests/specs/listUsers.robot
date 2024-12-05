*** Settings ***
Resource            ../resources/keywords.resource
Resource            ../resources/listUsersKeywords.resource

Test Setup          Preparar Teste com API    ${BASE_URL}    listusers
Test Teardown       Fechar O Navegador

*** Test Cases ***
Deveria Ser Possível Visualizar Elementos Da Tela De Listagem De Usuários
    Verificar Elemento Visível    [data-testid="table-users"]
    Verificar Elemento Visível    [data-testid="checkbox-select-all"]
    Verificar Elemento Visível    [data-testid="btn-delete-user"]

Deveria Ser Possível Selecionar Todos Os Usuários
    Selecionar Checkbox    [data-testid="checkbox-select-all"]
    Verificar Se o Checkbox Foi Selecionado

Deveria Ser Possível Selecionar Um Usuário E Excluí-lo
    Selecionar Checkbox Por Índice    2
    Clicar Botão    [data-testid="btn-delete-user"]
    Verificar Mensagem Toast    1 usuário(s) excluído(s) com sucesso!