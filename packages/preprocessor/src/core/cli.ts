import { runPreprocessor } from '../index';

async function main() {
  try {
    console.log('🚀 Iniciando preprocessor...\n');
    await runPreprocessor();
    console.log('\n✅ Preprocessor concluído com sucesso!');
  } catch (error) {
    console.error('\n❌ Erro ao executar preprocessor:', error);
    if (error instanceof Error) {
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

main();
