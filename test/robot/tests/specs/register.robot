*** Settings ***
Documentation       Suite de testes para validar funcionalidades de cadastro de usuários.

Resource            ../resources/keywords.resource
Resource            ../resources/registerKeywords.resource
Resource            ../resources/recoverKeywords.resource

Test Setup          Preparar Teste    ${BASE_URL}    signup
Test Teardown       Fechar O Navegador


*** Test Cases ***
Cenário 1: Deveria Ser Possível Visualizar Os Elementos Da Tela de Cadastros
    [Documentation]    Verifica se todos os elementos esperados na tela de cadastro são exibidos corretamente.
    Verificar Os Elementos Da Tela De Cadastro

Cenário 2: Deveria Ser Possível Visualizar O Toast o Clicar No Botão Sem Adicionar Algum Valor Nos Campos
    [Documentation]    Verifica se ao clicar no botão de cadastro sem preencher os campos, aparece um feedback negativo.
    Clicar No Botão Cadastrar
    Verificar A Mensagem De Erro No Toast
    Verificar A Mensagens De Erro Nos Campos

Cenário 3: Não Deveria Ser Possível Criar O Usuário Com O Nome Completo Errado
    [Documentation]    Testa a validação do campo "Nome Completo" com um valor inválido.
    Preencher O Campo    fullname    Teste
    Clicar No Botão Cadastrar
    Verificar A Mensagem De Erro No Toast
    Verificar A Mensagem Do Erro No Campo    fullname    O Nome Completo deve conter pelo menos Nome e Sobrenome.

Cenário 4: Não Deveria Ser Possível Criar O Usuário Com O CPF Inválido
    [Documentation]    Verifica a validação do campo "CPF" ao inserir um CPF inválido.
    Preencher O Campo    document    123.456.789-10
    Clicar No Botão Cadastrar
    Verificar A Mensagem De Erro No Toast
    Verificar A Mensagem Do Erro No Campo    cpfcnpj    CPF inválido.

Cenário 5: Não Deveria Ser Possível Criar O Usuário Com O CNPJ Inválido
    [Documentation]    Verifica a validação do campo "CNPJ" ao inserir um valor inválido.
    Selecionar O Tipo De Documento
    Preencher O Campo    document    12.456.789/1110-60
    Clicar No Botão Cadastrar
    Verificar A Mensagem De Erro No Toast
    Verificar A Mensagem Do Erro No Campo    cpfcnpj    CNPJ inválido.

Cenário 6: Não Deveria Ser Possível Colocar Letras No Campo De Telefone
    [Documentation]    Testa a validação do campo "Telefone" com caracteres não numéricos.
    Preencher O Campo    phone    gdgrgdfg
    Clicar No Botão Cadastrar
    Verificar A Mensagem De Erro No Toast
    Verificar A Mensagem Do Erro No Campo    phone    O telefone deve conter apenas números.

Cenário 7: Não Deveria Ser Possível Colocar Mais Do Que 11 Dígitos No Campo De Telefone
    [Documentation]    Verifica se o campo "Telefone" limita a quantidade máxima de dígitos.
    Preencher O Campo    phone    5454654154515454
    Clicar No Botão Cadastrar
    Verificar A Mensagem De Erro No Toast
    Verificar A Mensagem Do Erro No Campo    phone    O telefone deve ter no máximo 11 dígitos.

Cenário 8: Não Deveria Ser Possível Colocar Menos Do Que 10 Dígitos No Campo De Telefone
    [Documentation]    Verifica se o campo "Telefone" exige a quantidade mínima de 10 dígitos.
    Preencher O Campo    phone    1524
    Clicar No Botão Cadastrar
    Verificar A Mensagem De Erro No Toast
    Verificar A Mensagem Do Erro No Campo    phone    O telefone deve ter no mínimo 10 dígitos.

Cenário 9: Não Deveria Ser Possível Criar O Usuário Com O Email Inválido
    [Documentation]    Verifica a validação do campo "Email" ao inserir um email inválido.
    Preencher O Campo    email    email@esdsd
    Clicar No Botão Cadastrar
    Verificar A Mensagem De Erro No Toast
    Verificar A Mensagem Do Erro No Campo    email    Email inválido.

Cenário 10: Não Deveria Ser Possível Criar O Usuário Com Uma Senha Com Menos De 6 Caracteres
    [Documentation]    Verifica se o campo "Senha" exige ao menos 6 caracteres.
    Preencher O Campo    password    1452
    Clicar No Botão Cadastrar
    Verificar A Mensagem De Erro No Toast
    Verificar A Mensagem Do Erro No Campo    password    A Senha deve ter no mínimo 6 caracteres.

Cenário 11: Não Deveria Ser Possível Criar O Usuário Com Uma Senha Com Mais De 20 Caracteres
    [Documentation]    Verifica se o campo "Senha" limita a senha para no máximo 20 caracteres.
    Preencher O Campo    password    412541254125412541020
    Clicar No Botão Cadastrar
    Verificar A Mensagem De Erro No Toast
    Verificar A Mensagem Do Erro No Campo    password    A Senha deve ter no máximo 20 caracteres.

Cenário 12: Deveria Ser Possível Cadastrar Um Usuário
    [Documentation]    Valida o fluxo completo para criar um novo usuário com dados válidos.
    Preencher Todos Os Campos
    Clicar No Botão Cadastrar
    Verificar A Mensagem De Sucesso No Toast

Cenário 13: Deveria Ser Possível Voltar Para A Tela De Login Pelo Link
    Clicar No Link De Voltar Tela de Login
    Verificar Se Esta Na Tela De Login