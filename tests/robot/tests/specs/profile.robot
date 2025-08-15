*** Settings ***
Documentation       Suite de testes para validar funcionalidades de perfil de usuário.

Library             ../library/CustomDataLibrary.py
Resource            ../resources/keywords.resource
Resource            ../resources/profileKeywords.resource

Test Setup          Preparar Teste Com API    ${BASE_URL}    profile
Test Teardown       Fechar O Navegador


*** Test Cases ***
Cenário 1: Deveria Ser Possível Visualizar Os Elementos Da Tela De Perfil
    [Documentation]    Verifica se os elementos da tela de perfil do usuário estão visíveis.
    Verificar Os Elementos Da Tela De Perfil Do Usuário

Cenário 2: Não Deveria Ser Possível Salvar Sem Nome Completo
    [Documentation]    Verifica se não é possível salvar sem nome completo.
    Apagar O Valor Do Campo    fullname-profile
    Simular Evento De Blur    fullname-profile
    Verificar Os Erros Do Input
    ...    fulname-profile
    ...    O Nome Completo é obrigatório.

Cenário 3: Não Deveria Ser Possível Salvar Apenas Com Nome
    [Documentation]    Verifica se não é possível salvar apenas com nome.
    Preencher Os Campos Do Formulário    fullname-profile    testname
    Verificar Os Erros Do Input
    ...    fulname-profile
    ...    O Nome Completo deve conter pelo menos Nome e Sobrenome.

Cenário 4: Não Deveria Ser Possível Salvar Com Letras No Telefone
    [Documentation]    Verifica se não é possível salvar com letras no telefone.
    Preencher Os Campos Do Formulário    phone-profile    testphone
    Verificar Os Erros Do Input
    ...    phone-profile
    ...    O telefone deve conter apenas números.

Cenário 5: Não Deveria Ser Possível Salvar Telefone Com Mais De 11 Dígitos
    [Documentation]    Verifica se não é possível salvar telefone com mais de 11 dígitos.
    Preencher Os Campos Do Formulário    phone-profile    1452145214521452
    Verificar Os Erros Do Input
    ...    phone-profile
    ...    O telefone deve ter no máximo 11 dígitos.

Cenário 6: Não Deveria Ser Possível Salvar Telefone Com Menos De 10 Dígitos
    [Documentation]    Verifica se não é possível salvar telefone com menos de 10 dígitos.
    Preencher Os Campos Do Formulário    phone-profile    1452
    Verificar Os Erros Do Input
    ...    phone-profile
    ...    O telefone deve ter no mínimo 10 dígitos.

Cenário 7: Deveria Ser Possível Salvar Alteração
    [Documentation]    Verifica se é possível salvar alteração.
    ${fullName}=    Generate Full Name
    ${phone}=    Generate Phone
    ${socialName}=    Generate First Name

    Preencher Os Campos Do Formulário    fullname-profile    ${fullName}
    Preencher Os Campos Do Formulário    phone-profile    ${phone}
    Preencher Os Campos Do Formulário    socialname-profile    ${socialName}
    Clicar No Botão Salvar    [data-testid="btn-save-profile"]
    Verificar A Mensagem Do Toast Ao Tentar Atualizar    Usuário alterado com sucesso!
