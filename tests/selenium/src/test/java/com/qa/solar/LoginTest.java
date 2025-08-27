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
 * Classe de teste para o login
 * 
 * @author [Leonardo Paixão]
 * @version 1.0
 * @since 2025-08-26
 */
@DisplayName("Testes de Login")
public class LoginTest extends BaseTest {

  @BeforeEach
  public void setUp() {
    super.setUp();
    navigateTo("/");
  }

  @AfterEach
  public void tearDown() {
    super.tearDown();
  }

  @Test
  @DisplayName("Deveria ser possível visualizar os elementos da tela")
  public void shouldSeeElements() {
    WebElement formLogin = driver.findElement(By.cssSelector("[data-testid='form-login']"));
    WebElement logo = driver.findElement(By.cssSelector("[data-testid='logo']"));
    WebElement inputEmail = driver.findElement(By.cssSelector("[data-testid='input-email']"));
    WebElement inputPassword = driver.findElement(By.cssSelector("[data-testid='input-password']"));
    WebElement btnLogin = driver.findElement(By.cssSelector("[data-testid='btn-login']"));

    assertTrue(formLogin.isDisplayed(), "O elemento deve ser exibido");
    assertTrue(logo.isDisplayed(), "O elemento deve ser exibido");
    assertTrue(inputEmail.isDisplayed(), "O elemento deve ser exibido");
    assertTrue(inputPassword.isDisplayed(), "O elemento deve ser exibido");
    assertTrue(btnLogin.isDisplayed(), "O elemento deve ser exibido");
  }

  @Test
  @DisplayName("Não deveria ser possível fazer login com credenciais inválidas")
  public void shouldNotLoginWithInvalidCredentials() {
    WebElement inputEmail = driver.findElement(By.cssSelector("[data-testid='input-email']"));
    WebElement inputPassword = driver.findElement(By.cssSelector("[data-testid='input-password']"));
    WebElement btnLogin = driver.findElement(By.cssSelector("[data-testid='btn-login']"));

    inputEmail.sendKeys("invalid@example.com");
    inputPassword.sendKeys("invalid");

    assertTrue(btnLogin.isEnabled(), "O elemento deve ser habilitado");
    btnLogin.click();

    waitForSeconds(1);

    WebElement toastContent = driver.findElement(By.cssSelector("[data-testid='toast-content']"));
    assertTrue(toastContent.isDisplayed(), "O elemento deve ser exibido");
    assertTrue(toastContent.getText().contains("Usuário não encontrado."), "O texto deve ser exibido");
  }

  @Test
  @DisplayName("Não deveria ser possível fazer login com a senha inválida")
  public void shouldNotLoginWithInvalidPassword() {
    WebElement inputEmail = driver.findElement(By.cssSelector("[data-testid='input-email']"));
    WebElement inputPassword = driver.findElement(By.cssSelector("[data-testid='input-password']"));
    WebElement btnLogin = driver.findElement(By.cssSelector("[data-testid='btn-login']"));

    inputEmail.sendKeys("generic@example.com");
    inputPassword.sendKeys("invalid");

    assertTrue(btnLogin.isEnabled(), "O elemento deve ser habilitado");
    btnLogin.click();

    waitForSeconds(1);

    WebElement toastContent = driver.findElement(By.cssSelector("[data-testid='toast-content']"));
    assertTrue(toastContent.isDisplayed(), "O elemento deve ser exibido");
    assertTrue(toastContent.getText().contains("A senha não confere."), "O texto deve ser exibido");
  }

  @Test
  @DisplayName("Deveria ser possível fazer login com credenciais válidas")
  public void shouldLoginWithValidCredentials() {
    WebElement inputEmail = driver.findElement(By.cssSelector("[data-testid='input-email']"));
    WebElement inputPassword = driver.findElement(By.cssSelector("[data-testid='input-password']"));
    WebElement btnLogin = driver.findElement(By.cssSelector("[data-testid='btn-login']"));

    inputEmail.sendKeys("generic@example.com");
    inputPassword.sendKeys("123456");

    assertTrue(btnLogin.isEnabled(), "O elemento deve ser habilitado");
    btnLogin.click();

    waitForSeconds(1);

    WebElement toastContent = driver.findElement(By.cssSelector("[data-testid='toast-content']"));
    assertTrue(toastContent.isDisplayed(), "O elemento deve ser exibido");
    assertTrue(toastContent.getText().contains("Login realizado com sucesso!"), "O texto deve ser exibido");
  }

  @Test
  @DisplayName("Deveria ser possível visualizar o erro de email inválido embaixo do input de email")
  public void shouldSeeInvalidEmailError() {
    WebElement inputEmail = driver.findElement(By.cssSelector("[data-testid='input-email']"));

    inputEmail.sendKeys("email@email");
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputEmail);

    WebElement messageErrorEmail = driver.findElement(By.cssSelector("[data-testid='message-error-email']"));
    assertTrue(messageErrorEmail.isDisplayed(), "O elemento deve ser exibido");
    assertTrue(messageErrorEmail.getText().contains("Por favor, insira um email válido."), "O texto deve ser exibido");
  }

  @Test
  @DisplayName("Deveria ser possível visualizar o erro de senha inválida embaixo do input de senha")
  public void shouldSeeInvalidPasswordError() {
    WebElement inputPassword = driver.findElement(By.cssSelector("[data-testid='input-password']"));

    inputPassword.sendKeys("1234");
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputPassword);

    WebElement messageErrorPassword = driver.findElement(By.cssSelector("[data-testid='message-error-password']"));
    assertTrue(messageErrorPassword.isDisplayed(), "O elemento deve ser exibido");
    assertTrue(messageErrorPassword.getText().contains("A senha deve ter pelo menos 6 caracteres."),
        "O texto deve ser exibido");
  }
  
  @Test
  @DisplayName("Deveria ser possível visualizar a mensagem de erro embaixo dos inputs de email e senha quando estão vazios")
  public void shouldSeeEmptyFieldsError() {
    WebElement inputEmail = driver.findElement(By.cssSelector("[data-testid='input-email']"));
    WebElement inputPassword = driver.findElement(By.cssSelector("[data-testid='input-password']"));

    inputEmail.sendKeys("email@email");
    ((JavascriptExecutor) driver).executeScript("arguments[0].value = '';", inputEmail);
    ((JavascriptExecutor) driver).executeScript("arguments[0].dispatchEvent(new Event('input'));", inputEmail);

    inputPassword.sendKeys("1234");
    ((JavascriptExecutor) driver).executeScript("arguments[0].value = '';", inputPassword);
    ((JavascriptExecutor) driver).executeScript("arguments[0].dispatchEvent(new Event('input'));", inputPassword);
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputPassword);

    WebElement messageErrorEmail = driver.findElement(By.cssSelector("[data-testid='message-error-email']"));
    WebElement messageErrorPassword = driver.findElement(By.cssSelector("[data-testid='message-error-password']"));

    assertTrue(messageErrorEmail.isDisplayed(), "O elemento deve ser exibido");
    assertTrue(messageErrorPassword.isDisplayed(), "O elemento deve ser exibido");
    assertTrue(messageErrorEmail.getText().contains("O email é obrigatório."), "O texto email deve ser exibido");
    assertTrue(messageErrorPassword.getText().contains("A senha é obrigatória."), "O texto senha deve ser exibido");
  }

  @Test
  @DisplayName("Deveria ser possível ir para a tela de cadastro")
  public void shouldNavigateToSignup() throws MalformedURLException {
    WebElement linkSignup = driver.findElement(By.cssSelector("[data-testid='link-signup']"));
    linkSignup.click();

    new WebDriverWait(driver, Duration.ofSeconds(5)).until(ExpectedConditions.urlContains("/signup"));

    URL url = URI.create(driver.getCurrentUrl()).toURL();

    assertEquals("/signup", url.getPath());
    assertEquals("http", url.getProtocol());
  }

  @Test
  @DisplayName("Deveria ser possível ir para a tela de esqueci a senha")
  public void shouldNavigateToRecoverPassword() throws MalformedURLException {
    WebElement linkRecoverPassword = driver.findElement(By.cssSelector("[data-testid='link-recover-password']"));
    linkRecoverPassword.click();

    new WebDriverWait(driver, Duration.ofSeconds(5)).until(ExpectedConditions.urlContains("/recover-password"));

    URL url = URI.create(driver.getCurrentUrl()).toURL();

    assertEquals("/recover-password", url.getPath());
    assertEquals("http", url.getProtocol());
  }
}
