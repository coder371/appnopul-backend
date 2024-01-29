const { allow,and } = require('graphql-shield');
const { prefix } = require('./config');
const { Prefixer } = require('../../../utilities/formatters');
const { appsPermissions: { settings: { isExistApp }, users: { isVlaidUser } } } = require('../../permissions/index')

Prefixer.setPrefix(prefix);
module.exports ={
    Query: {
        [Prefixer.addPrefix('GetAll')]: and(isExistApp, isVlaidUser),
        [Prefixer.addPrefix('GetOne')]: and(isExistApp, isVlaidUser),
    },
    Mutation: {
        newOrder : and(isExistApp, isVlaidUser),
        changeOrderStatus: and(isExistApp, isVlaidUser),
    },
    Subscription: {
        newOrder: and(isExistApp, isVlaidUser),
        orderStatus: and(isExistApp, isVlaidUser),
    },
};
