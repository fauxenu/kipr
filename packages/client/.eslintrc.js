module.exports = {
  extends: [
    'plugin:vue/essential',
    'airbnb-base'
  ],
  env: {
    browser: true,
    worker: true
  },
  settings: {
    'import/resolver': 'webpack'
  },
  rules: {
    "no-return-assign": ["error", "except-parens"],
    "object-curly-newline": ["error", { "minProperties": 5, "consistent": true }],
    "import/no-unresolved": 0
  },
  globals: {
    __API__: true
  }
}
