module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "arrow-parens": 0,
    "generator-star-spacing": 0,
    "space-before-function-paren": 0,
    "spaced-comment": 0,
    "indent": 0,
    "no-tabs": 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
