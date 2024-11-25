*** Settings ***
Library    SeleniumLibrary
Library    RequestsLibrary
Library    String

*** Variables ***
${URL}    http://localhost:8181/
${BROWSER}    headlesschrome
${DELAY}    3

*** Keywords ***

Abrir o navegador
    [Arguments]    ${URL}
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Location Should Be    ${URL}

Fechar o navegador
    Close Browser

Navegar para a rota Login
    [Arguments]    ${URL}
    Go To    ${URL}login
    Location Should Be    ${URL}login

Verificar os elementos da tela
    Element Should Be Visible    css:[data-testid="form"]
    Element Should Be Visible    css:[data-testid="logo"]
    Element Should Be Visible    css:[data-testid="input-email"]
    Element Should Be Visible    css:[data-testid="input-password"]
    Element Should Be Visible    css:[data-testid="btn-login"]