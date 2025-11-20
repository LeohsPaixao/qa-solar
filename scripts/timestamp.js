const ts = new Date()
  .toISOString()
  .replace(/:/g, '-')
  .split('.')[0];

process.stdout.write(ts);
