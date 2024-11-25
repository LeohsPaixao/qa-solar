*** Settings ***
Resource    ../resources/keywords.resource
Test Setup    Abrir o navegador    ${BASE_URL}
Test Teardown    Fechar o navegador

*** Test Cases ***

Cenário 1: Deveria ser possivel visualizar os elementos da tela
    Navegar para a rota Login
    Verificar os elementos da tela

Cenário 2: Não deveria ser possivel fazer login com credenciais invalidas
    Navegar para a rota Login
    Digitar o email do usuario    email@example.com
    Digitar o password do usuario    password@example.com
    Clicar no botão de Entrar na Conta
    Verificar o feedback do usuario    Usuário não encontrado.

Cenário 3: Não deveria ser possivel fazer login com a senha inválida
    Navegar para a rota Login
    Digitar o email do usuario    generic@example.com
    Digitar o password do usuario    password@example.com
    Clicar no botão de Entrar na Conta
    Verificar o feedback do usuario    A senha não confere.

Cenário 4: Deveria ser possivel fazer login com as credenciais válidas
    Navegar para a rota Login
    Digitar o email do usuario    generic@example.com
    Digitar o password do usuario    123456
    Clicar no botão de Entrar na Conta
    Verificar o feedback do usuario    Login realizado com sucesso!

Cenário 5: Deveria ser possivel ir para a tela de cadastro
    Navegar para a rota Login
    Clicar no link    link-singup
    Verificar a navegação da url   /signup

Cenário 6: Deveria ser possivel ir para a tela de esqueci a senha
    Navegar para a rota Login
    Clicar no link    link-recover-password
    Verificar a navegação da url   /recover-password