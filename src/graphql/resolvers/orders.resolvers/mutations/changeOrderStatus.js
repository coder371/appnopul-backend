const { ApolloError } = require("apollo-server-express");
const { OrdersModel } = require("../../../../models");
const { generator } = require("../../../../utilities/helpers");
const { orderStatus } = require("../../../../config/constants");

module.exports = async (_, args, {app, user, pubsub}) => {
    const {_id} = args;

    const order = await OrdersModel.findOne({
        _id: _id,
        user: user._id,
        app: app._id,
    }).select({_id: 1})
    console.log("🚀 ~ file: changeOrderStatus.js:13 ~ module.exports= ~ newOrder:", order)

    if(order){
        pubsub.publish("ORDER_STATUS", {
           orderStatus: {
            _id: order._id,
            status: orderStatus.DELIVERED,
           }
        })
        return "order Changed";
    } else {
        return new ApolloError('حدث خطأ')
    }
 
}