import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

const reportsDir = join(__dirname, 'reports');
const resultsFile = join(reportsDir, 'results.json');

try {
  if (existsSync(resultsFile)) {
    execSync(`k6 run --summary-export=${join(reportsDir, 'summary.json')} ${join(__dirname, 'index.ts')}`, {
      stdio: 'inherit',
    });
    console.log('Performance report generated successfully!');
  } else {
    console.error('Results file not found. Please run the tests first.');
  }
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error('Error generating report:', error.message);
  } else {
    console.error('Unknown error occurred while generating report');
  }
  process.exit(1);
}
