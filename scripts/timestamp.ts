/**
 * Generate a timestamp in the format YYYY-MM-DD-HH-MM-SS
 * @returns {string} The timestamp
 */
export function timestamp(): string {
  return new Date()
    .toISOString()
    .replace(/:/g, '-')
    .split('.')[0];
}

const isMainModule = import.meta.url.endsWith(process.argv[1]?.replace(/\\/g, '/') || '') ||
  process.argv[1]?.includes('timestamp.ts');

if (isMainModule || (typeof process !== 'undefined' && process.argv[1]?.endsWith('timestamp.ts'))) {
  console.log(timestamp());
}