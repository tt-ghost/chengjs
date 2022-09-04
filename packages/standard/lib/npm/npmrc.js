const utils = require('../utils');
module.exports = {
    npmrc: () => utils.writeFile('.npmrc')
};
