*** Settings ***
Documentation       Keywords para recuperação de senha.

Library             String
Library             Browser
Variables           ../data/variables.py


*** Keywords ***
Verificar Os Elementos Da Tela De Recuperação De Senha
    [Documentation]    Verifica se os elementos da tela de recuperação de senha estão visíveis.
    Wait For Elements State    [data-testid="form-recover-password"]    visible
    Wait For Elements State    [data-testid="input-email-recover-password"]    visible
    Wait For Elements State    [data-testid="btn-recover-password"]    visible
    Wait For Elements State    [data-testid="link-go-to-login"]    visible

Verificar Se O Toast Não Esta Presente
    [Documentation]    Verifica se o toast não está presente.
    Wait For Elements State    [data-testid="toast-content"]    hidden

Verificar Se Esta Na Tela De Login
    [Documentation]    Verifica se está na tela de login.
    Wait For Elements State    [data-testid="form-login"]    visible

Verificar A Mensagem Do Toast De Recuperação
    [Documentation]    Verifica a mensagem do toast de recuperação.
    [Arguments]    ${message}
    Wait For Elements State    [data-testid="toast-content"]    visible
    ${text}=    Get Text    [data-testid="toast-content"]
    Should Be Equal    ${text}    ${message}

Clicar No Botão De Recuperar A Senha
    [Documentation]    Clica no botão de recuperar a senha.
    Click    [data-testid="btn-recover-password"]

Clicar No Link De Voltar Tela De Login
    [Documentation]    Clica no link de voltar para a tela de login.
    Click    [data-testid="link-go-to-login"]

Preencher O Campo De Email
    [Documentation]    Preenche o campo de email.
    [Arguments]    ${txt}
    Fill Text    [data-testid="input-email-recover-password"]    ${txt}
