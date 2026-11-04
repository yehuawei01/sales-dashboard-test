import { defineConfig } from 'vite';

// Match the public GitHub Pages repository path. No server-dependent routes.
const base = '/sales-dashboard-test/';
export default defineConfig(({ mode }) => ({
  root: mode === 'test' ? '.' : 'app',
  base: mode === 'test' ? '/' : base,
  server: { host: '127.0.0.1', strictPort: true },
  preview: { host: '127.0.0.1', strictPort: true },
  build: { outDir: '../dist', emptyOutDir: true },
}));
