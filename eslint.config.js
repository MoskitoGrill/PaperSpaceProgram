import js from '@eslint/js';
import ts from 'typescript-eslint';
export default ts.config(
  { ignores: ['dist/**', 'dist-pages/**', 'node_modules/**', '.tools/**', 'test-results/**', 'playwright-report/**'] },
  js.configs.recommended, ...ts.configs.recommended,
  { files: ['tests/*.mjs'], languageOptions: { globals: { process: 'readonly', URL: 'readonly' } } },
);
