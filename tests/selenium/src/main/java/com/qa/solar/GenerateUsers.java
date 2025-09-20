package com.qa.solar;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Classe para gerar usuários via requisição HTTP
 * 
 * @author [Leonardo Paixão]
 * @version 1.0
 * @since 2025-08-29
 */
public class GenerateUsers extends MockGenerateUsers {

  private static final Logger LOG = Logger.getLogger(GenerateUsers.class.getName());
  private List<UserRecord> generatedUsers = new ArrayList<>();

  /**
   * Gera múltiplos usuários chamando internamente generateUser() e armazena-os em generatedUsers.
   *
   * Executa até `quantity` gerações, com um limite máximo de 1000 iterações. Para cada usuário gerado com sucesso
   * adiciona o registro à lista interna `generatedUsers` e escreve uma mensagem de sucesso no stdout.
   * Falhas na geração de um usuário são registradas como WARNING; a iteração continua para os próximos índices.
   *
   * @param quantity número desejado de usuários a gerar (não negativo; será limitado a 1000)
   * @throws IllegalArgumentException se quantity for negativo
   */
  public void generateUsers(int quantity) {
    if (quantity < 0) {
      throw new IllegalArgumentException("quantity deve ser > 0");
    }

    int count = Math.min(quantity, 1000);
    for (int i = 0; i < count; i++) {
      try {
        UserRecord user = generateUser();
        generatedUsers.add(user);
        System.out.println("✅ Usuário gerado com sucesso: " + user.email());
      } catch (Exception e) {
        LOG.log(Level.WARNING, "Falha ao gerar usuário no índice " + i, e);
      }
    }
  }
}
