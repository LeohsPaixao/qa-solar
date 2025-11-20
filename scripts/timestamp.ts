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

const isMainModule = (() => {
  if (typeof process === 'undefined') return false;
  const scriptPath = process.argv[1] || '';
  return scriptPath.includes('timestamp.ts') || scriptPath.endsWith('timestamp');
})();

if (isMainModule) {
  console.log(timestamp());
}