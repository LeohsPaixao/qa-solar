*** Settings ***
Documentation   Keywords para perfil de usuário.

Library    Browser
Library    RequestsLibrary
Library    String
Variables    ../data/variables.py

*** Keywords ***
Verificar Os Elementos Da Tela De Perfil Do Usuário
    Wait For Elements State    [data-testid="form-profile"]    visible
    Wait For Elements State    [data-testid="btn-save-profile"]    disabled
    Wait For Elements State    .form-group:first-of-type    visible

Verificar A Mensagem Do Toast Ao Tentar Atualizar
    [Arguments]    ${expected_message}
    ${toast}=    Get Text    [data-testid="toast-content"]
    Should Be Equal    ${toast}    ${expected_message}

Verificar Os Erros Do Input
    [Arguments]    ${locator}    ${expected_error}
    ${error}=    Get Text    css=[data-testid="input-error-${locator}"]
    Should Be Equal    ${error}    ${expected_error}

Preencher Os Campos Do Formulário
    [Arguments]    ${locator}    ${value}
    Fill Text    css=[data-testid="input-${locator}"]    ${value}

Clicar No Botão Salvar
    [Arguments]    ${selector}
    Click    ${selector}

Apagar O Valor Do Campo
    [Arguments]    ${locator}
    Clear Text    css=[data-testid="input-${locator}"]

Simular Evento De Blur
    [Arguments]    ${locator}
    Press Keys    css=[data-testid="input-${locator}"]    Tab