const homedir = require('os').homedir();
const path = require('path');

module.exports = () => path.join(homedir, '.ccoin-profiles.json');
