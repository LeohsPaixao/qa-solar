*** Settings ***
Library             ../library/CustomDataLibrary.py
Resource            ../resources/keywords.resource
Resource            ../resources/profileKeywords.resource

Test Setup          Preparar Teste com API    ${BASE_URL}    profile
Test Teardown       Fechar O Navegador


*** Test Cases ***
Cenário 1: Deveria Ser Possível Visualizar Os Elementos Da Tela De Perfil
    Verificar Os Elementos Da Tela De Perfil Do Usuário

Cenário 2: Não Deveria Ser Possível Salvar Sem Nome Completo
    Preencher Os Campos Do Formulário    [data-testid="input-fullname-profile"]    ${NAME}
    Clicar No Botão Salvar    [data-testid="btn-save-profile"]
    Verificar A Mensagem Do Toast Ao Tentar Atualizar    Por favor, corrija os erros antes de salvar.
    Verificar Os Erros Do Input    [data-testid="input-error-fulname-profile"]    O Nome Completo é obrigatório.

Cenário 3: Não Deveria Ser Possível Salvar Apenas Com Nome
    Preencher Os Campos Do Formulário    [data-testid="input-fullname-profile"]    testname
    Clicar No Botão Salvar    [data-testid="btn-save-profile"]
    Verificar A Mensagem Do Toast Ao Tentar Atualizar    Por favor, corrija os erros antes de salvar.
    Verificar Os Erros Do Input
    ...    [data-testid="input-error-fulname-profile"]
    ...    O Nome Completo deve conter pelo menos Nome e Sobrenome.

Cenário 4: Não Deveria Ser Possível Salvar Com Letras No Telefone
    Preencher Os Campos Do Formulário    [data-testid="input-phone-profile"]    testphone
    Clicar No Botão Salvar    [data-testid="btn-save-profile"]
    Verificar A Mensagem Do Toast Ao Tentar Atualizar    Por favor, corrija os erros antes de salvar.
    Verificar Os Erros Do Input    [data-testid="input-error-phone-profile"]    O telefone deve conter apenas números.

Cenário 5: Não Deveria Ser Possível Salvar Telefone Com Mais De 11 Dígitos
    Preencher Os Campos Do Formulário    [data-testid="input-phone-profile"]    1452145214521452
    Clicar No Botão Salvar    [data-testid="btn-save-profile"]
    Verificar A Mensagem Do Toast Ao Tentar Atualizar    Por favor, corrija os erros antes de salvar.
    Verificar Os Erros Do Input    [data-testid="input-error-phone-profile"]    O telefone deve ter no máximo 11 dígitos.

Cenário 6: Não Deveria Ser Possível Salvar Telefone Com Menos De 10 Dígitos
    Preencher Os Campos Do Formulário    [data-testid="input-phone-profile"]    1452
    Clicar No Botão Salvar    [data-testid="btn-save-profile"]
    Verificar A Mensagem Do Toast Ao Tentar Atualizar    Por favor, corrija os erros antes de salvar.
    Verificar Os Erros Do Input    [data-testid="input-error-phone-profile"]    O telefone deve ter no mínimo 10 dígitos.

Cenário 7: Deveria Ser Possível Salvar Alteração
    ${fullName}=    Generate Full Name
    ${phone}=    Generate Phone
    ${socialName}=    Generate First Name

    Preencher Os Campos Do Formulário    [data-testid="input-fullname-profile"]    ${fullName}
    Preencher Os Campos Do Formulário    [data-testid="input-phone-profile"]    ${phone}
    Preencher Os Campos Do Formulário    [data-testid="input-socialname-profile"]    ${socialName}
    Clicar No Botão Salvar    [data-testid="btn-save-profile"]
    Verificar A Mensagem Do Toast Ao Tentar Atualizar    Usuário alterado com sucesso.
