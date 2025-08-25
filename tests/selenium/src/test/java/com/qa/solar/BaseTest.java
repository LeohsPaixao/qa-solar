package com.qa.solar;

import java.time.Duration;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.github.bonigarcia.wdm.WebDriverManager;

/**
 * Classe base para todos os testes Selenium
 * Fornece configurações comuns e métodos utilitários
 */
public abstract class BaseTest {
    
    protected WebDriver driver;
    protected WebDriverWait wait;
    
    @BeforeEach
    public void setUp() {
        // Configurar o driver Chrome        
        setupChromeDriver();
        
        // Configurar wait explícito
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        
        // Maximizar janela
        driver.manage().window().maximize();
        
        // Configurar timeout implícito
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));
        driver.manage().timeouts().scriptTimeout(Duration.ofSeconds(30));
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
        driver.get(url);
    }

    /**
     * Aguarda um tempo específico (útil para debug)
     */
    protected void waitForSeconds(int seconds) {
        try {
            Thread.sleep(seconds * 1000L);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
