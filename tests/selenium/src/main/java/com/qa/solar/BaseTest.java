package com.qa.solar;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import io.github.bonigarcia.wdm.WebDriverManager;
import io.github.cdimascio.dotenv.Dotenv;

/**
 * Classe base para todos os testes Selenium
 * Fornece configurações comuns e métodos utilitários
 */
public abstract class BaseTest {

    private Dotenv dotenv = Dotenv.load();

    protected WebDriver driver;

    /**
     * Configura o driver e inicia o navegador
     */
    protected void setUp() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();

        boolean headless = Boolean.parseBoolean(dotenv.get("HEADLESS", "false"));
        if (headless) {
            options.addArguments("--headless");
            options.addArguments("--window-size=1920,1080");
        }

        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");

        driver = new ChromeDriver(options);
    }

    /**
     * Encerra o driver e fecha o navegador
     */
    protected void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    /**
     * Navega para uma URL específica
     */
    protected void navigateTo(String url) {
        if (driver == null) {
            throw new IllegalStateException("WebDriver não inicializado. Chame setUp() antes de navegar.");
        }
        String input = (url == null) ? "" : url.trim();
        String target;

        if (input.startsWith("http://") || input.startsWith("https://")) {
            target = input;
        } else {
            String base = dotenv.get("SELENIUM_BASE_URL", "http://localhost:8181");
            try {
                target = java.net.URI.create(base).resolve(input).toString();
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("URL inválida: '" + input + "' com base '" + base + "'", e);
            }
        }
        driver.get(target);
    }

    /**
     * Aguarda um tempo específico em segundos
     */
    protected void waitForSeconds(int seconds) {
        try {
            Thread.sleep(seconds * 1000L);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
