import fs from 'fs-extra';
import path from 'path';
import { Framework, RawFile } from '../types';

/**
 * Padrões de arquivos para cada framework
 */
const FRAMEWORK_FILE_PATTERNS: Record<Framework, string[]> = {
  'cypress-e2e': ['mochawesome.json', 'mochawesome_*.json'],
  'cypress-ct': ['mochawesome.json', 'mochawesome_*.json'],
  'jest': ['results.json'],
  'playwright-e2e': ['results.json'],
  'playwright-ct': ['results.json'],
  'robot-e2e': ['output.xml'],
  'selenium-e2e': ['TEST-*.xml'],
  'vitest': ['results.json']
};

/**
 * Verifica se uma string é um timestamp válido
 * Formato esperado: 2025-11-20T15-41-24 ou 2025-11-20-21-39-05
 */
function isValidTimestamp(timestamp: string): boolean {
  const timestampRegex = /^\d{4}-\d{2}-\d{2}[T-]\d{2}-\d{2}-\d{2}$/;
  return timestampRegex.test(timestamp);
}

/**
 * Extrai o framework do caminho do diretório
 */
function extractFramework(dirName: string): Framework | null {
  const frameworks: Framework[] = [
    'cypress-e2e',
    'cypress-ct',
    'playwright-e2e',
    'playwright-ct',
    'jest',
    'vitest',
    'robot-e2e',
    'selenium-e2e'
  ];

  return frameworks.includes(dirName as Framework) ? (dirName as Framework) : null;
}

/**
 * Verifica se um arquivo corresponde a um padrão
 */
function matchesPattern(fileName: string, pattern: string): boolean {
  const regexPattern = pattern
    .replace(/\*/g, '.*')
    .replace(/\?/g, '.');
  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(fileName);
}

/**
 * Encontra arquivos de resultado em um diretório de timestamp
 */
async function findResultFiles(
  timestampDir: string,
  framework: Framework
): Promise<string[]> {
  const patterns = FRAMEWORK_FILE_PATTERNS[framework];
  const foundFiles: string[] = [];

  // Lista todos os arquivos no diretório
  const entries = await fs.readdir(timestampDir, { withFileTypes: true });
  const files = entries.filter(entry => entry.isFile());

  // Verifica cada arquivo contra os padrões
  for (const file of files) {
    for (const pattern of patterns) {
      if (matchesPattern(file.name, pattern)) {
        foundFiles.push(path.join(timestampDir, file.name));
        break; // Arquivo já foi adicionado, não precisa verificar outros padrões
      }
    }
  }

  return foundFiles;
}

/**
 * Escaneia o diretório raw para encontrar arquivos de resultados de testes
 * @param rawDir - o diretório raw para escanear
 * @returns uma promise que resolve para um array de RawFile
 */
export async function scanRawDirectory(rawDir: string): Promise<RawFile[]> {
  const rawFiles: RawFile[] = [];

  // Verifica se o diretório existe
  if (!(await fs.pathExists(rawDir))) {
    return rawFiles;
  }

  // Lista todos os diretórios de frameworks
  const entries = await fs.readdir(rawDir, { withFileTypes: true });
  const frameworkDirs = entries.filter(entry => entry.isDirectory());

  for (const frameworkDir of frameworkDirs) {
    const framework = extractFramework(frameworkDir.name);
    
    if (!framework) {
      // Ignora diretórios que não são frameworks conhecidos
      continue;
    }

    const frameworkPath = path.join(rawDir, frameworkDir.name);

    // Lista diretórios de timestamp dentro do framework
    const timestampEntries = await fs.readdir(frameworkPath, { withFileTypes: true });
    const timestampDirs = timestampEntries.filter(entry => entry.isDirectory());

    for (const timestampDir of timestampDirs) {
      const timestamp = timestampDir.name;

      if (!isValidTimestamp(timestamp)) {
        // Ignora diretórios que não são timestamps válidos
        continue;
      }

      const timestampPath = path.join(frameworkPath, timestamp);

      // Encontra arquivos de resultado neste diretório de timestamp
      const resultFiles = await findResultFiles(timestampPath, framework);

      if (resultFiles.length === 0) {
        // Nenhum arquivo encontrado, continua para o próximo timestamp
        continue;
      }

      // Para frameworks com múltiplos arquivos (Cypress, Selenium),
      // cria um RawFile apontando para o diretório base
      // O loader será responsável por fazer o merge
      const baseDir = timestampPath;
      
      // Usa o primeiro arquivo encontrado como referência principal
      // ou o arquivo principal se existir (ex: mochawesome.json para Cypress)
      let mainFile = resultFiles[0];
      
      // Para Cypress, prioriza mochawesome.json se existir
      if (framework === 'cypress-e2e' || framework === 'cypress-ct') {
        const mainMochawesome = resultFiles.find(f => 
          path.basename(f) === 'mochawesome.json'
        );
        if (mainMochawesome) {
          mainFile = mainMochawesome;
        }
      }

      rawFiles.push({
        path: mainFile,
        framework,
        timestamp,
        baseDir
      });
    }
  }

  return rawFiles;
}