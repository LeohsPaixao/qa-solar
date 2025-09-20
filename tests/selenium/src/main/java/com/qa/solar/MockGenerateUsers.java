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
public class MockGenerateUsers {
  private static final Logger LOG = Logger.getLogger(MockGenerateUsers.class.getName());
  private Faker faker = new Faker();
  private GenerateValidCPF generateValidCPF = new GenerateValidCPF();
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
      String phone_number,
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
    String document = generateValidCPF.generateValidCPF();
    String docType = "cpf";
    String phone = faker.number().digits(11);
    String socialName = faker.name().lastName();

    UserRecord user = new UserRecord(fullName, email, password, document, docType, phone, socialName);
    createUserViaRequest(user);
    return user;
  }

  private boolean createUserViaRequest(UserRecord user) {

    try {
      String baseUrl = dotenv.get("SELENIUM_API_URL", "http://localhost:3001");
      JsonObject payload = new JsonObject();
      payload.addProperty("full_name", user.fullName());
      payload.addProperty("social_name", user.socialName());
      payload.addProperty("document", user.document());
      payload.addProperty("doc_type", user.docType());
      payload.addProperty("phone_number", user.phone_number());
      payload.addProperty("email", user.email());
      payload.addProperty("password", user.password());
      String jsonBody = payload.toString();

      HttpRequest request = HttpRequest.newBuilder()
          .uri(URI.create(baseUrl + "/users"))
          .header("Accept", "application/json")
          .header("Content-Type", "application/json")
          .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
          .timeout(Duration.ofSeconds(30))
          .build();
      HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

      if (response.statusCode() > 201 || response.statusCode() >= 500) {
        LOG.log(Level.SEVERE, "Erro ao criar usuário via requisição HTTP",
            new Exception("Status: " + response.statusCode()));
        return false;
      }

      return true;
    } catch (Exception e) {
      LOG.log(Level.SEVERE, "Erro ao criar usuário via requisição HTTP", e);
      return false;
    }
  }
}