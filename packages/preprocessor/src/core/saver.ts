import fs from 'fs-extra';
import path from 'path';
import { NormalizedFrameworkData, PreprocessorConfig } from '../types';

/**
 * Salva o arquivo processado no diretório processed
 * @param normalized - os dados normalizados
 * @param config - a configuração do preprocessador
 * @returns void
 */
export async function saveProcessedFile(
  normalized: NormalizedFrameworkData, 
  config: PreprocessorConfig
): Promise<void> {
  const { processedDir } = config;

  const fileName = `${normalized.framework}.json`;
  const filePath = path.join(processedDir, fileName);
  
  await fs.writeJSON(filePath, normalized, { spaces: 2 });
}