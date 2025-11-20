*** Settings ***
Documentation       Keywords para preparação e execução de testes.

Library             String
Library             Browser
Library             RequestsLibrary
Variables           ../data/variables.py


*** Keywords ***
Preparar Teste
    [Documentation]    Prepara o teste para ser executado.
    [Arguments]    ${BASE_URL}    ${route}=${EMPTY}
    Abrir O Navegador    ${BASE_URL}
    Navegar Para A Rota    ${route}

Preparar Teste Com API
    [Documentation]    Prepara o teste para ser executado com API.
    [Arguments]    ${BASE_URL}    ${route}=${EMPTY}
    Abrir O Navegador    ${BASE_URL}
    Login Via API
    Navegar Para A Rota    ${route}

Abrir O Navegador
    [Documentation]    Abre o navegador.
    [Arguments]    ${BASE_URL}
    Should Not Be Empty    ${BASE_URL}
    New Page    ${BASE_URL}
    Get Url    ==    ${BASE_URL}

Navegar Para A Rota
    [Documentation]    Navega para a rota.
    [Arguments]    ${route}=${EMPTY}
    Go To    ${BASE_URL}${route}

Fechar O Navegador
    [Documentation]    Fecha o navegador.
    Close Browser

Login Via API
    [Documentation]    Faz login via API.
    ${payload}=    Evaluate    {"email": "${EMAIL}", "password": "${PASSWORD}"}    json
    ${response}=    POST    ${API_URL}/auth/login    json=${payload}
    Should Be Equal As Numbers    ${response.status_code}    200

    ${responseJson}=    Evaluate    ${response.text}    json
    ${token}=    Set Variable    ${responseJson["token"]}

    LocalStorage Set Item    user-token    ${token}
