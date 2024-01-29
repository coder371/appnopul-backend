const { withFilter } = require('graphql-subscriptions');
module.exports = {
    subscribe: withFilter(
        (payload, variables, {pubsub,app,user}) => {
            return pubsub.asyncIterator('NEW_ORDER')
        },
        (payload, {}, {pubsub,app,user}) => {
            return app._id.toString() === payload.newOrder.app._id.toString();
        }
    )
}