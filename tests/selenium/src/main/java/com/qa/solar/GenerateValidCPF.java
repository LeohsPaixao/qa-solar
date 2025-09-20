package com.qa.solar;

import java.util.Random;

/**
 * Classe para gerar um CPF válido (Cadastro de Pessoas Físicas).
 * 
 * @author [Leonardo Paixão]
 * @version 1.0
 * @since 2025-09-18
 */
public class GenerateValidCPF {

  private Random random = new Random();

  /**
   * Gera uma sequência aleatória de dígitos decimais com o comprimento especificado.
   *
   * @param length número de dígitos a gerar; deve ser não negativo
   * @return string contendo exatamente `length` caracteres, cada um entre '0' e '9'
   */
  protected String generateRandomDigits(int length) {
    StringBuilder digits = new StringBuilder();
    for (int i = 0; i < length; i++) {
      digits.append(random.nextInt(10));
    }
    return digits.toString();
  }

  /**
   * Calcula um dígito verificador de CPF a partir da sequência base fornecida.
   *
   * Usa o algoritmo de soma ponderada com pesos decrescentes (peso inicial = base.length() + 1)
   * e a regra do módulo 11: se o resto da divisão por 11 for menor que 2 retorna 0, caso contrário
   * retorna 11 - resto.
   *
   * @param base sequência de dígitos (normalmente os 9 ou 10 dígitos iniciais do CPF); deve conter apenas caracteres numéricos
   * @return o dígito verificador calculado (0–9)
   */
  protected int calculateVerifierDigit(String base) {
    int sum = 0;
    int weight = base.length() + 1;
    
    for (int i = 0; i < base.length(); i++) {
      sum += Character.getNumericValue(base.charAt(i)) * weight;
      weight--;
    }
    
    int remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  /**
   * Formata uma string de CPF em 11 dígitos para o padrão "XXX.XXX.XXX-XX".
   *
   * <p>Aplica uma substituição por expressão regular que insere pontos e hífen.
   * Se a entrada não corresponder ao padrão de 11 dígitos contíguos, a string
   * original é retornada sem alterações.</p>
   *
   * @param cpf string contendo os 11 dígitos do CPF (apenas dígitos)
   * @return CPF formatado no padrão "XXX.XXX.XXX-XX" ou a string original se não houver correspondência
   */
  protected String formatCPF(String cpf) {
    return cpf.replaceAll("(\\d{3})(\\d{3})(\\d{3})(\\d{2})", "$1.$2.$3-$4");
  }

  /**
   * Gera e retorna um CPF válido no formato padrão (XXX.XXX.XXX-XX).
   *
   * Produz 9 dígitos aleatórios, calcula os dois dígitos verificadores segundo o
   * algoritmo do CPF e retorna a string formatada com pontos e traço.
   *
   * @return CPF válido e formatado (ex.: 123.456.789-09)
   */
  public String generateValidCPF() {
    String baseDigits = generateRandomDigits(9);
    int firstVerifier = calculateVerifierDigit(baseDigits);
    int secondVerifier = calculateVerifierDigit(baseDigits + firstVerifier);
    return formatCPF(baseDigits + firstVerifier + secondVerifier);
  }
}
