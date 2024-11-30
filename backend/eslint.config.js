import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'warn', // Alerta para `console.log`
      'no-unused-vars': 'off', // Substituído pela regra do TypeScript
    },
  },
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules, // Adicionar regras recomendadas do TypeScript
      '@typescript-eslint/no-explicit-any': 'off', // Permitir `any` explícito
      '@typescript-eslint/no-inferrable-types': 'warn', // Alerta para tipos desnecessários
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' }, // Ignorar variáveis prefixadas com '_'
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Não exigir tipos explícitos
    },
  },
];
