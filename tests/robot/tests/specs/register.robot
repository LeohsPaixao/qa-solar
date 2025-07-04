*** Settings ***
Documentation       Suite de testes para validar funcionalidades de cadastro de usuários.

Resource            ../resources/keywords.resource
Resource            ../resources/registerKeywords.resource
Resource            ../resources/recoverKeywords.resource

Test Setup          Preparar Teste    ${BASE_URL}    signup
Test Teardown       Fechar O Navegador


*** Test Cases ***
Cenário 1: Deveria Ser Possível Visualizar Os Elementos Da Tela De Cadastros
    [Documentation]    Verifica se todos os elementos esperados na tela de cadastro são exibidos corretamente.
    Verificar Os Elementos Da Tela De Cadastro

Cenário 2: Não Deveria Ser Possível Criar O Usuário Com O Nome Completo Errado
    [Documentation]    Testa a validação do campo "Nome Completo" com um valor inválido.
    Preencher O Campo    fullname    Teste
    Verificar A Mensagem Do Erro No Campo    fullname    O Nome Completo deve conter pelo menos Nome e Sobrenome.

Cenário 3: Não Deveria Ser Possível Criar O Usuário Com O CPF Inválido
    [Documentation]    Verifica a validação do campo "CPF" ao inserir um CPF inválido.
    Preencher O Campo    document    123.456.789-10
    Verificar A Mensagem Do Erro No Campo    cpfcnpj    CPF inválido.

Cenário 4: Não Deveria Ser Possível Criar O Usuário Com O CNPJ Inválido
    [Documentation]    Verifica a validação do campo "CNPJ" ao inserir um valor inválido.
    Selecionar O Tipo De Documento
    Preencher O Campo    document    12.456.789/1110-60
    Verificar A Mensagem Do Erro No Campo    cpfcnpj    CNPJ inválido.

Cenário 5: Não Deveria Ser Possível Colocar Letras No Campo De Telefone
    [Documentation]    Testa a validação do campo "Telefone" com caracteres não numéricos.
    Preencher O Campo    phone    gdgrgdfg
    Verificar A Mensagem Do Erro No Campo    phone    O telefone deve conter apenas números.

Cenário 6: Não Deveria Ser Possível Colocar Mais Do Que 11 Dígitos No Campo De Telefone
    [Documentation]    Verifica se o campo "Telefone" limita a quantidade máxima de dígitos.
    Preencher O Campo    phone    5454654154515454
    Verificar A Mensagem Do Erro No Campo    phone    O telefone deve ter no máximo 11 dígitos.

Cenário 7: Não Deveria Ser Possível Colocar Menos Do Que 10 Dígitos No Campo De Telefone
    [Documentation]    Verifica se o campo "Telefone" exige a quantidade mínima de 10 dígitos.
    Preencher O Campo    phone    1524
    Verificar A Mensagem Do Erro No Campo    phone    O telefone deve ter no mínimo 10 dígitos.

Cenário 8
    [Documentation]    Verifica a validação do campo "Email" ao inserir um email inválido.
    Preencher O Campo    email    email@esdsd
    Verificar A Mensagem Do Erro No Campo    email    Email inválido.

Cenário 9: Não Deveria Ser Possível Criar O Usuário Com Uma Senha Com Menos De 6 Caracteres
    [Documentation]    Verifica se o campo "Senha" exige ao menos 6 caracteres.
    Preencher O Campo    password    1452
    Verificar A Mensagem Do Erro No Campo    password    A Senha deve ter no mínimo 6 caracteres.

Cenário 10: Não Deveria Ser Possível Criar O Usuário Com Uma Senha Com Mais De 20 Caracteres
    [Documentation]    Verifica se o campo "Senha" limita a senha para no máximo 20 caracteres.
    Preencher O Campo    password    412541254125412541020
    Verificar A Mensagem Do Erro No Campo    password    A Senha deve ter no máximo 20 caracteres.

Cenário 11: Deveria Ser Possível Visualizar Os Erros Embaixo Dos Inputs Ao Adicionar Um Valor e Remover
    [Documentation]    Verifica se os erros são exibidos corretamente ao adicionar um valor e remover.
    Preencher Todos Os Campos
    Apagar O Valor Dos Campos
    Simular Evento De Blur    password-confirmation
    Verificar A Mensagens De Erro Nos Campos

Cenário 12: Não Deveria Ser Possível Criar O Usuário Com Uma Senha Diferente Da Confirmação
    [Documentation]    Verifica se o campo "Senha" e "Confirmação de Senha" devem ser iguais.
    Preencher O Campo    password    123456
    Preencher O Campo    password-confirmation    1234567
    Verificar A Mensagem Do Erro No Campo    password-confirmation    As senhas não coincidem.

Cenário 13: Deveria Ser Possível Cadastrar Um Usuário
    [Documentation]    Valida o fluxo completo para criar um novo usuário com dados válidos.
    Preencher Todos Os Campos
    Clicar No Botão Cadastrar
    Verificar A Mensagem De Sucesso No Toast

Cenário 14: Deveria Ser Possível Voltar Para A Tela De Login Pelo Link
    [Documentation]    Verifica se o link de voltar para a tela de login está funcionando corretamente.
    Clicar No Link De Voltar Tela De Login
    Verificar Se Esta Na Tela De Login
