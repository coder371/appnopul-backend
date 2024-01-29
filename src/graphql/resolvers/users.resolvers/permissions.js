const { allow,deny,and } = require('graphql-shield');
const { prefix } = require('./config');
const { Prefixer } = require('../../../utilities/formatters');
const { appsPermissions: { settings: { isExistApp }, users: { isVlaidUser } } } = require('../../permissions/index')

Prefixer.setPrefix(prefix);
module.exports ={
    Query: {
        [Prefixer.addPrefix('GetAll')]: allow,
    },
    Mutation: {
        sendOTP: isExistApp,
        checkOTP: isExistApp,
        createAccount: isExistApp,
        deleteAccount: and(isExistApp, isVlaidUser),
        login : isExistApp,
        resetPassword: isExistApp,
        adminLogin: allow,
    }
};
