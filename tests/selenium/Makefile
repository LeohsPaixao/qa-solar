# Diretórios e arquivos
OUTPUT_DIR_BASE = ../../qa-results/raw/selenium-e2e

.PHONY: building test coverage clean help

building:
	@echo "Buildando o projeto"
	./gradlew clean build -x test --console=plain
	
test:
	@echo "Executando testes de selenium"
	@TIMESTAMP=$$(npx ts-node ../../scripts/timestamp.ts); \
	OUTPUT_DIR=$(OUTPUT_DIR_BASE)/$$TIMESTAMP; \
	mkdir -p $$OUTPUT_DIR; \
	echo "Salvando resultados em: $$(cd $(CURDIR) && cd $$OUTPUT_DIR && pwd)"; \
	./gradlew clean test --console=plain -Ptest.report.dir=$$OUTPUT_DIR

coverage:
	@echo "Gerando relatório de cobertura"
	./gradlew jacocoTestReport

clean:
	@echo "Limpando o projeto"
	./gradlew clean

help:
	@echo "Makefile para executar os testes de selenium"
	@echo "make building - Buildar o projeto"
	@echo "make test - Executar os testes"
	@echo "make coverage - Gerar o relatório de cobertura"
	@echo "make clean - Limpar o projeto"
	@echo "make help - Mostrar esta mensagem de ajuda"