*** Settings ***
Documentation       Suite de testes para validar funcionalidades de recuperação de senha.

Resource            ../resources/keywords.resource
Resource            ../resources/recoverKeywords.resource

Test Setup          Preparar Teste    ${BASE_URL}    recover-password
Test Teardown       Fechar O Navegador


*** Test Cases ***
Cenário 1: Deveria Ser Possível Visualizar Os Elementos Da Tela E Recuperar A Senha
    [Documentation]    Verifica se os elementos da tela de recuperação de senha estão visíveis.
    Verificar Os Elementos Da Tela De Recuperação De Senha

Cenário 2: Não Deveria Ser Possível Aparecer O Toast De Feedback Para Usuário Apenas Clicando No Botão
    [Documentation]    Verifica se não é possível aparecer o toast de feedback para usuário apenas clicando no botão.
    Clicar No Botão De Recuperar A Senha
    Verificar Se O Toast Não Esta Presente

Cenário 3: Deveria Ser Possível Aparecer Um Toast De Feedback Caso Coloque Um Email Inválido
    [Documentation]    Verifica se é possível aparecer um toast de feedback caso coloque um email inválido.
    Preencher O Campo De Email    email@example.com
    Clicar No Botão De Recuperar A Senha
    Verificar A Mensagem Do Toast De Recuperação    Usuário não encontrado.

Cenário 4: Deveria Ser Possível Enviar O Email De Recuperação De Senha
    [Documentation]    Verifica se é possível enviar o email de recuperação de senha.
    Preencher O Campo De Email    generic@example.com
    Clicar No Botão De Recuperar A Senha
    Verificar A Mensagem Do Toast De Recuperação    Um e-mail foi enviado com instruções para recuperar a senha.

Cenário 5: Deveria Ser Possível Voltar Para A Tela De Login Pelo Link
    [Documentation]    Verifica se é possível voltar para a tela de login pelo link.
    Clicar No Link De Voltar Tela De Login
    Verificar Se Esta Na Tela De Login
