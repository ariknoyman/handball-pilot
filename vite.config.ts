import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: { alias: { '@instinct/files': path.resolve(__dirname, 'src/files-shim.tsx') } },
  build: { outDir: 'dist', assetsInlineLimit: 0 },
});
