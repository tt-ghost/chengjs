const utils = require('../utils');
module.exports = {
    gitignore: () => utils.writeFile('.gitignore')
};
