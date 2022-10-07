export = {
  root: true,
  env: {
    jest: true,
    node: true,
    browser: true
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    // parser: "@typescript-eslint/parser",
    parser: {
      // Script parser for `<script>`
      js: 'espree',

      // Script parser for `<script lang="ts">`
      ts: '@typescript-eslint/parser',

      // Script parser for vue directives (e.g. `v-if=` or `:attribute=`)
      // and vue interpolations (e.g. `{{variable}}`).
      // If not specified, the parser determined by `<script lang ="...">` is used.
      '<template>': 'espree'
    },
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
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {}
}
