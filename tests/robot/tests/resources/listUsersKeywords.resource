*** Settings ***
Documentation   Keywords para listagem de usuários.

Library         Browser
Library         RequestsLibrary
Library         String
Library         Collections
Variables       ../data/variables.py


*** Keywords ***
Verificar Elemento Visível
    [Arguments]    ${selector}
    Scroll To    ${selector}
    Wait For Elements State    ${selector}    visible

Verificar Mensagem Toast
    [Arguments]    ${expected_message}
    ${toast}=    Get Text    [data-testid="toast-content"]
    Should Be Equal    ${toast}    ${expected_message}

Verificar Se O Checkbox Foi Selecionado
    ${checkbox_state}=    Get Element States    [data-testid="checkbox-select-all"]
    List Should Contain Value    ${checkbox_state}    checked

Selecionar Checkbox
    [Arguments]    ${selector}
    Check Checkbox    ${selector}

Selecionar Checkbox Por Índice
    [Arguments]    ${index}
    ${checkboxes}=    Get Elements    [data-testid="checkbox-select-users"]
    Run Keyword If    ${index} >= len(${checkboxes})    Fail    Índice ${index} fora do intervalo: existem apenas ${len(${checkboxes})} checkboxes.
    ${checkbox}=    Get From List    ${checkboxes}    ${index}
    Check Checkbox    ${checkbox}


Clicar Botão
    [Arguments]    ${selector}
    Scroll To    ${selector}
    Click    ${selector}
