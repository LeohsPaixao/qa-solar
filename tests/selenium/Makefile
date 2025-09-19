build:
	@echo "Buildando o projeto"
	./gradlew build clean -x test --console=plain
	
test:
	@echo "Executando testes de selenium"
	./gradlew clean test --console=plain

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
	@echo "make test-headless - Executar os testes headless"
	@echo "make coverage - Gerar o relatório de cobertura"
	@echo "make clean - Limpar o projeto"
	@echo "make help - Mostrar esta mensagem de ajuda"