TESTS_DIR = tests/test_cases
OUTPUT_DIR = results/reports
ARG_FILE = args.robotargs

clean:
	@echo "Limpando o diretório de resultados..."
	@rm -rf $(OUTPUT_DIR)
	@mkdir -p $(OUTPUT_DIR)

test-all: clean
	@echo "Executando testes com Robot Framework..."
	robot --outputdir $(OUTPUT_DIR) $(TESTS_DIR)

test-scenario: clean
	@echo "Executando testes com a tag específica..."
	robot --outputdir $(OUTPUT_DIR) --include $(TAG) $(TESTS_DIR)

test-file: clean
	@echo "Executando arquivo específico..."
	robot --outputdir $(OUTPUT_DIR) $(FILE_PATH)

test-args: clean
	@echo "Executando testes com Robot Framework usando arquivo de argumentos..."
	robot --outputdir $(OUTPUT_DIR) -A $(ARG_FILE) $(TESTS_DIR)

help:
	@echo "Comandos disponíveis:"
	@echo "  make clean        - Limpa os relatórios antigos"
	@echo "  make test-all     - Executa os testes e salva os relatórios em $(OUTPUT_DIR)"
	@echo "  make test-args    - Executa os testes usando o arquivo de argumentos $(ARG_FILE)"
	@echo "  make test-scenario TAG=<tag> - Executa um teste específico"
	@echo "  make test-file FILE_PATH=<path> - Executa um arquivo específico"