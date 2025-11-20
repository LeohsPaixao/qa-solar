*** Settings ***
Documentation       Keywords para login.

Library             String
Library             Browser
Library             ../library/CustomLibrary.py
Variables           ../data/variables.py


*** Keywords ***
Verificar Os Elementos Da Tela
    [Documentation]    Verifica se os elementos da tela de login estão visíveis.
    Wait For Elements State    css=[data-testid="form-login"]    visible
    Wait For Elements State    css=[data-testid="logo"]    visible
    Wait For Elements State    css=[data-testid="input-email"]    visible
    Wait For Elements State    css=[data-testid="input-password"]    visible
    Wait For Elements State    css=[data-testid="btn-login"]    visible

Verificar O Feedback Do Usuario
    [Documentation]    Verifica o feedback do usuário.
    [Arguments]    ${feedback}
    Wait For Elements State    css=[data-testid="toast-content"]    visible
    Get Text    css=[data-testid="toast-content"]    ==    ${feedback}

Verificar A Navegação Da Url
    [Documentation]    Verifica a navegação da url.
    [Arguments]    ${expectedPath}
    Wait For Navigation    ${BASE_URL}${expectedPath}
    ${currentUrl}=    Get Url
    Should Start With    ${currentUrl}    ${BASE_URL}
    ${urlComponents}=    Parse Url    ${currentUrl}
    Should Be Equal As Strings    ${urlComponents.path}    /${expectedPath}
    Should Be Equal As Strings    ${urlComponents.scheme}    http

Verificar A Mensagem De Erro No Input
    [Documentation]    Verifica a mensagem de erro no input.
    [Arguments]    ${input}    ${error}
    Wait For Elements State    css=[data-testid="message-error-${input}"]    visible
    Get Text    css=[data-testid="message-error-${input}"]    ==    ${error}

Digitar O Email Do Usuario
    [Documentation]    Digita o email do usuário.
    [Arguments]    ${email}
    Wait For Elements State    css=[data-testid="input-email"]    visible
    Fill Text    css=[data-testid="input-email"]    ${email}

Digitar O Password Do Usuario
    [Documentation]    Digita a senha do usuário.
    [Arguments]    ${password}
    Wait For Elements State    css=[data-testid="input-password"]    visible
    Fill Text    css=[data-testid="input-password"]    ${password}

Limpar Os Campos De Email E Senha
    [Documentation]    Limpa os campos de email e senha.
    Clear Text    css=[data-testid="input-email"]
    Clear Text    css=[data-testid="input-password"]
    Simular Evento De Blur    password

Simular Evento De Blur
    [Documentation]    Simula o evento de blur.
    [Arguments]    ${locator}
    Press Keys    css=[data-testid="input-${locator}"]    Tab

Clicar No Botão De Entrar Na Conta
    [Documentation]    Clica no botão de entrar na conta.
    Wait For Elements State    css=[data-testid="btn-login"]    enabled
    Click    css=[data-testid="btn-login"]

Clicar No Link
    [Documentation]    Clica no link.
    [Arguments]    ${testId}
    Click    css=[data-testid="${testId}"]
