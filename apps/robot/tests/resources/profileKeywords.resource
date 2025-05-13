*** Settings ***
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
    [Arguments]    ${selector}    ${expected_error}
    ${error}=    Get Text    ${selector}
    Should Be Equal    ${error}    ${expected_error}

Preencher Os Campos Do Formulário
    [Arguments]    ${selector}    ${value}
    Fill Text    ${selector}    ${value}

Clicar No Botão Salvar
    [Arguments]    ${selector}
    Click    ${selector}
