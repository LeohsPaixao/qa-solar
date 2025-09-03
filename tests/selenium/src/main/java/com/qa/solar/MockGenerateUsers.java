package com.qa.solar;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.github.javafaker.Faker;
import com.google.gson.JsonObject;

import io.github.cdimascio.dotenv.Dotenv;

/**
 * Classe abstrata para gerar usuários via requisição HTTP
 * 
 * @author [Leonardo Paixão]
 * @version 1.0
 * @since 2025-08-29
 */
public abstract class MockGenerateUsers {
  private static final Logger LOG = Logger.getLogger(MockGenerateUsers.class.getName());
  private Faker faker = new Faker();
  private Dotenv dotenv = Dotenv.load();
  private HttpClient httpClient = HttpClient.newBuilder()
      .connectTimeout(Duration.ofSeconds(10))
      .build();

  /**
   * Record para representar os dados do usuário gerado
   */
  public record UserRecord(
      String fullName,
      String email,
      String password,
      String document,
      String docType,
      String phone,
      String socialName) {
  }

  protected UserRecord generateUser() {
    String fullName = faker.name().fullName();
    String email = faker.internet().emailAddress();
    String password = UUID
        .randomUUID()
        .toString()
        .replace("-", "")
        .substring(0, 12);
    String document = faker.idNumber().ssnValid();
    String docType = "cpf";
    String phone = faker.phoneNumber().cellPhone();
    String socialName = faker.name().lastName();

    UserRecord user = new UserRecord(fullName, email, password, document, docType, phone, socialName);
    createUserViaRequest(user);
    return user;
  }

  private void createUserViaRequest(UserRecord user) {

    try {
      String baseUrl = dotenv.get("SELENIUM_API_BASE_URL", "http://localhost:3001");
      JsonObject payload = new JsonObject();
      payload.addProperty("fullName", user.fullName());
      payload.addProperty("email", user.email());
      payload.addProperty("password", user.password());
      payload.addProperty("document", user.document());
      payload.addProperty("docType", user.docType());
      payload.addProperty("phone", user.phone());
      payload.addProperty("socialName", user.socialName());
      String jsonBody = payload.toString();

      HttpRequest request = HttpRequest.newBuilder()
          .uri(URI.create(baseUrl + "/users"))
          .header("Accept", "application/json")
          .header("Content-Type", "application/json")
          .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
          .timeout(Duration.ofSeconds(30))
          .build();

      HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

      if (response.statusCode() != 201) {
        LOG.log(Level.WARNING, "❌ Erro ao criar usuário: " + " - Status: " + response.statusCode(),
            new Exception("Resposta: " + response.body()));
      }
    } catch (Exception e) {
      LOG.log(Level.WARNING, "❌ Erro ao criar usuário: " + " - Status: " + e.getMessage());
    }
  }

}
