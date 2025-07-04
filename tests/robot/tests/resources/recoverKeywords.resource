*** Settings ***
Documentation   Keywords para recuperação de senha.

Library         Browser
Library         String
Variables       ../data/variables.py


*** Keywords ***
Verificar Os Elementos Da Tela De Recuperação De Senha
    Wait For Elements State    [data-testid="form-recover-password"]    visible
    Wait For Elements State    [data-testid="input-email-recover-password"]    visible
    Wait For Elements State    [data-testid="btn-recover-password"]    visible
    Wait For Elements State    [data-testid="link-go-to-login"]    visible

Verificar Se O Toast Não Esta Presente
    Wait For Elements State    [data-testid="input-email-recover-password"]    focused

Verificar Se Esta Na Tela De Login
    Wait For Elements State    [data-testid="form-login"]    visible

Verificar A Mensagem Do Toast De Recuperação
    [Arguments]    ${message}
    Wait For Elements State    [data-testid="toast-content"]    visible
    ${text}=    Get Text    [data-testid="toast-content"]
    Should Be Equal    ${text}    ${message}

Clicar No Botão De Recuperar A Senha
    Click    [data-testid="btn-recover-password"]

Clicar No Link De Voltar Tela De Login
    Click    [data-testid="link-go-to-login"]

Preencher O Campo De Email
    [Arguments]    ${txt}
    Fill Text    [data-testid="input-email-recover-password"]    ${txt}