const esbuild = require('esbuild');
const glob = require('glob');

const entryPoints = [
  'index.ts',
  ...glob.sync('config/**/*.ts'),
  ...glob.sync('tests/**/*.ts'),
  ...glob.sync('utils/**/*.ts')
];

esbuild.build({
  entryPoints,
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  target: ['es2020'],
  platform: 'browser',
  loader: { '.ts': 'ts' },
  external: ['k6', 'k6/*']
}).catch((error: any) => {
  throw new Error(error);
});
