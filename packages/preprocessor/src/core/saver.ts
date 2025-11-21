import fs from 'fs-extra';
import path from 'path';
import { NormalizedFrameworkData, PreprocessorConfig } from '../types';

/**
 * Save the processed file to the processed directory
 * Salva no formato: {framework}.json dentro de uma pasta com timestamp
 * @param normalized - the normalized data
 * @param config - the config
 * @returns a promise that resolves when the file is saved
 */
export async function saveProcessedFile(
  normalized: NormalizedFrameworkData, 
  config: PreprocessorConfig
): Promise<void> {
  const { processedDir } = config;
  
  // Cria diretório com timestamp se não existir
  const timestampDir = path.join(processedDir, normalized.timestamp);
  await fs.ensureDir(timestampDir);
  
  // Salva arquivo com nome do framework
  const fileName = `${normalized.framework}.json`;
  const filePath = path.join(timestampDir, fileName);
  
  await fs.writeJSON(filePath, normalized, { spaces: 2 });
}