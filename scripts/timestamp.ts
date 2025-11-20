/**
 * Generate a timestamp in the format YYYY-MM-DD-HH-MM-SS
 * @returns {string} The timestamp
 */
export function timestamp() { 
  return new Date()
  .toISOString()
  .replace(/:/g, '-')
  .split('.')[0];
}