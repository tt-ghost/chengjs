export = {
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // 配置 jsx
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: false,
      jsx: true,
      tsx: true
    }
  },
  plugins: ['react-hooks'],
  rules: {
    'react/react-in-jsx-scope': 'off'
  }
}
