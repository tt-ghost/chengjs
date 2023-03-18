module.exports = {
  extends: ['plugin:@chengjs/typescript'],
  env: {
    node: true,
    jest: true
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off'
  }
}
