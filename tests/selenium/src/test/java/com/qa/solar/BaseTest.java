package com.qa.solar;

import java.time.Duration;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.github.bonigarcia.wdm.WebDriverManager;
import io.github.cdimascio.dotenv.Dotenv;

/**
 * Classe base para todos os testes Selenium
 * Fornece configurações comuns e métodos utilitários
 */
public abstract class BaseTest {

    private Dotenv dotenv = Dotenv.load();

    protected WebDriver driver;
    protected WebDriverWait wait;

    @BeforeEach
    public void setUp() {
        // Configurar o driver Chrome
        setupChromeDriver();

        // Configurar wait explícito
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        // Configurar timeout implícito
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));
        driver.manage().timeouts().scriptTimeout(Duration.ofSeconds(30));

        // Maximizar janela apenas se não estiver em modo headless
        boolean headless = Boolean.parseBoolean(System.getProperty("headless", "false"));
        if (!headless) {
            try {
                driver.manage().window().maximize();
            } catch (Exception e) {
                // Ignora erro de maximização em ambientes headless
            }
        }
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    private void setupChromeDriver() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();

        // Configurações para execução em CI/CD (headless)
        boolean headless = Boolean.parseBoolean(System.getProperty("headless", "false"));
        if (headless) {
            options.addArguments("--headless");
            options.addArguments("--window-size=1920,1080");
        }

        // Configurações para melhor performance e compatibilidade
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");

        driver = new ChromeDriver(options);
    }

    /**
     * Navega para uma URL específica
     */
    protected void navigateTo(String url) {
        String input = (url == null) ? "" : url.trim();
        String target;

        if (input.startsWith("http://") || input.startsWith("https://")) {
            target = input;
        } else {
            String base = System.getProperty("baseUrl", dotenv.get("SELENIUM_BASE_URL"));
            if (base == null || base.isBlank()) {
                throw new IllegalStateException(
                        "baseUrl não configurada. Defina via propriedade do sistema ou arquivo .env.");
            }

            target = java.net.URI.create(base).resolve(input).toString();
        }
        driver.get(target);
    }

    /**
     * Aguarda um tempo específico
     */
    protected void waitForSeconds(int seconds) {
        try {
            Thread.sleep(seconds * 1000L);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
