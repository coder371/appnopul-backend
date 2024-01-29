const { withFilter } = require('graphql-subscriptions');
const { generator } = require("../../../../utilities/helpers");

module.exports = {
    subscribe: withFilter(
        (payload, variables, {pubsub}) => pubsub.asyncIterator('ORDER_STATUS'),
        (payload, variables, context) => {
            return payload.orderStatus._id.toString() === variables._id
        }
    )
}