const { and } = require('graphql-shield');
const { prefix } = require('./config');
const { Prefixer } = require('../../../utilities/formatters');
const { appsPermissions: { settings: { isExistApp }, users: { isVlaidUser } } } = require('../../permissions/index')
Prefixer.setPrefix(prefix);
module.exports ={
    Query: {
        [Prefixer.addPrefix('GetAll')]: and(isExistApp),
        [Prefixer.addPrefix('GetOne')]: and(isExistApp),
    },
    Mutation: {
        createCategory: and(isExistApp, isVlaidUser),
    },
};
