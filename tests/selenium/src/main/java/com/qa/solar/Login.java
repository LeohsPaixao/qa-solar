package com.qa.solar;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import io.github.cdimascio.dotenv.Dotenv;

/**
 * Classe para fazer login via requisição HTTP
 * 
 * @author [Leonardo Paixão]
 * @version 1.0
 * @since 2025-09-03
 */
public class Login {
  private static final Logger LOG = Logger.getLogger(Login.class.getName());
  private Dotenv dotenv = Dotenv.load();
  private HttpClient httpClient = HttpClient.newBuilder()
      .connectTimeout(Duration.ofSeconds(10))
      .build();

  /**
   * Efetua login via API e injeta o token no localStorage do navegador controlado pelo WebDriver.
   *
   * Faz uma requisição POST para {SELENIUM_API_BASE_URL}/auth/login (padrão http://localhost:3001)
   * com {email} e {password} como JSON. Se obtiver um token na resposta, navega o {@code driver}
   * para {SELENIUM_BASE_URL} (padrão http://localhost:8181) e grava o token em
   * localStorage sob a chave {@code user-token}.
   *
   * Observações:
   * - Registra avisos se o status HTTP não for 200 ou se a resposta não contiver um token.
   * - Captura internamente exceções; não lança erros para o chamador.
   *
   * @param email    endereço de e-mail usado para autenticação
   * @param password senha usada para autenticação
   */
  public void login(WebDriver driver, String email, String password) {
    try {
      String baseUrl = dotenv.get("SELENIUM_API_BASE_URL", "http://localhost:3001");
      JsonObject payload = new JsonObject();
      payload.addProperty("email", email);
      payload.addProperty("password", password);
      String jsonBody = payload.toString();

      HttpRequest request = HttpRequest.newBuilder()
          .uri(URI.create(baseUrl + "/auth/login"))
          .header("Accept", "application/json")
          .header("Content-Type", "application/json")
          .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
          .timeout(Duration.ofSeconds(30))
          .build();

      HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

      if (response.statusCode() != 200) {
        LOG.log(Level.WARNING, "Erro ao fazer login: " + " - Status: " + response.statusCode(),
            new Exception("Resposta: " + response.body()));
      }

      JsonObject jsonResponse = JsonParser.parseString(response.body()).getAsJsonObject();
      if (!jsonResponse.has("token") || jsonResponse.get("token").isJsonNull()) {
        LOG.log(Level.WARNING, "Resposta de login sem token", new Exception("Resposta: " + response.body()));
      }

      String token = jsonResponse.get("token").getAsString();

      driver.get(dotenv.get("SELENIUM_BASE_URL", "http://localhost:8181"));

      try {
        Thread.sleep(1000);
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
      }

      ((JavascriptExecutor) driver).executeScript("localStorage.setItem('user-token', '" + token + "')");
    } catch (Exception e) {
      LOG.log(Level.WARNING, "Erro ao fazer login: " + " - Status: " + e.getMessage(), e);
    }
  }
}