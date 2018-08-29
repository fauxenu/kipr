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
    webpack: {
      config: './webpack.config.js',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.vue']
      }
    }
  }
}
