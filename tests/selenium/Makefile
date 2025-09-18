build:
	@echo "Buildando o projeto"
	./gradlew build clean -x test
	
test:
	@echo "Executando testes de selenium"
	./gradlew test

coverage:
	@echo "Gerando relatório de cobertura"
	./gradlew jacocoTestReport

clean:
	@echo "Limpando o projeto"
	./gradlew clean

help:
	@echo "Makefile para executar os testes de selenium"
	@echo "make build - Buildar o projeto"
	@echo "make test - Executar os testes"
	@echo "make coverage - Gerar o relatório de cobertura"
	@echo "make clean - Limpar o projeto"
	@echo "make help - Mostrar esta mensagem de ajuda"