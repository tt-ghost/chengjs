export = {
  root: true,
  env: {
    jest: true,
    node: true,
    browser: true
  },
  extends: ['plugin:vue/vue3-essential', 'plugin:vue/vue3-recommended', 'prettier'],
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
  plugins: ['prettier'],
  rules: {
    "vue/multi-word-component-names": "off"
  }
}
