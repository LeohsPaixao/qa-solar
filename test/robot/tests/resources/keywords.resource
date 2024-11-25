*** Settings ***
Library    SeleniumLibrary
Library    CustomLibrary.py
Library    String

*** Variables ***
${BASE_URL}    http://localhost:8181/
${BROWSER}     headlesschrome
${DELAY}       2

*** Keywords ***
Abrir o navegador
    [Arguments]    ${BASE_URL}
    Should Not Be Empty    ${BASE_URL}
    Open Browser    ${BASE_URL}    ${BROWSER}
    Maximize Browser Window
    Location Should Be    ${BASE_URL}

Fechar o navegador
    Close Browser

Navegar para a rota Login
    Go To    ${BASE_URL}login
    Location Should Be    ${BASE_URL}login

Verificar os elementos da tela
    Element Should Be Visible    css:[data-testid="form"]
    Element Should Be Visible    css:[data-testid="logo"]
    Element Should Be Visible    css:[data-testid="input-email"]
    Element Should Be Visible    css:[data-testid="input-password"]
    Element Should Be Visible    css:[data-testid="btn-login"]

Digitar o email do usuario
    [Arguments]    ${email}
    Element Should Be Disabled    css:[data-testid="btn-login"]
    Input Text    css:[data-testid="input-email"]    ${email}

Digitar o password do usuario
    [Arguments]    ${password}
    Input Password    css:[data-testid="input-password"]    ${password}
    Element Should Be Enabled    css:[data-testid="btn-login"]

Clicar no botão de Entrar na Conta
    Click Element    css:[data-testid="btn-login"]

Verificar o feedback do usuario
    [Arguments]    ${feedback}
    Wait Until Element Is Visible    css:[data-testid="toast-content"]
    Element Text Should Be    css:[data-testid="toast-content"]    ${feedback}

Clicar no link
    [Arguments]    ${testId}
    Click Element    css:[data-testid="${testId}"]

Verificar a navegação da url
    [Arguments]    ${expectedPath}
    Wait Until Location Contains    ${expectedPath}
    ${currentUrl}=    Get Location
    Should Start With    ${currentUrl}    ${BASE_URL}
    ${urlComponents}=    Parse Url    ${currentUrl}
    Should Be String    ${urlComponents.netloc}    ${BASE_URL}
    Should Be Equal As Strings    ${urlComponents.path}    ${expectedPath}
    Should Be Equal As Strings    ${urlComponents.scheme}    http