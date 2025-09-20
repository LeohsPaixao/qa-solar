package com.qa.solar;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.time.Duration;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * Testes para a tela de recuperação de senha
 * 
 * @author [Leonardo Paixão]
 * @version 1.0
 * @since 2025-09-18
 */
@DisplayName("Testes de Recuperação de Senha")
public class RecoverPassword extends BaseTest {

  @BeforeEach
  public void setUpTest() {
    driver = setUp();
    navigateTo("/recover-password");
  }

  @AfterEach
  public void tearDownTest() {
    tearDown();
  }

  @Test
  @DisplayName("Deveria ser possível visualizar os elementos da tela de recuperação de senha")
  public void shouldSeeElements() {
    WebElement formRecoverPassword = waitForElementLocated(By.cssSelector("[data-testid='form-recover-password']"), 10);
    WebElement inputEmailRecoverPassword = waitForElementLocated(
        By.cssSelector("[data-testid='input-email-recover-password']"), 10);
    WebElement btnRecoverPassword = waitForElementLocated(By.cssSelector("[data-testid='btn-recover-password']"), 10);
    WebElement linkGoToLogin = waitForElementLocated(By.cssSelector("[data-testid='link-go-to-login']"), 10);

    assertTrue(formRecoverPassword.isDisplayed());
    assertTrue(inputEmailRecoverPassword.isDisplayed());
    assertTrue(btnRecoverPassword.isDisplayed());
    assertTrue(linkGoToLogin.isDisplayed());
  }
    
  @Test
  @DisplayName("Deveria ser possível aparecer uma mensagem de erro quando o email está vazio")
  public void shouldNotShowToastWhenClickingOnButton() {
    WebElement inputEmailRecoverPassword = waitForElementLocated(
        By.cssSelector("[data-testid='input-email-recover-password']"), 10);

    inputEmailRecoverPassword.sendKeys("email");
    ((JavascriptExecutor) driver).executeScript("arguments[0].value = '';", inputEmailRecoverPassword);
    ((JavascriptExecutor) driver).executeScript("arguments[0].dispatchEvent(new Event('input'));",
        inputEmailRecoverPassword);
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputEmailRecoverPassword);

    WebElement toastContent = waitForElementLocated(By.cssSelector("[data-testid='message-error-email-recover-password']"), 10);
    assertTrue(toastContent.isDisplayed());
    assertTrue(toastContent.getText().contains("O email é obrigatório."));
  }

  @Test
  @DisplayName("Deveria ser possível aparecer um toast de feedback caso coloque um email inválido")
  public void shouldShowToastWhenInvalidEmail() {
    WebElement inputEmailRecoverPassword = waitForElementLocated(By.cssSelector("[data-testid='input-email-recover-password']"), 10);
    inputEmailRecoverPassword.sendKeys("email@example.com");
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputEmailRecoverPassword);

    WebElement btnRecoverPassword = waitForElementLocated(By.cssSelector("[data-testid='btn-recover-password']"), 10);
    btnRecoverPassword.click();

    WebElement messageErrorEmail = waitForElementLocated(By.cssSelector("[data-testid='toast-content']"), 10);
    assertTrue(messageErrorEmail.isDisplayed());
    assertTrue(messageErrorEmail.getText().contains("Usuário não encontrado."));
  }

  @Test
  @DisplayName("Deveria ser possível enviar o email de recuperação de senha")
  public void shouldSendEmailRecoveryPassword() {
    WebElement inputEmailRecoverPassword = waitForElementLocated(By.cssSelector("[data-testid='input-email-recover-password']"), 10);
    inputEmailRecoverPassword.sendKeys("generic@example.com");
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputEmailRecoverPassword);

    WebElement btnRecoverPassword = waitForElementLocated(By.cssSelector("[data-testid='btn-recover-password']"), 10);
    btnRecoverPassword.click();

    WebElement toastContent = waitForElementLocated(By.cssSelector("[data-testid='toast-content']"), 10);

    assertTrue(toastContent.isDisplayed());
    assertTrue(toastContent.getText().contains("Um e-mail foi enviado com instruções para recuperar a senha."));
  }

  @Test
  @DisplayName("Deveria ser possível voltar para a tela de login pelo link")
  public void shouldNavigateToLogin() throws MalformedURLException {
    WebElement linkGoToLogin = waitForElementLocated(By.cssSelector("[data-testid='link-go-to-login']"), 10);

    linkGoToLogin.click();

    new WebDriverWait(driver, Duration.ofSeconds(5)).until(ExpectedConditions.urlContains("/"));

    URL url = URI.create(driver.getCurrentUrl()).toURL();

    assertEquals("/", url.getPath());
    assertEquals("http", url.getProtocol());

    WebElement formLogin = waitForElementLocated(By.cssSelector("[data-testid='form-login']"), 10);
    WebElement btnLogin = waitForElementLocated(By.cssSelector("[data-testid='btn-login']"), 10);

    assertTrue(formLogin.isDisplayed());
    assertTrue(btnLogin.isDisplayed());
  }
}
