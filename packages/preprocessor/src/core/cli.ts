import { runPreprocessor } from '../index';

async function main() {
  try {
    await runPreprocessor();
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    }
    process.exit(1);
  }
}

main();
