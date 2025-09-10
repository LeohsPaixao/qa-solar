package com.qa.solar;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;

/**
 * Classe de teste para a listagem de usuários
 * 
 * @author [Leonardo Paixão]
 * @version 1.0
 * @since 2025-09-03
 */
@DisplayName("Testes de Listagem de Usuários")
public class ListUsers extends BaseTest {

  @BeforeAll
  public static void setUpAll() {
    GenerateUsers generateUsers = new GenerateUsers();
    generateUsers.generateUsers(10);
  }

  @BeforeEach
  public void setUpTest() {
    driver = setUp();
    Login login = new Login();
    login.login(driver, "generic@example.com", "123456");
    navigateTo("/listusers");
  }

  @AfterEach
  public void tearDownTest() {
    tearDown();
  }

  @Test
  @DisplayName("Deveria ser possível visualizar os elementos da tela de listagem de usuários")
  public void shouldSeeElements() {
    WebElement tableUsers = waitForElementLocated(
        By.cssSelector("[data-testid='table-users']"), 10);
    WebElement checkboxSelectAll = waitForElementLocated(
        By.cssSelector("[data-testid='checkbox-select-all']"), 10);
    WebElement btnDeleteUser = waitForElementLocated(
        By.cssSelector("[data-testid='btn-delete-user']"), 10);

    assertTrue(tableUsers.isDisplayed(), "O elemento deve ser exibido");
    assertTrue(checkboxSelectAll.isDisplayed(), "O elemento deve ser exibido");
    if (!btnDeleteUser.isDisplayed()) {
      ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", btnDeleteUser);
      assertTrue(btnDeleteUser.isDisplayed(), "O elemento deve ser exibido");
    }
  }

  @Test
  @DisplayName("Deveria ser possível selecionar todos os usuários")
  public void shouldSelectAllUsers() {
    WebElement checkboxSelectAll = waitForElementLocated(
        By.cssSelector("[data-testid='checkbox-select-all']"), 10);

    checkboxSelectAll.click();
    assertTrue(checkboxSelectAll.isSelected(), "O elemento deve ser selecionado");
    checkboxSelectAll.click();
    assertFalse(checkboxSelectAll.isSelected(), "O elemento deve ser deselecionado");
  }

  @Test
  @DisplayName("Deveria ser possível selecionar um usuário e excluí-lo")
  public void shouldSelectUserAndDelete() {
    waitForElementLocated(By.cssSelector("[data-testid='checkbox-select-users']"), 10);
    List<WebElement> checkboxesSelectUsers = driver.findElements(
        By.cssSelector("[data-testid='checkbox-select-users']"));
    
    checkboxesSelectUsers.get(2).click();

    WebElement btnDeleteUser = waitForElementLocated(
        By.cssSelector("[data-testid='btn-delete-user']"), 10);
    
    btnDeleteUser.click();

    WebElement toastContent = waitForElementLocated(
        By.cssSelector("[data-testid='toast-content']"), 10);

    assertTrue(toastContent.isDisplayed(), "O elemento deve ser exibido");
    assertEquals(toastContent.getText(), "1 usuário(s) excluído(s) com sucesso!", "A mensagem deve ser exibida");
  }
}
