package com.qa.solar;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

/**
 * Teste de exemplo para garantir que o build funcione corretamente
 */
@DisplayName("Testes de Exemplo")
public class SampleTest extends BaseTest {

    @Test
    @DisplayName("Deve executar um teste básico")
    public void shouldRunBasicTest() {
        // Teste simples para verificar se o ambiente está funcionando
        assertTrue(true, "O teste básico deve passar");
    }

    @Test
    @DisplayName("Deve verificar se o driver está configurado")
    public void shouldHaveDriverConfigured() {
        // Verifica se o driver foi configurado corretamente
        assertNotNull(driver, "O driver deve estar configurado");
        assertNotNull(wait, "O WebDriverWait deve estar configurado");
    }

    @Test
    @DisplayName("Deve navegar para uma página simples")
    public void shouldNavigateToSimplePage() {
        // Navega para uma página simples para testar o Selenium
        String testUrl = "data:text/html,<html><body><h1>Test Page</h1></body></html>";
        navigateTo(testUrl);
        
        // Verifica se a página foi carregada
        String pageTitle = driver.getTitle();
        assertNotNull(pageTitle, "O título da página deve estar presente");
    }
}
