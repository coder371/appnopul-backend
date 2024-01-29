const { Prefixer } = require('../../../../utilities/formatters');
const {prefix} = require('../config');
Prefixer.setPrefix(prefix);

module.exports = {
    [Prefixer.addPrefix('GetAll')]: require('./getAll'),
}