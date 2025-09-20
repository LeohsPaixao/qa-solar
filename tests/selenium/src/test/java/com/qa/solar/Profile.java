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

  /**
   * Configura o ambiente antes de cada teste do perfil.
   *
   * Inicializa o WebDriver, efetua login com a conta de teste genérica e navega para a página "/profile".
   * Executado antes de cada método de teste (@BeforeEach).
   */
  @BeforeEach
  public void setUpTest() {
    driver = setUp();
    Login login = new Login();
    login.login(driver, "generic@example.com", "123456");
    navigateTo("/profile");
  }

  /**
   * Executado após cada teste; finaliza e limpa os recursos de teste (por exemplo, fecha o driver).
   */
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

  /**
   * Verifica que não é possível salvar o perfil quando o campo "Nome Completo" está vazio.
   *
   * Executa interação no campo de nome (limpa o valor via JavaScript e força os eventos `input` e `blur`)
   * e valida que a mensagem de erro "O Nome Completo é obrigatório." é exibida no elemento com
   * data-testid="input-error-fulname-profile".
   */
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
  
  /**
   * Verifica que não é possível salvar alterações do perfil quando o campo "Nome Completo" contém apenas um nome.
   *
   * Preenche o campo de nome com um único termo e valida que a mensagem de erro é exibida informando que
   * é necessário pelo menos Nome e Sobrenome.
   */
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

  /**
   * Verifica que não é possível salvar quando o campo de telefone contém mais de 11 dígitos.
   *
   * Realiza: limpa o campo de telefone, insere um valor com muitos dígitos, dispara o evento de
   * input e blur, e então valida que a mensagem de erro apropriada é exibida
   * ("O telefone deve ter no máximo 11 dígitos.").
   */
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

  /**
   * Verifica que é possível atualizar os dados do perfil e que um toast de sucesso é exibido.
   *
   * Insere valores gerados aleatoriamente em Nome Completo, Nome Social e Telefone, submete o formulário
   * e valida que aparece a mensagem "Usuário alterado com sucesso!".
   */
  @Test
  @DisplayName("Deveria ser possível salvar a alteração")
  public void shouldSaveProfile() {
    String fullName = faker.name().fullName();
    String socialName = faker.name().lastName();
    String phone = faker.phoneNumber().cellPhone();

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