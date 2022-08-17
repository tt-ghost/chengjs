module.exports = {
  extends: ['standard', 'standard-with-typescript', 'prettier'],
  "rules": {},
  "parser": "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './packages/**/tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier']
}