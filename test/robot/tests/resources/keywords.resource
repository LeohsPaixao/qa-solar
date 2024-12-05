*** Settings ***
Library    Browser
Library    String
Variables    ../data/variables.py

*** Keywords ***
Preparar Teste
    [Arguments]    ${BASE_URL}    ${route}=
    Abrir O Navegador    ${BASE_URL}
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