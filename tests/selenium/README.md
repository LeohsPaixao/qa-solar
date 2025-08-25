# QA Solar - Selenium Tests

Este projeto contém os testes automatizados usando Selenium WebDriver para o projeto QA Solar.

## 🚀 Tecnologias Utilizadas

- **Java 21**
- **Selenium WebDriver 4.35.0**
- **JUnit 5**
- **WebDriverManager 5.7.0**
- **JaCoCo** (Cobertura de código)
- **Gradle** (Build tool)

## 📁 Estrutura do Projeto

```
src/
├── main/
│   ├── java/
│   │   └── com/qa/solar/
│   │       ├── config/          # Configurações
│   │       ├── pages/           # Page Objects
│   │       ├── utils/           # Utilitários
│   │       └── drivers/         # Configurações de drivers
│   └── resources/
└── test/
    ├── java/
    │   └── com/qa/solar/
    │       ├── tests/           # Classes de teste
    │       └── BaseTest.java    # Classe base
    └── resources/
        ├── application.properties
        ├── logback.xml
        └── testdata/            # Dados de teste
```

## ⚙️ Configuração

### Pré-requisitos

- Java 21 ou superior
- Gradle 8.0 ou superior
- Chrome browser

### Instalação

1. Clone o repositório
2. Navegue até o diretório do projeto Selenium:
   ```bash
   cd tests/selenium
   ```

3. Execute o build:
   ```bash
   ./gradlew build
   ```

## 🧪 Executando os Testes

### Execução Básica

```bash
# Executar todos os testes
./gradlew test

# Executar testes com browser específico
./gradlew test -Dbrowser=chrome

# Executar em modo headless
./gradlew test -Dheadless=true
```

### Tasks Personalizadas

```bash
# Executar testes específicos por browser
./gradlew runChromeTests

# Executar em modo headless
./gradlew runHeadlessTests
```

### Configurações de Sistema

```bash
# Configurar URL base
./gradlew test -DbaseUrl=https://example.com

# Configurar timeouts
./gradlew test -DimplicitWait=15 -DexplicitWait=20

# Configurar ambiente
./gradlew test -Denvironment=staging
```

## 📊 Relatórios

### Relatórios HTML (Gradle)

Os relatórios HTML são gerados automaticamente em:
```
build/reports/tests/test/index.html
```



### Cobertura de Código (JaCoCo)

```bash
# Gerar relatório de cobertura
./gradlew jacocoTestReport
```

O relatório de cobertura fica disponível em:
```
build/reports/jacoco/test/html/index.html
```

## 🔧 Configurações

### Propriedades do Sistema

| Propriedade | Padrão | Descrição |
|-------------|--------|-----------|
| `browser` | `chrome` | Browser a ser usado (chrome) |
| `headless` | `false` | Executar em modo headless |
| `baseUrl` | `http://localhost:3000` | URL base da aplicação |
| `implicitWait` | `10` | Timeout implícito em segundos |
| `explicitWait` | `10` | Timeout explícito em segundos |

### Configurações de Ambiente

Edite o arquivo `src/test/resources/application.properties` para configurar:

- URLs de diferentes ambientes
- Credenciais de teste
- Configurações de timeout
- Configurações de screenshot e vídeo

## 🏗️ Arquitetura

### Page Object Model (POM)

O projeto segue o padrão Page Object Model:

```java
public class LoginPage {
    @FindBy(id = "username")
    private WebElement usernameField;
    
    @FindBy(id = "password")
    private WebElement passwordField;
    
    public void login(String username, String password) {
        usernameField.sendKeys(username);
        passwordField.sendKeys(password);
        // ...
    }
}
```

### BaseTest

Todas as classes de teste herdam de `BaseTest`, que fornece:

- Configuração automática do WebDriver
- Configurações de timeout
- Métodos utilitários

## 🐛 Debugging

### Screenshots Automáticos

Screenshots são tirados automaticamente em caso de falha. Configure em `application.properties`:

```properties
screenshotOnFailure=true
screenshotPath=build/screenshots
```

### Logs Detalhados

Os logs são salvos em `build/logs/selenium-tests.log`. Configure o nível em `logback.xml`.