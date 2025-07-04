*** Settings ***
Documentation   Keywords para preparar e executar testes.

Library    Browser
Library    RequestsLibrary
Library    String
Variables    ../data/variables.py

*** Keywords ***
Preparar Teste
    [Arguments]    ${BASE_URL}    ${route}=
    Abrir O Navegador    ${BASE_URL}
    Navegar Para A Rota    ${route}

Preparar Teste Com API
    [Arguments]    ${BASE_URL}    ${route}=
    Abrir O Navegador    ${BASE_URL}
    Login Via API
    Navegar Para A Rota    ${route}
    

Abrir O Navegador
    [Arguments]    ${BASE_URL}
    Should Not Be Empty    ${BASE_URL}
    New Page    ${BASE_URL}
    Get Url    ==    ${BASE_URL}

Navegar Para A Rota
    [Arguments]    ${route}=
    Go To    ${BASE_URL}${route}

Fechar O Navegador
    Close Browser

Login Via API
    ${payload}=    Evaluate    {"email": "${EMAIL}", "password": "${PASSWORD}"}    json
    ${response}=    POST    ${API_URL}/auth/login    json=${payload}
    Should Be Equal As Numbers    ${response.status_code}    200

    ${responseJson}=    Evaluate    ${response.text}    json
    ${token}=    Set Variable    ${responseJson["token"]}

    LocalStorage Set Item    user-token    ${token}