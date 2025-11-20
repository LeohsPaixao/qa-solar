*** Settings ***
Documentation       Keywords para cadastro de usuários.

Library             String
Library             Browser
Library             ../library/CustomLibrary.py
Library             ../library/CustomDataLibrary.py
Library             ../library/GenerateCPFLibrary.py
Variables           ../data/variables.py


*** Keywords ***
Verificar Os Elementos Da Tela De Cadastro
    [Documentation]    Verifica se os elementos da tela de cadastro estão visíveis.
    Wait For Elements State    css=[data-testid="register-form"]    visible
    Wait For Elements State    css=.form-group:first-of-type    visible
    Wait For Elements State    css=[data-testid="btn-register"]    visible
    Wait For Elements State    css=[data-testid="link-go-to-login"]    visible

Verificar A Mensagem De Erro No Toast
    [Documentation]    Verifica a mensagem de erro no toast.
    Wait For Elements State    css=[data-testid="toast-content"]    visible
    ${elementText}=    Get Text    [data-testid="toast-content"]
    Should Be Equal    ${elementText}    ${TOAST_MESSAGE}

Verificar A Mensagem Do Erro No Campo
    [Documentation]    Verifica a mensagem do erro no campo.
    [Arguments]    ${name}    ${error}
    Wait For Elements State    [data-testid="input-error-${name}"]    visible
    ${elementText}=    Get Text    [data-testid="input-error-${name}"]
    Should Be Equal    ${elementText}    ${error}

Verificar A Mensagens De Erro Nos Campos
    [Documentation]    Verifica as mensagens de erro nos campos.
    ${length}=    Get List Length    ${INPUT_NAMES}
    FOR    ${index}    IN RANGE    0    ${length}
        ${name}=    Get From List    ${INPUT_NAMES}    ${index}
        ${error}=    Get From List    ${INPUT_ERRORS}    ${index}
        Wait For Elements State    css=[data-testid="input-error-${name}"]    visible
        ${elementText}=    Get Text    [data-testid="input-error-${name}"]
        Should Be Equal    ${elementText}    ${error}
    END

Verificar A Mensagem De Sucesso No Toast
    [Documentation]    Verifica a mensagem de sucesso no toast.
    Wait For Elements State    css=[data-testid="toast-content"]    visible
    ${toastText}=    Get Text    css=[data-testid="toast-content"]
    Should Be Equal    ${toastText}    Usuário criado com sucesso!

Clicar No Botão Cadastrar
    [Documentation]    Clica no botão de cadastrar.
    Click    css=[data-testid="btn-register"]

Preencher O Campo
    [Documentation]    Preenche o campo.
    [Arguments]    ${field}    ${text}
    Fill Text    css=[data-testid="input-${field}"]    ${text}
    Simular Evento De Blur    ${field}

Preencher Todos Os Campos
    [Documentation]    Preenche todos os campos.
    ${cpf}=    Generate Valid Cpf
    ${fullName}=    Generate Full Name
    ${email}=    Generate Email
    ${phone}=    Generate Phone

    Fill Text    css=[data-testid="input-fullname"]    ${fullName}
    Fill Text    css=[data-testid="input-socialname"]    Nome Social
    Fill Text    css=[data-testid="input-document"]    ${cpf}
    Fill Text    css=[data-testid="input-phone"]    ${phone}
    Fill Text    css=[data-testid="input-email"]    ${email}
    Fill Text    css=[data-testid="input-password"]    123456
    Fill Text    css=[data-testid="input-password-confirmation"]    123456

Apagar O Valor Dos Campos
    [Documentation]    Apaga o valor dos campos.
    Clear Text    css=[data-testid="input-fullname"]
    Clear Text    css=[data-testid="input-socialname"]
    Clear Text    css=[data-testid="input-document"]
    Clear Text    css=[data-testid="input-phone"]
    Clear Text    css=[data-testid="input-email"]
    Clear Text    css=[data-testid="input-password"]
    Clear Text    css=[data-testid="input-password-confirmation"]

Simular Evento De Blur
    [Documentation]    Simula o evento de blur.
    [Arguments]    ${locator}
    Press Keys    css=[data-testid="input-${locator}"]    Tab

Selecionar O Tipo De Documento
    [Documentation]    Seleciona o tipo de documento.
    Select Options By    css=[data-testid="select-document-type"]    value    cnpj
