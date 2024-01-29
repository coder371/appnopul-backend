const { allow,deny } = require('graphql-shield');
const { prefix } = require('./config');
const { Prefixer } = require('../../../utilities/formatters');

Prefixer.setPrefix(prefix);
module.exports ={
    Query: {
        [Prefixer.addPrefix('GetAll')]: allow,
        [Prefixer.addPrefix('GetOne')]: allow,
    },
};
