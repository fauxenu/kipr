module.exports = {
  extends: [
    'airbnb-base',
    'plugin:node/recommended'
  ],
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'object-curly-newline': 0,
    'max-len': [
      'error', { code: 100, tabWidth: 2 }
    ],
    'no-console': 0,
    'no-underscore-dangle': 0,
    'node/no-unsupported-features/es-syntax': 0
  }
}
