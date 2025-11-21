import fs from 'fs-extra';
import path from 'path';
import { Loader, RawFile } from '../types';
import { MochawesomeData, MochawesomeStats } from '../types/mochawesome.types';

/**
 * Carrega um arquivo JSON mochawesome
 */
async function loadMochawesomeFile(filePath: string): Promise<MochawesomeData | null> {
  try {
    if (!(await fs.pathExists(filePath))) {
      return null;
    }
    const content = await fs.readJSON(filePath);
    return content as MochawesomeData;
  } catch (error) {
    console.error(`Error loading mochawesome file ${filePath}:`, error);
    return null;
  }
}

/**
 * Faz merge de múltiplos arquivos mochawesome
 */
function mergeMochawesomeFiles(files: MochawesomeData[]): MochawesomeData {
  if (files.length === 0) {
    throw new Error('No mochawesome files to merge');
  }

  if (files.length === 1) {
    return files[0];
  }

  // Usa o primeiro arquivo como base
  const merged = { ...files[0] };

  // Merge das estatísticas
  const mergedStats: MochawesomeStats = {
    suites: 0,
    tests: 0,
    passes: 0,
    pending: 0,
    failures: 0,
    start: files[0].stats.start,
    end: files[files.length - 1].stats.end, // Último end time
    duration: 0,
    testsRegistered: 0,
    passPercent: 0,
    pendingPercent: 0,
    other: 0,
    hasOther: false,
    skipped: 0,
    hasSkipped: false
  };

  // Soma todas as estatísticas
  for (const file of files) {
    mergedStats.suites += file.stats.suites;
    mergedStats.tests += file.stats.tests;
    mergedStats.passes += file.stats.passes;
    mergedStats.pending += file.stats.pending;
    mergedStats.failures += file.stats.failures;
    mergedStats.duration += file.stats.duration;
    mergedStats.testsRegistered += file.stats.testsRegistered;
    mergedStats.other += file.stats.other;
    mergedStats.skipped += file.stats.skipped;

    if (file.stats.hasOther) {
      mergedStats.hasOther = true;
    }
    if (file.stats.hasSkipped) {
      mergedStats.hasSkipped = true;
    }
  }

  // Calcula percentuais baseado nos totais
  if (mergedStats.testsRegistered > 0) {
    mergedStats.passPercent = (mergedStats.passes / mergedStats.testsRegistered) * 100;
    mergedStats.pendingPercent = (mergedStats.pending / mergedStats.testsRegistered) * 100;
  }

  merged.stats = mergedStats;

  // Merge dos results (concatena arrays)
  merged.results = files.flatMap(file => file.results);

  // Mantém o meta do primeiro arquivo (geralmente são iguais)
  merged.meta = files[0].meta;

  return merged;
}

/**
 * Encontra todos os arquivos mochawesome no diretório
 * O mochawesome.json principal NÃO está mergeado, contém apenas o primeiro spec
 * Portanto, sempre fazemos merge de TODOS os arquivos (principal + parciais)
 */
async function findMochawesomeFiles(baseDir: string): Promise<string[]> {
  const files: string[] = [];

  // Busca o arquivo principal (mochawesome.json)
  const mainFile = path.join(baseDir, 'mochawesome.json');
  if (await fs.pathExists(mainFile)) {
    files.push(mainFile);
  }

  // Busca arquivos parciais (mochawesome_*.json)
  const entries = await fs.readdir(baseDir, { withFileTypes: true });
  const partialFiles = entries
    .filter(entry => {
      if (!entry.isFile()) return false;
      const name = entry.name;
      return /^mochawesome_\d+\.json$/.test(name);
    })
    .map(entry => path.join(baseDir, entry.name))
    .sort(); // Ordena para garantir ordem consistente

  files.push(...partialFiles);

  return files;
}

/**
 * Loader para arquivos Cypress (mochawesome.json)
 */
export const loadCypress: Loader = {
  canLoad(file: RawFile): boolean {
    return file.framework === 'cypress-e2e' || file.framework === 'cypress-ct';
  },

  async load(file: RawFile): Promise<unknown> {
    // Encontra todos os arquivos mochawesome no diretório base
    const mochawesomeFiles = await findMochawesomeFiles(file.baseDir);

    if (mochawesomeFiles.length === 0) {
      throw new Error(`No mochawesome files found in ${file.baseDir}`);
    }

    // Carrega todos os arquivos
    const loadedFiles: MochawesomeData[] = [];
    for (const filePath of mochawesomeFiles) {
      const data = await loadMochawesomeFile(filePath);
      if (data) {
        loadedFiles.push(data);
      }
    }

    if (loadedFiles.length === 0) {
      throw new Error(`Failed to load any mochawesome files from ${file.baseDir}`);
    }

    // Se houver apenas um arquivo, retorna diretamente
    if (loadedFiles.length === 1) {
      return loadedFiles[0];
    }

    // Faz merge de múltiplos arquivos
    return mergeMochawesomeFiles(loadedFiles);
  }
};

