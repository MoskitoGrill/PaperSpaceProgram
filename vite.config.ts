import { defineConfig } from 'vite';
import { execSync } from 'node:child_process';
let revision = 'dev';
try { revision = execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch { /* Unversioned checkout. */ }
export default defineConfig(({ mode }) => ({
  base: './',
  build: { outDir: mode === 'pages' ? 'dist-pages' : 'dist' },
  define: {
    __BUILD_ID__: JSON.stringify(`0.1.0+${revision}${mode === 'pages' ? '-test' : ''}`),
    __PAGES_TEST__: mode === 'pages',
  },
}));
