*** Settings ***
Documentation       Keywords para listagem de usuários.

Library             Collections
Library             String
Library             Browser
Library             RequestsLibrary
Variables           ../data/variables.py


*** Keywords ***
Verificar Elemento Visível
    [Documentation]    Verifica se o elemento está visível.
    [Arguments]    ${selector}
    Scroll To    ${selector}
    Wait For Elements State    ${selector}    visible

Verificar Mensagem Toast
    [Documentation]    Verifica a mensagem do toast.
    [Arguments]    ${expected_message}
    ${toast}=    Get Text    [data-testid="toast-content"]
    Should Be Equal    ${toast}    ${expected_message}

Verificar Se O Checkbox Foi Selecionado
    [Documentation]    Verifica se o checkbox foi selecionado.
    ${checkbox_state}=    Get Element States    [data-testid="checkbox-select-all"]
    List Should Contain Value    ${checkbox_state}    checked

Selecionar Checkbox
    [Documentation]    Seleciona o checkbox.
    [Arguments]    ${selector}
    Check Checkbox    ${selector}

Selecionar Checkbox Por Índice
    [Documentation]    Seleciona o checkbox por índice.
    [Arguments]    ${index}
    ${checkboxes}=    Get Elements    [data-testid="checkbox-select-users"]
    IF    ${index} >= len(${checkboxes})
        Fail    Índice ${index} fora do intervalo: existem apenas ${len(${checkboxes})} checkboxes.
    END
    ${checkbox}=    Get From List    ${checkboxes}    ${index}
    Check Checkbox    ${checkbox}

Clicar Botão
    [Documentation]    Clica no botão.
    [Arguments]    ${selector}
    Scroll To    ${selector}
    Click    ${selector}
