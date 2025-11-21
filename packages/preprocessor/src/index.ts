import { defaultConfig } from './core/config';
import { orchestrator } from './core/orchestrator';

/**
 * Executa o preprocessador com a configuração padrão
 */
export async function runPreprocessor() {
  const config = defaultConfig;
  await orchestrator(config);
}