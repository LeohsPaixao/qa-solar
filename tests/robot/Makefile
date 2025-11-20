# Diretórios e arquivos
TESTS_DIR = tests/specs
OUTPUT_DIR_BASE = ../../qa-results/raw/robot-e2e
OUTPUT_DIR_BROWSER = tests/misc
ARG_FILE = args.robotargs
LOG_DIR = tests/misc/logs
PROCESSES = 4

.PHONY: test-all test-scenario test-file test-args lint format parallel clean-logs help

clean-logs:
	@echo "Limpando os logs gerados..."
	@rm -rf $(LOG_DIR)
	@mkdir -p $(LOG_DIR)

test-all:
	@echo "Executando todos os testes com Robot Framework..."
	@TIMESTAMP=$$(npx tsx ../../scripts/timestamp.ts); \
	OUTPUT_DIR=$(OUTPUT_DIR_BASE)/$$TIMESTAMP; \
	BROWSER_OUTPUTDIR=$(OUTPUT_DIR_BROWSER)/screenshots robot --outputdir $$OUTPUT_DIR $(TESTS_DIR)

test-scenario:
	@echo "Executando testes com a tag específica..."
	@if [ -z "$(TAG)" ]; then \
		echo "Erro: Especifique a tag com TAG=<tag>."; \
		exit 1; \
	fi
	@TIMESTAMP=$$(npx tsx ../../scripts/timestamp.ts); \
	OUTPUT_DIR=$(OUTPUT_DIR_BASE)/$$TIMESTAMP; \
	BROWSER_OUTPUTDIR=$(OUTPUT_DIR_BROWSER)/screenshots robot --outputdir $$OUTPUT_DIR --include $(TAG) $(TESTS_DIR)

test-file:
	@echo "Executando arquivo específico..."
	@echo "Exemplo: make test-file FILE_PATH=tests/specs/login.robot"
	@if [ -z "$(FILE_PATH)" ]; then \
		echo "Erro: Especifique o caminho do arquivo com FILE_PATH=<path>."; \
		exit 1; \
	fi
	@TIMESTAMP=$$(npx tsx ../../scripts/timestamp.ts); \
	OUTPUT_DIR=$(OUTPUT_DIR_BASE)/$$TIMESTAMP; \
	BROWSER_OUTPUTDIR=$(OUTPUT_DIR_BROWSER)/screenshots robot --outputdir $$OUTPUT_DIR $(FILE_PATH)

test-args:
	@echo "Executando testes com Robot Framework usando arquivo de argumentos..."
	@echo "Exemplo: make test-args ARG_FILE=args.robotargs"
	@TIMESTAMP=$$(npx tsx ../../scripts/timestamp.ts); \
	OUTPUT_DIR=$(OUTPUT_DIR_BASE)/$$TIMESTAMP; \
	BROWSER_OUTPUTDIR=$(OUTPUT_DIR_BROWSER)/screenshots robot --outputdir $$OUTPUT_DIR -A $(ARG_FILE) $(TESTS_DIR)

lint:
	@echo "Verificando a qualidade do código com Robocop..."
	robocop check --config robocop.toml

format:
	@echo "Formatando o código com Robocop..."
	robocop format --config robocop.toml

parallel:
	@echo "Executando testes em paralelo com Pabot..."
	@TIMESTAMP=$$(npx tsx ../../scripts/timestamp.ts); \
	OUTPUT_DIR=$(OUTPUT_DIR_BASE)/$$TIMESTAMP; \
	BROWSER_OUTPUTDIR=$(OUTPUT_DIR_BROWSER)/screenshots pabot --processes $(PROCESSES) --outputdir $$OUTPUT_DIR $(TESTS_DIR)

# Lista de comandos disponíveis
help:
	@echo "Comandos disponíveis:"
	@echo "  make clean-logs           - Limpa apenas os logs gerados"
	@echo "  make test-all             - Executa todos os testes e salva os relatórios em $(OUTPUT_DIR_BASE)/<timestamp>"
	@echo "  make test-scenario TAG=<tag> - Executa testes com uma tag específica"
	@echo "  make test-file FILE_PATH=<path> - Executa um arquivo de teste específico"
	@echo "  make test-args            - Executa os testes usando o arquivo de argumentos $(ARG_FILE)"
	@echo "  make lint                 - Verifica problemas de estilo nos testes com Robocop"
	@echo "  make format               - Formata os arquivos .robot e .resource com Robocop"
	@echo "  make parallel             - Executa os testes em paralelo utilizando Pabot (com $(PROCESSES) processos)"
