"use strict";
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    plugins: ['prettier'],
    rules: {
        '@typescript-eslint/no-var-requires': 'off'
    }
};
