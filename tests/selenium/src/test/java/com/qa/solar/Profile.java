package com.qa.solar;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;

import com.github.javafaker.Faker;

/**
 * Testes para a tela de perfil
 * 
 * @author [Leonardo Paixão]
 * @version 1.0
 * @since 2025-09-18
 */
@DisplayName("Testes de Perfil")
public class Profile extends BaseTest {

  private Faker faker = new Faker();

  @BeforeEach
  public void setUpTest() {
    driver = setUp();
    Login login = new Login();
    login.login(driver, "generic@example.com", "123456");
    navigateTo("/profile");
  }

  @AfterEach
  public void tearDownTest() {
    tearDown();
  }

  @Test
  @DisplayName("Deveria ser possível visualizar os elementos da tela de perfil")
  public void shouldSeeElements() {
    WebElement formProfile = waitForElementLocated(By.cssSelector("[data-testid='form-profile']"), 10);
    WebElement formGroup = waitForElementLocated(By.cssSelector(".form-group"), 10);
    WebElement btnSaveProfile = waitForElementLocated(By.cssSelector("[data-testid='btn-save-profile']"), 10);

    assertTrue(formProfile.isDisplayed());
    assertTrue(formGroup.isDisplayed());
    assertTrue(btnSaveProfile.isDisplayed());
  }

  @Test
  @DisplayName("Não deveria ser possível salvar a alteração sem colocar algum dado no Nome Completo")
  public void shouldNotSaveWithoutFullName() {
    WebElement inputFullName = waitForElementLocated(By.cssSelector("[data-testid='input-fullname-profile']"), 10);

    inputFullName.sendKeys("testname");
    ((JavascriptExecutor) driver).executeScript("arguments[0].value = '';", inputFullName);
    ((JavascriptExecutor) driver).executeScript("arguments[0].dispatchEvent(new Event('input'));", inputFullName);
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputFullName);

    WebElement inputErrorFullName = waitForElementLocated(By.cssSelector("[data-testid='input-error-fulname-profile']"),
        10);
    assertTrue(inputErrorFullName.isDisplayed());
    assertTrue(inputErrorFullName.getText().contains("O Nome Completo é obrigatório."));
  }
  
  @Test
  @DisplayName("Não deveria ser possível salvar a alteração com apenas o nome")
  public void shouldNotSaveWithJustTheName() {
    WebElement inputFullName = waitForElementLocated(By.cssSelector("[data-testid='input-fullname-profile']"), 10);

    ((JavascriptExecutor) driver).executeScript("arguments[0].value = '';", inputFullName);
    inputFullName.sendKeys("testname");
    ((JavascriptExecutor) driver).executeScript("arguments[0].dispatchEvent(new Event('input'));", inputFullName);
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputFullName);

    WebElement inputErrorFullName = waitForElementLocated(By.cssSelector("[data-testid='input-error-fulname-profile']"),
        10);
    assertTrue(inputErrorFullName.isDisplayed());
    assertTrue(inputErrorFullName.getText().contains("O Nome Completo deve conter pelo menos Nome e Sobrenome."));
  }

  @Test
  @DisplayName("Não deveria ser possível salvar a alteração com letras no telefone")
  public void shouldNotSaveWithLettersInThePhone() {
    WebElement inputPhone = waitForElementLocated(By.cssSelector("[data-testid='input-phone-profile']"), 10);

    ((JavascriptExecutor) driver).executeScript("arguments[0].value = '';", inputPhone);
    inputPhone.sendKeys("testphone");
    ((JavascriptExecutor) driver).executeScript("arguments[0].dispatchEvent(new Event('input'));", inputPhone);
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputPhone);

    WebElement inputErrorPhone = waitForElementLocated(By.cssSelector("[data-testid=input-error-phone-profile]"), 10);
    assertTrue(inputErrorPhone.isDisplayed());
    assertTrue(inputErrorPhone.getText().contains("O telefone deve conter apenas números."));
  }

  @Test
  @DisplayName("Não deveria ser possível salvar a alteração com mais de 11 dígitos no telefone")
  public void shouldNotSaveWithMuchNumbersOnPhone() {
    WebElement inputPhone = waitForElementLocated(By.cssSelector("[data-testid='input-phone-profile']"), 10);

    ((JavascriptExecutor) driver).executeScript("arguments[0].value = '';", inputPhone);
    inputPhone.sendKeys("147258369147258");
    ((JavascriptExecutor) driver).executeScript("arguments[0].dispatchEvent(new Event('input'));", inputPhone);
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputPhone);

    WebElement inputErrorPhone = waitForElementLocated(By.cssSelector("[data-testid=input-error-phone-profile]"), 10);
    assertTrue(inputErrorPhone.isDisplayed());
    assertTrue(inputErrorPhone.getText().contains("O telefone deve ter no máximo 11 dígitos."));
  }

  @Test
  @DisplayName("Não deveria ser possível salvar a alteração com menos de 10 dígitos no telefone")
  public void shouldNotSaveWithLittleNumbersOnPhone() {
    WebElement inputPhone = waitForElementLocated(By.cssSelector("[data-testid='input-phone-profile']"), 10);

    ((JavascriptExecutor) driver).executeScript("arguments[0].value = '';", inputPhone);
    inputPhone.sendKeys("1472");
    ((JavascriptExecutor) driver).executeScript("arguments[0].dispatchEvent(new Event('input'));", inputPhone);
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputPhone);

    WebElement inputErrorPhone = waitForElementLocated(By.cssSelector("[data-testid=input-error-phone-profile]"), 10);
    assertTrue(inputErrorPhone.isDisplayed());
    assertTrue(inputErrorPhone.getText().contains("O telefone deve ter no mínimo 10 dígitos."));
  }

  @Test
  @DisplayName("Deveria ser possível salvar a alteração")
  public void shouldSaveProfile() {
    String fullName = faker.name().fullName();
    String socialName = faker.name().lastName();
    String phone = faker.number().digits(11);

    WebElement inputFullName = waitForElementLocated(By.cssSelector("[data-testid='input-fullname-profile']"), 10);
    WebElement inputSocialName = waitForElementLocated(By.cssSelector("[data-testid='input-socialname-profile']"), 10);
    WebElement inputPhone = waitForElementLocated(By.cssSelector("[data-testid='input-phone-profile']"), 10);
    WebElement btnSave = waitForElementLocated(By.cssSelector("[data-testid='btn-save-profile']"), 10);

    ((JavascriptExecutor) driver).executeScript("arguments[0].value = '';", inputFullName);
    inputFullName.sendKeys(fullName);
    ((JavascriptExecutor) driver).executeScript("arguments[0].dispatchEvent(new Event('input'));", inputFullName);
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputFullName);
    ((JavascriptExecutor) driver).executeScript("arguments[0].value = '';", inputSocialName);
    inputSocialName.sendKeys(socialName);
    ((JavascriptExecutor) driver).executeScript("arguments[0].dispatchEvent(new Event('input'));", inputSocialName);
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputSocialName);
    ((JavascriptExecutor) driver).executeScript("arguments[0].value = '';", inputPhone);
    inputPhone.sendKeys(phone);
    ((JavascriptExecutor) driver).executeScript("arguments[0].dispatchEvent(new Event('input'));", inputPhone);
    ((JavascriptExecutor) driver).executeScript("arguments[0].blur();", inputPhone);

    btnSave.click();

    WebElement toast = waitForElementLocated(By.cssSelector("[data-testid='toast-content']"), 10);

    assertTrue(toast.isDisplayed());
    assertTrue(toast.getText().contains("Usuário alterado com sucesso!"));
  }
}