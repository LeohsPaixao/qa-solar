*** Settings ***
Documentation       Suite de testes para validar funcionalidades de login.

Resource            ../resources/keywords.resource
Resource            ../resources/loginKeywords.resource

Test Setup          Preparar Teste    ${BASE_URL}
Test Teardown       Fechar O Navegador


*** Test Cases ***
Cenário 1: Deveria Ser Possivel Visualizar Os Elementos Da Tela
    [Documentation]    Testa a exibição correta dos elementos na tela de login.
    Verificar Os Elementos Da Tela

Cenário 2: Não Deveria Ser Possivel Fazer Login Com Credenciais Invalidas
    [Documentation]    Testa login com e-mail e senha inválidos.
    Digitar O Email Do Usuario    email@example.com
    Digitar O Password Do Usuario    password@example.com
    Clicar No Botão De Entrar Na Conta
    Verificar O Feedback Do Usuario    Usuário não encontrado.

Cenário 3: Não Deveria Ser Possivel Fazer Login Com A Senha Inválida
    [Documentation]    Testa login com uma senha incorreta.
    Digitar O Email Do Usuario    generic@example.com
    Digitar O Password Do Usuario    password@example.com
    Clicar No Botão De Entrar Na Conta
    Verificar O Feedback Do Usuario    A senha não confere.

Cenário 4: Deveria Ser Possivel Fazer Login Com As Credenciais Válidas
    [Documentation]    Testa login com credenciais corretas.
    Digitar O Email Do Usuario    generic@example.com
    Digitar O Password Do Usuario    123456
    Clicar No Botão De Entrar Na Conta
    Verificar O Feedback Do Usuario    Login realizado com sucesso!

Cenário 5: Deveria Ser Possivel Ir Para A Tela De Cadastro
    [Documentation]    Testa a navegação para a página de cadastro.
    Clicar No Link    link-signup
    Verificar A Navegação Da Url    signup

Cenário 6: Deveria Ser Possivel Ir Para A Tela De Esqueci A Senha
    [Documentation]    Testa a navegação para a página de recuperação de senha.
    Clicar No Link    link-recover-password
    Verificar A Navegação Da Url    recover-password
