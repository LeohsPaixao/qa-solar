*** Settings ***
Resource    ../resources/keywords.resource
Test Setup    Abrir o navegador    ${URL}
Test Teardown    Fechar o navegador

*** Test Cases ***

Cenário 1: Deveria ser possivel visualizar os elementos da tela
    Navegar para a rota Login    ${URL}
    Verificar os elementos da tela
