import js from '@eslint/js';
import jynxio from '@jynxio/eslint-plugin';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import typescript from 'typescript-eslint';

const reactWrapper = {
    settings: { react: { version: 'detect' } },
    ...react.configs.flat.recommended,
};

const reactHooksWrapper = {
    plugins: { 'react-hooks': reactHooks },
    rules: reactHooks.configs.recommended.rules,
};

const underscoreWrapper = {
    plugins: { jynxio },
    rules: {
        'jynxio/underscore-file-pattern': [
            'error',
            { '$': path.resolve('./'), '@': path.resolve('./src') },
        ],
    },
};

export default defineConfig([
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { ignores: ['**/dist/**', '**/out/**', '**/build/**', '**/node_modules/**'] },
    { languageOptions: { globals: { ...globals.browser, ...globals.node, chrome: 'readonly' } } },

    underscoreWrapper,
    js.configs.recommended,
    ...typescript.configs.recommended,
    reactWrapper,
    reactHooksWrapper,
    reactRefresh.configs.recommended,
    prettier,

    {
        rules: {
            'no-unused-expressions': 'off',

            '@typescript-eslint/no-unused-expressions': 'off',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],

            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        },
    },
]);
