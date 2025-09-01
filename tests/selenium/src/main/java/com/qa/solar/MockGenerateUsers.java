package com.qa.solar;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

import com.github.javafaker.Faker;

import io.github.cdimascio.dotenv.Dotenv;

/**
 * Classe abstrata para gerar usuários via requisição HTTP
 * 
 * @author [Leonardo Paixão]
 * @version 1.0
 * @since 2025-08-29
 */
public abstract class MockGenerateUsers {
  private Faker faker = new Faker();
  private Dotenv dotenv = Dotenv.load();
  private HttpClient httpClient = HttpClient.newBuilder()
      .connectTimeout(Duration.ofSeconds(10))
      .build();

  protected void generateUser() {
    String fullName = faker.name().fullName();
    String email = faker.internet().emailAddress();
    String password = "123456";
    String document = faker.idNumber().ssnValid();
    String docType = "cpf";
    String phone = faker.phoneNumber().cellPhone();
    String socialName = faker.name().lastName();

    createUserViaRequest(fullName, email, password, document, docType, phone, socialName);
  }

  private void createUserViaRequest(String fullName, String email, String password,
      String document, String docType, String phone, String socialName) {

    try {
      String baseUrl = dotenv.get("SELENIUM_API_BASE_URL", "http://localhost:3001");
      String jsonBody = String.format("""
          {
            "fullName": "%s",
            "email": "%s",
            "password": "%s",
            "document": "%s",
            "docType": "%s",
            "phone": "%s",
            "socialName": "%s"
          }
          """, fullName, email, password, document, docType, phone, socialName);

      HttpRequest request = HttpRequest.newBuilder()
          .uri(URI.create(baseUrl + "/users"))
          .header("Content-Type", "application/json")
          .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
          .timeout(Duration.ofSeconds(30))
          .build();

      HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

      if (response.statusCode() != 201) {
        System.out.println("❌ Erro ao criar usuário: " + fullName + " - Status: " + response.statusCode());
        System.out.println("Resposta: " + response.body());
      }
    } catch (Exception e) {
      System.out.println("❌ Erro ao criar usuário: " + fullName + " - Status: " + e.getMessage());
    }
  }

}
