module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'

  }}