import { spawn } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const reportsDir = join(__dirname, 'reports');

if (!existsSync(reportsDir)) {
  mkdirSync(reportsDir, { recursive: true });
}

const k6Process = spawn('k6', ['run', '--out', `json=${join(reportsDir, 'results.json')}`, join(__dirname, 'index.ts')], {
  stdio: 'inherit',
});

k6Process.on('close', (code) => {
  console.log(`k6 process exited with code ${code}`);
  if (code === 0) {
    console.log('Performance tests completed successfully!');
  } else {
    console.error('Performance tests failed!');
  }
})
  .on('error', (error: NodeJS.ErrnoException) => {
    console.error('Failed to start k6 process:', error.message);
    process.exit(1);
  });
