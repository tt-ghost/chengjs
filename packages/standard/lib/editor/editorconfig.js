const utils = require('../utils');
module.exports = {
    editorconfig: () => utils.writeFile('.editorconfig')
};
