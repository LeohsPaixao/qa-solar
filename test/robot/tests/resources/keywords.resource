*** Settings ***
Library    Browser
Library    CustomLibrary.py
Library    String

*** Variables ***
${BASE_URL}    http://localhost:8181/

*** Keywords ***
Abrir O Navegador
    [Arguments]    ${BASE_URL}
    Should Not Be Empty    ${BASE_URL}
    New Page    ${BASE_URL}
    Get Url    ==    ${BASE_URL}

Fechar O Navegador
    Close Browser

Navegar Para A Rota Login
    Go To    ${BASE_URL}
    Get Url    ==    ${BASE_URL}

Verificar Os Elementos Da Tela
    Wait For Elements State    css=[data-testid="form-login"]    visible
    Wait For Elements State    css=[data-testid="logo"]    visible
    Wait For Elements State    css=[data-testid="input-email"]    visible
    Wait For Elements State    css=[data-testid="input-password"]    visible
    Wait For Elements State    css=[data-testid="btn-login"]    visible

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

Verificar O Feedback Do Usuario
    [Arguments]    ${feedback}
    Wait For Elements State    css=[data-testid="toast-content"]    visible
    Get Text    css=[data-testid="toast-content"]    ==    ${feedback}

Clicar No Link
    [Arguments]    ${testId}
    Click    css=[data-testid="${testId}"]

Verificar A Navegação Da Url
    [Arguments]    ${expectedPath}
    Wait For Navigation    ${BASE_URL}${expectedPath}
    ${currentUrl}=    Get Url
    Should Start With    ${currentUrl}    ${BASE_URL}
    ${urlComponents}=    Parse Url    ${currentUrl}
    Should Be Equal As Strings    ${urlComponents.path}    /${expectedPath}
    Should Be Equal As Strings    ${urlComponents.scheme}    http