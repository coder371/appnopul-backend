const Query = require('./queries')
const Mutation = require('./mutations')
const Subscription = require('./subscriptions')
const resolvers = {
    Mutation,
    Query,
    Subscription
};
module.exports = resolvers;