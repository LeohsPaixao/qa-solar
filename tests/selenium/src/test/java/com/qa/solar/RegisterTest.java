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
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.github.javafaker.Faker;
/**
 * Testes para a tela de cadastro
 * 
 * @author [Leonardo Paixão]
 * @version 1.0
 * @since 2025-09-18
 */
@DisplayName("Testes de Cadastro")
public class RegisterTest extends BaseTest {

  private GenerateValidCPF generateValidCPF = new GenerateValidCPF();

  private Faker faker = new Faker();

  @BeforeEach
  public void setUpTest() {
    driver = setUp();
    navigateTo("/signup");
  }

  @AfterEach
  public void tearDownTest() {
    tearDown();
  }

  @Test
  @DisplayName("Deveria ser possível visualizar os elementos da tela de cadastro")
  public void shouldSeeElements() {
    WebElement formRegister = waitForElementLocated(By.cssSelector("[data-testid='register-form']"), 10);
    WebElement inputFullname = waitForElementLocated(By.cssSelector("[data-testid='input-fullname']"), 10);
    WebElement inputDocument = waitForElementLocated(By.cssSelector("[data-testid='input-document']"), 10);
    WebElement inputEmail = waitForElementLocated(By.cssSelector("[data-testid='input-email']"), 10);
    WebElement inputPassword = waitForElementLocated(By.cssSelector("[data-testid='input-password']"), 10);
    WebElement inputPasswordConfirmation = waitForElementLocated(By.cssSelector("[data-testid='input-password-confirmation']"), 10);
    WebElement btnRegister = waitForElementLocated(By.cssSelector("[data-testid='btn-register']"), 10);
    WebElement linkGoToLogin = waitForElementLocated(By.cssSelector("[data-testid='link-go-to-login']"), 10);

    assertTrue(formRegister.isDisplayed());
    assertTrue(inputFullname.isDisplayed());
    assertTrue(inputDocument.isDisplayed());
    assertTrue(inputEmail.isDisplayed());
    assertTrue(inputPassword.isDisplayed());
    assertTrue(inputPasswordConfirmation.isDisplayed());
    assertTrue(btnRegister.isDisplayed());
    assertTrue(linkGoToLogin.isDisplayed());
  }

  @Test
  @DisplayName("Não deveria ser possível criar o usuário com o Nome Completo errado")
  public void shouldNotCreateUserWithInvalidFullName() {
    WebElement inputFullname = waitForElementLocated(By.cssSelector("[data-testid='input-fullname']"), 10);

    inputFullname.sendKeys("Teste");
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputFullname);

    WebElement messageErrorFullname = waitForElementLocated(By.cssSelector("[data-testid='input-error-fullname']"), 10);
    assertTrue(messageErrorFullname.isDisplayed());
    assertTrue(messageErrorFullname.getText().contains("O Nome Completo deve conter pelo menos Nome e Sobrenome."));
  }

  @Test
  @DisplayName("Não deveria ser possível criar o usuário com o CPF inválido")
  public void shouldNotCreateUserWithInvalidCPF() {
    WebElement inputDocument = waitForElementLocated(By.cssSelector("[data-testid='input-document']"), 10);
    inputDocument.sendKeys("123.456.789-10");
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputDocument);

    WebElement messageErrorCPF = waitForElementLocated(By.cssSelector("[data-testid='input-error-cpfcnpj']"), 10);
    assertTrue(messageErrorCPF.isDisplayed());
    assertTrue(messageErrorCPF.getText().contains("CPF inválido."));
  }

  @Test
  @DisplayName("Não deveria ser possível criar o usuário com o CNPJ inválido")
  public void shouldNotCreateUserWithInvalidCNPJ() {
    WebElement selectDocumentType = waitForElementLocated(By.cssSelector("[data-testid='select-document-type']"), 10);
    Select select = new Select(selectDocumentType);
    select.selectByVisibleText("CNPJ");

    WebElement inputDocument = waitForElementLocated(By.cssSelector("[data-testid='input-document']"), 10);
    inputDocument.sendKeys("12.456.789/1110-60");
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputDocument);

    WebElement messageErrorCNPJ = waitForElementLocated(By.cssSelector("[data-testid='input-error-cpfcnpj']"), 10);
    assertTrue(messageErrorCNPJ.isDisplayed());
    assertTrue(messageErrorCNPJ.getText().contains("CNPJ inválido."));
  }

  @Test
  @DisplayName("Não deveria ser possível colocar letras no campo de telefone")
  public void shouldNotCreateUserWithLettersInPhone() {
    WebElement inputPhone = waitForElementLocated(By.cssSelector("[data-testid='input-phone']"), 10);
    inputPhone.sendKeys("abcdef");
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputPhone);

    WebElement messageErrorPhone = waitForElementLocated(By.cssSelector("[data-testid='input-error-phone']"), 10);
    assertTrue(messageErrorPhone.isDisplayed());
    assertTrue(messageErrorPhone.getText().contains("O telefone deve conter apenas números."));
  }

  @Test
  @DisplayName("Não deveria ser possível colocar mais de 11 dígitos no campo de telefone")
  public void shouldNotCreateUserWithMoreThan11DigitsInPhone() {
    WebElement inputPhone = waitForElementLocated(By.cssSelector("[data-testid='input-phone']"), 10);
    inputPhone.sendKeys("123456789012");
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputPhone);

    WebElement messageErrorPhone = waitForElementLocated(By.cssSelector("[data-testid='input-error-phone']"), 10);
    assertTrue(messageErrorPhone.isDisplayed());
    assertTrue(messageErrorPhone.getText().contains("O telefone deve ter no máximo 11 dígitos."));
  }

  @Test
  @DisplayName("Não deveria ser possível colocar menos de 10 dígitos no campo de telefone")
  public void shouldNotCreateUserWithLessThan10DigitsInPhone() {
    WebElement inputPhone = waitForElementLocated(By.cssSelector("[data-testid='input-phone']"), 10);
    inputPhone.sendKeys("123456789");
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputPhone);

    WebElement messageErrorPhone = waitForElementLocated(By.cssSelector("[data-testid='input-error-phone']"), 10);
    assertTrue(messageErrorPhone.isDisplayed());
    assertTrue(messageErrorPhone.getText().contains("O telefone deve ter no mínimo 10 dígitos."));
  }

  @Test
  @DisplayName("Não deveria ser possível criar o usuário com o email inválido")
  public void shouldNotCreateUserWithInvalidEmail() {
    WebElement inputEmail = waitForElementLocated(By.cssSelector("[data-testid='input-email']"), 10);
    inputEmail.sendKeys("email@exassd");
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputEmail);

    WebElement messageErrorEmail = waitForElementLocated(By.cssSelector("[data-testid='input-error-email']"), 10);
    assertTrue(messageErrorEmail.isDisplayed());
    assertTrue(messageErrorEmail.getText().contains("Email inválido."));
  }

  @Test
  @DisplayName("Não deveria ser possível criar o usuário com uma senha com menos de 6 caracteres")
  public void shouldNotCreateUserWithLessThan6CharactersInPassword() {
    WebElement inputPassword = waitForElementLocated(By.cssSelector("[data-testid='input-password']"), 10);
    inputPassword.sendKeys("12345");
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputPassword);

    WebElement messageErrorPassword = waitForElementLocated(By.cssSelector("[data-testid='input-error-password']"), 10);
    assertTrue(messageErrorPassword.isDisplayed());
    assertTrue(messageErrorPassword.getText().contains("A Senha deve ter no mínimo 6 caracteres."));
  }

  @Test
  @DisplayName("Não deveria ser possível criar o usuário com uma senha com mais de 20 caracteres")
  public void shouldNotCreateUserWithMoreThan20CharactersInPassword() {
    WebElement inputPassword = waitForElementLocated(By.cssSelector("[data-testid='input-password']"), 10);
    inputPassword.sendKeys("123456789012345678901");
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputPassword);

    WebElement messageErrorPassword = waitForElementLocated(By.cssSelector("[data-testid='input-error-password']"), 10);
    assertTrue(messageErrorPassword.isDisplayed());
    assertTrue(messageErrorPassword.getText().contains("A Senha deve ter no máximo 20 caracteres."));
  }

  @Test
  @DisplayName("Deveria ser possível visualizar os erros embaixo dos inputs ao adicionar um valor e remover")
  public void shouldSeeErrorsBelowInputsWhenAddingValueAndRemoving() {
    WebElement inputFullname = waitForElementLocated(By.cssSelector("[data-testid='input-fullname']"), 10);
    WebElement inputDocument = waitForElementLocated(By.cssSelector("[data-testid='input-document']"), 10);
    WebElement inputEmail = waitForElementLocated(By.cssSelector("[data-testid='input-email']"), 10);
    WebElement inputPassword = waitForElementLocated(By.cssSelector("[data-testid='input-password']"), 10);
    WebElement inputPasswordConfirmation = waitForElementLocated(
        By.cssSelector("[data-testid='input-password-confirmation']"), 10);

    inputFullname.sendKeys("Teste");
    ((JavascriptExecutor) driver).executeScript("arguments[0].value = '';", inputFullname);
    ((JavascriptExecutor) driver).executeScript("arguments[0].dispatchEvent(new Event('input'));", inputFullname);
    inputDocument.sendKeys("12345678901");
    ((JavascriptExecutor) driver).executeScript("arguments[0].value = '';", inputDocument);
    ((JavascriptExecutor) driver).executeScript("arguments[0].dispatchEvent(new Event('input'));", inputDocument);
    inputEmail.sendKeys("email@example.com");
    ((JavascriptExecutor) driver).executeScript("arguments[0].value = '';", inputEmail);
    ((JavascriptExecutor) driver).executeScript("arguments[0].dispatchEvent(new Event('input'));", inputEmail);
    inputPassword.sendKeys("123456");
    ((JavascriptExecutor) driver).executeScript("arguments[0].value = '';", inputPassword);
    ((JavascriptExecutor) driver).executeScript("arguments[0].dispatchEvent(new Event('input'));", inputPassword);
    inputPasswordConfirmation.sendKeys("123456");
    ((JavascriptExecutor) driver).executeScript("arguments[0].value = '';", inputPasswordConfirmation);
    ((JavascriptExecutor) driver).executeScript("arguments[0].dispatchEvent(new Event('input'));",
        inputPasswordConfirmation);
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputPasswordConfirmation);

    WebElement messageErrorFullname = waitForElementLocated(By.cssSelector("[data-testid='input-error-fullname']"), 10);
    WebElement messageErrorCPF = waitForElementLocated(By.cssSelector("[data-testid='input-error-cpfcnpj']"), 10);
    WebElement messageErrorEmail = waitForElementLocated(By.cssSelector("[data-testid='input-error-email']"), 10);
    WebElement messageErrorPassword = waitForElementLocated(By.cssSelector("[data-testid='input-error-password']"), 10);
    WebElement messageErrorPasswordConfirmation = waitForElementLocated(
        By.cssSelector("[data-testid='input-error-password-confirmation']"), 10);

    assertTrue(messageErrorFullname.isDisplayed());
    assertTrue(messageErrorCPF.isDisplayed());
    assertTrue(messageErrorEmail.isDisplayed());
    assertTrue(messageErrorPassword.isDisplayed());
    assertTrue(messageErrorPasswordConfirmation.isDisplayed());
    assertTrue(messageErrorFullname.getText().contains("O Nome Completo é obrigatório."));
    assertTrue(messageErrorCPF.getText().contains("O CPF/CNPJ é obrigatório."));
    assertTrue(messageErrorEmail.getText().contains("O Email é obrigatório."));
    assertTrue(messageErrorPassword.getText().contains("A Senha é obrigatória."));
    assertTrue(messageErrorPasswordConfirmation.getText().contains("A confirmação de senha é obrigatória."));
  }
  
  @Test
  @DisplayName("Deveria ser possível visualizar o erro de senha e senha de confirmação diferentes")
  public void shouldSeePasswordAndPasswordConfirmationDifferent() {
    WebElement inputPassword = waitForElementLocated(By.cssSelector("[data-testid='input-password']"), 10);
    inputPassword.sendKeys("123456");
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputPassword);

    WebElement inputPasswordConfirmation = waitForElementLocated(
        By.cssSelector("[data-testid='input-password-confirmation']"), 10);
    inputPasswordConfirmation.sendKeys("1234567");
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputPasswordConfirmation);

    WebElement messageErrorPasswordConfirmation = waitForElementLocated(
        By.cssSelector("[data-testid='input-error-password-confirmation']"), 10);
    assertTrue(messageErrorPasswordConfirmation.isDisplayed());
    assertTrue(messageErrorPasswordConfirmation.getText().contains("As senhas não coincidem."));
  }
  
  @Test
  @DisplayName("Deveria ser possível cadastrar um usuário")
  public void shouldCreateUser() {

    String fullName = faker.name().fullName();
    String socialName = faker.name().lastName();
    String email = faker.internet().emailAddress();
    String phone = faker.number().digits(11);
    String password = faker.internet().password(6, 20);
    String passwordConfirmation = password;
    String document = generateValidCPF.generateValidCPF();

    WebElement inputFullname = waitForElementLocated(By.cssSelector("[data-testid='input-fullname']"), 10);
    WebElement inputSocialname = waitForElementLocated(By.cssSelector("[data-testid='input-socialname']"), 10);
    WebElement inputDocument = waitForElementLocated(By.cssSelector("[data-testid='input-document']"), 10);
    WebElement inputPhone = waitForElementLocated(By.cssSelector("[data-testid='input-phone']"), 10);
    WebElement inputEmail = waitForElementLocated(By.cssSelector("[data-testid='input-email']"), 10);
    WebElement inputPassword = waitForElementLocated(By.cssSelector("[data-testid='input-password']"), 10);
    WebElement inputPasswordConfirmation = waitForElementLocated(
        By.cssSelector("[data-testid='input-password-confirmation']"), 10);
    WebElement btnRegister = waitForElementLocated(By.cssSelector("[data-testid='btn-register']"), 10);

    inputFullname.sendKeys(fullName);
    inputSocialname.sendKeys(socialName);
    inputDocument.sendKeys(document);
    inputPhone.sendKeys(phone);
    inputEmail.sendKeys(email);
    inputPassword.sendKeys(password);
    inputPasswordConfirmation.sendKeys(passwordConfirmation);
    btnRegister.click();

    WebElement toast = waitForElementLocated(By.cssSelector("[data-testid='toast-content']"), 10);
    assertTrue(toast.isDisplayed());
    assertTrue(toast.getText().contains("Usuário criado com sucesso!"));
  }
  
  @Test
  @DisplayName("Deveria ser possível ir para a tela de login ao clicar no link")
  public void shouldGoToLogin() throws MalformedURLException {
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
