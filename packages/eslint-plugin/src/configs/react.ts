export = {
  extends: ['eslint:recommended', 'plugin:react/recommended', "plugin:react-hooks/recommended", 'prettier'],
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
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off'
  }
}
