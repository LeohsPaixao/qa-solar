*** Settings ***
Documentation       Suite de testes para validar funcionalidades de recuperação de senha.

Resource            ../resources/keywords.resource
Resource            ../resources/recoverKeywords.resource

Test Setup          Preparar Teste    ${BASE_URL}    recover-password
Test Teardown       Fechar O Navegador


*** Test Cases ***
Cenário 1: Deveria Ser Possível Visualizar Os Elementos Da Tela de Recuperação De Senha
    Verificar Os Elementos Da Tela de Recuperação De Senha

Cenário 2: Não Deveria Ser Possível Aparecer O Toast De Feedback Para Usuário Apenas Clicando No Botão
    Clicar No Botão De Recuperar A Senha
    Verificar Se O Toast Não Esta Presente

Cenário 3: Deveria Ser Possível Aparecer Um Toast De Feedback Caso Coloque Um Email Inválido
    Preencher O Campo de Email    email@example.com
    Clicar No Botão De Recuperar A Senha
    Verificar A Mensagem Do Toast de Recuperação    Este email não esta cadastrado no banco de dados.

Cenário 4: Deveria Ser Possível Enviar O Email De Recuperação De Senha
    Preencher O Campo de Email    generic@example.com
    Clicar No Botão De Recuperar A Senha
    Verificar A Mensagem Do Toast de Recuperação    Um e-mail foi enviado com instruções para recuperar a senha.

Cenário 5: Deveria Ser Possível Voltar Para A Tela De Login Pelo Link
    Clicar No Link De Voltar Tela de Login
    Verificar Se Esta Na Tela De Login