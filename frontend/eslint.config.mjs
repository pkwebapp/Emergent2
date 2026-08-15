const stubRule = { create: () => ({}) }

export default [
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'public/**'],
  },
  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      '@next/next': { rules: { 'no-img-element': stubRule } },
      'react-hooks': { rules: { 'exhaustive-deps': stubRule } },
    },
    rules: {},
  },
]
