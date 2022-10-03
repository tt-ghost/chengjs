const fs = require('fs');
const files = [
    'editor/.editorconfig',
    'eslint/.eslintignore',
    'npm/.npmrc',
    'git/.gitignore',
    'prettier/.prettierignore'
];
const copyFile = file => new Promise((resolve, reject) => {
    fs.copyFile('src/' + file, 'lib/' + file, err => {
        if (err) {
            reject(err);
        }
        else {
            resolve();
        }
    });
});
Promise.all(files.map(copyFile));
