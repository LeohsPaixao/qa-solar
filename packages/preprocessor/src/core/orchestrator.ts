import { getLoaderFor } from '../loaders';
import { getParserFor } from '../parsers';
import { NormalizedFrameworkData, ParsedData, PreprocessorConfig } from '../types';
import { cleanProcessedDirectory } from './cleaner';
import { normalize } from './normalizer';
import { saveProcessedFile } from './saver';
import { scanRawDirectory } from './scanner';

/**
 * Orquestra o processo de preprocessamento
 * 1. Analisa o diretório raw para encontrar arquivos de resultados de testes
 * 2. Carrega o arquivo usando o loader apropriado
 * 3. Analisa o arquivo usando o parser apropriado
 * 4. Normaliza os dados analisados
 * 5. Limpa o diretório processed
 * 6. Salva os dados normalizados no diretório processed
 * @param config - configuração do preprocessador
 * @returns void
 */
export async function orchestrator(config: PreprocessorConfig): Promise<void> {
  const rawFiles = await scanRawDirectory(config.rawDir);

  if (rawFiles.length === 0) {
    throw new Error('No raw files found to process');
  }

  const normalizedResults: NormalizedFrameworkData[] = [];

  for (const rawFile of rawFiles) {
    try {
      const loader = getLoaderFor(rawFile);
      const content = await loader.load(rawFile);

      const parser = getParserFor(rawFile);
      const parsed: ParsedData = await parser.parse(content, rawFile);

      const normalized = normalize(parsed);
      normalizedResults.push(normalized);

      await cleanProcessedDirectory(config);
      setTimeout(async () => {
        await saveProcessedFile(normalized, config);
      }, 1500);

    } catch (error) {
      if (error instanceof Error && (error.message.includes('No loader found') || error.message.includes('No parser found'))) {
        continue;
      }
      throw error;
    }
  }

  // TODO: Gerar summary.json agregado com todos os resultados
  // await saveSummaryFile(normalizedResults, config);
}