package com.qa.solar;

/**
 * Classe para gerar usuários via requisição HTTP
 * 
 * @author [Leonardo Paixão]
 * @version 1.0
 * @since 2025-08-29
 */
public class GenerateUsers extends MockGenerateUsers {
  public void generateUsers(int quantity) {
    for (int i = 0; i < quantity; i++) {
      generateUser();
    }
  }
}
