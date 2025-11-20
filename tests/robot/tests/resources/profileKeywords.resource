*** Settings ***
Documentation       Keywords para perfil do usuário.

Library             String
Library             Browser
Library             RequestsLibrary
Variables           ../data/variables.py


*** Keywords ***
Verificar Os Elementos Da Tela De Perfil Do Usuário
    [Documentation]    Verifica se os elementos da tela de perfil do usuário estão visíveis.
    Wait For Elements State    [data-testid="form-profile"]    visible
    Wait For Elements State    [data-testid="btn-save-profile"]    visible
    Wait For Elements State    .form-group:first-of-type    visible

Verificar A Mensagem Do Toast Ao Tentar Atualizar
    [Documentation]    Verifica a mensagem do toast ao tentar atualizar.
    [Arguments]    ${expected_message}
    ${toast}=    Get Text    [data-testid="toast-content"]
    Should Be Equal    ${toast}    ${expected_message}

Verificar Os Erros Do Input
    [Documentation]    Verifica os erros do input.
    [Arguments]    ${locator}    ${expected_error}
    ${error}=    Get Text    css=[data-testid="input-error-${locator}"]
    Should Be Equal    ${error}    ${expected_error}

Preencher Os Campos Do Formulário
    [Documentation]    Preenche os campos do formulário.
    [Arguments]    ${locator}    ${value}
    Fill Text    css=[data-testid="input-${locator}"]    ${value}

Clicar No Botão Salvar
    [Documentation]    Clica no botão salvar.
    [Arguments]    ${selector}
    Wait For Elements State    ${selector}    visible
    Click    ${selector}

Apagar O Valor Do Campo
    [Documentation]    Apaga o valor do campo.
    [Arguments]    ${locator}
    Clear Text    css=[data-testid="input-${locator}"]

Simular Evento De Blur
    [Documentation]    Simula o evento de blur.
    [Arguments]    ${locator}
    Press Keys    css=[data-testid="input-${locator}"]    Tab
