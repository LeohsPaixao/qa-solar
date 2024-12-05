# Diretórios e arquivos
TESTS_DIR = tests/specs
OUTPUT_DIR = results/reports
OUTPUT_DIR_BROWSER = results
ARG_FILE = args.robotargs
LOG_DIR = results/logs

# Variáveis para paralelismo e qualidade de código
PROCESSES = 4

.PHONY: clean test-all test-scenario test-file test-args lint tidy parallel clean-logs help

clean:
	@echo "Limpando o diretório de resultados..."
	@rm -rf $(OUTPUT_DIR)
	@mkdir -p $(OUTPUT_DIR)

clean-logs:
	@echo "Limpando os logs gerados..."
	@rm -rf $(LOG_DIR)
	@mkdir -p $(LOG_DIR)

test-all: clean
	@echo "Executando todos os testes com Robot Framework..."
	BROWSER_OUTPUTDIR=$(OUTPUT_DIR_BROWSER)/screenshots robot --outputdir $(OUTPUT_DIR) $(TESTS_DIR)

test-scenario: clean
	@echo "Executando testes com a tag específica..."
ifndef TAG
	@echo "Erro: Especifique a tag com TAG=<tag>."
	@exit 1
endif
	BROWSER_OUTPUTDIR=$(OUTPUT_DIR_BROWSER)/screenshots robot --outputdir $(OUTPUT_DIR) --include $(TAG) $(TESTS_DIR)

test-file: clean
	@echo "Executando arquivo específico..."
ifndef FILE_PATH
	@echo "Erro: Especifique o caminho do arquivo com FILE_PATH=<path>."
	@exit 1
endif
	BROWSER_OUTPUTDIR=$(OUTPUT_DIR_BROWSER)/screenshots robot --outputdir $(OUTPUT_DIR) $(FILE_PATH)

test-args: clean
	@echo "Executando testes com Robot Framework usando arquivo de argumentos..."
	BROWSER_OUTPUTDIR=$(OUTPUT_DIR_BROWSER)/screenshots robot --outputdir $(OUTPUT_DIR) -A $(ARG_FILE) $(TESTS_DIR)

lint:
	@echo "Verificando a qualidade do código com Robocop..."
	robocop $(TESTS_DIR)

tidy:
	@echo "Formatando os arquivos .robot com Robotidy..."
	robotidy $(TESTS_DIR)

parallel: clean
	@echo "Executando testes em paralelo com Pabot..."
	BROWSER_OUTPUTDIR=$(OUTPUT_DIR_BROWSER)/screenshots pabot --processes $(PROCESSES) --outputdir $(OUTPUT_DIR) $(TESTS_DIR)

# Lista de comandos disponíveis
help:
	@echo "Comandos disponíveis:"
	@echo "  make clean                - Limpa os relatórios antigos"
	@echo "  make clean-logs           - Limpa apenas os logs gerados"
	@echo "  make test-all             - Executa todos os testes e salva os relatórios em $(OUTPUT_DIR)"
	@echo "  make test-scenario TAG=<tag> - Executa testes com uma tag específica"
	@echo "  make test-file FILE_PATH=<path> - Executa um arquivo de teste específico"
	@echo "  make test-args            - Executa os testes usando o arquivo de argumentos $(ARG_FILE)"
	@echo "  make lint                 - Verifica problemas de estilo nos testes com Robocop"
	@echo "  make tidy                 - Formata os arquivos .robot com Robotidy"
	@echo "  make parallel             - Executa os testes em paralelo utilizando Pabot (com $(PROCESSES) processos)"
