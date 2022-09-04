import typescript from './configs/typescript'
import vue from './configs/vue'
import react from './configs/react'
import reactAll from './configs/react-all'
import recommended from './configs/recommended'
import vue3Recommended from './configs/vue3-recommended'

export = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['standard'],
  // parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    // '@typescript-eslint'
  ],
  rules: {},
  configs: {
    typescript,
    vue,
    'vue3-recommended': vue3Recommended,
    react,
    'react-all': reactAll,
    recommended
  }
}
