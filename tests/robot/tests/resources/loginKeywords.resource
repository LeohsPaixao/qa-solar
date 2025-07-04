*** Settings ***
Documentation   Keywords para login.

Library    Browser
Library    ../library/CustomLibrary.py
Library    String
Variables  ../data/variables.py

*** Keywords ***
Verificar Os Elementos Da Tela
    Wait For Elements State    css=[data-testid="form-login"]    visible
    Wait For Elements State    css=[data-testid="logo"]    visible
    Wait For Elements State    css=[data-testid="input-email"]    visible
    Wait For Elements State    css=[data-testid="input-password"]    visible
    Wait For Elements State    css=[data-testid="btn-login"]    visible

Verificar O Feedback Do Usuario
    [Arguments]    ${feedback}
    Wait For Elements State    css=[data-testid="toast-content"]    visible
    Get Text    css=[data-testid="toast-content"]    ==    ${feedback}

Verificar A Navegação Da Url
    [Arguments]    ${expectedPath}
    Wait For Navigation    ${BASE_URL}${expectedPath}
    ${currentUrl}=    Get Url
    Should Start With    ${currentUrl}    ${BASE_URL}
    ${urlComponents}=    Parse Url    ${currentUrl}
    Should Be Equal As Strings    ${urlComponents.path}    /${expectedPath}
    Should Be Equal As Strings    ${urlComponents.scheme}    http

Digitar O Email Do Usuario
    [Arguments]    ${email}
    Wait For Elements State    css=[data-testid="btn-login"]    disabled
    Fill Text    css=[data-testid="input-email"]    ${email}

Digitar O Password Do Usuario
    [Arguments]    ${password}
    Fill Text    css=[data-testid="input-password"]    ${password}
    Wait For Elements State    css=[data-testid="btn-login"]    enabled

Clicar No Botão De Entrar Na Conta
    Click    css=[data-testid="btn-login"]

Clicar No Link
    [Arguments]    ${testId}
    Click    css=[data-testid="${testId}"]