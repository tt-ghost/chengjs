"use strict";
module.exports = {
    extends: ['eslint:all', 'plugin:react/all', 'prettier'],
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
    plugins: ['react', 'react-hooks'],
    rules: {
        'react/react-in-jsx-scope': 'off'
    }
};
