module.exports = {
    root: true,
    parser: '@babel/eslint-parser',
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
      babelOptions: {
        configFile: './babel.config.js',
      },
    },
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-native/all',
    ],
    plugins: ['react', 'react-native'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Add custom rules here
    },
  };
  