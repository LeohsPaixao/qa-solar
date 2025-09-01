package com.qa.solar;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import io.github.cdimascio.dotenv.Dotenv;

public class Login {
  private Dotenv dotenv = Dotenv.load();
  private HttpClient httpClient = HttpClient.newBuilder()
      .connectTimeout(Duration.ofSeconds(10))
      .build();

  public void login(String email, String password, WebDriver driver) {
    try {
      String baseUrl = dotenv.get("SELENIUM_API_BASE_URL", "http://localhost:3001");
      String jsonBody = String.format("""
          {
            "email": "%s",
            "password": "%s"
          }
          """, email, password);
    

      HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create(baseUrl + "/auth/login"))
      .header("Content-Type", "application/json")
      .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
      .timeout(Duration.ofSeconds(30))
      .build();

      HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

      if (response.statusCode() != 200) {
        throw new RuntimeException("Erro ao fazer login: " + response.body());
      }
    
      JsonObject jsonResponse = JsonParser.parseString(response.body()).getAsJsonObject();
      String token = jsonResponse.get("token").getAsString();

      ((JavascriptExecutor) driver).executeScript("localStorage.setItem('user-token', '" + token + "')");
    } catch (Exception e) {
      System.out.println("❌ Erro ao fazer login: " + e.getMessage());
    }
  }
}