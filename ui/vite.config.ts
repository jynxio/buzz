import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },

    plugins: [
        react({
            include: /\.(js|jsx|ts|tsx)$/,
            babel: {
                presets: [
                    [
                        '@babel/preset-env',
                        /**
                         * `corejs` must match the installed `core-js` package version
                         */
                        { modules: false, useBuiltIns: 'usage', corejs: '3.48.0' },
                    ],
                ],
                plugins: [
                    'babel-plugin-react-compiler',
                    [
                        '@babel/plugin-transform-runtime',
                        /**
                         * `version` must match the installed `@babel/runtime` versions (which should be aligned)
                         * @see {@link https://babeljs.io/docs/babel-plugin-transform-runtime#version}
                         */
                        { corejs: false, helpers: true, regenerator: false, version: '7.28.6' },
                    ],
                ],
            },
        }),
    ],

    build: { minify: 'esbuild', cssMinify: 'lightningcss' },

    css: {
        transformer: 'postcss',
    },
});
