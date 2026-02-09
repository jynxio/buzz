import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    resolve: { alias: { $: resolve(__dirname, './') } },
    plugins: [react()],
    build: {
        lib: {
            entry: resolve(__dirname, 'index.ts'),
            formats: ['es'],
            fileName: 'index',
            cssFileName: 'style',
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime', /^@base-ui\/react/],
        },
    },
    css: { modules: { generateScopedName: '[local]-[hash:base64:5]' } },
});
