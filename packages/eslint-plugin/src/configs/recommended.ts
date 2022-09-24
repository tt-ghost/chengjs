export = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:vue/recommended',
    'prettier'
  ],
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    '@typescript-eslint/no-var-requires': 'off'
  }
}
