import { defaultConfig } from './core/config';
import { orchestrator } from './core/orchestrator';

/**
 * Executa o preprocessador com a configuração padrão
 */
async function main() {
  try {
    const config = defaultConfig;
    await orchestrator(config);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    }
    process.exit(1);
  }
}

main();