module.exports = {
  root: true,
  plugins: ['flowtype'],
  extends: [
    'eslint:recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  globals: {
    Optional: 'readonly',
    MapType: 'readonly',
    NumMapType: 'readonly',
    NodeJS: 'readonly',
    Response: 'readonly',
    Buffer: 'readonly',
    JSX: 'readonly',
  },
  rules: {
    'no-unused-vars': 0,
    'no-console': 1,
    '@typescript-eslint/no-unused-vars': 1,
    'no-shadow': 0,
    'require-await': 1,
    '@typescript-eslint/switch-exhaustiveness-check': 2,
    '@typescript-eslint/no-explicit-any': 1,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
    project: ['./tsconfig.json'],
  },
  overrides: [
    {
      files: ['**/__tests__/**', './src/tests/**'],
      rules: {
        'require-await': 0,
      },
    },
  ],
};
