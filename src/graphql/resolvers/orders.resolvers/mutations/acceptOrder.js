
const { ApolloError } = require("apollo-server-express");
const { OrdersModel, UsersModel } = require("../../../../models");
const { orderStatus } = require("../../../../config/constants");
const {pushNotficationWithToken} = require("../../../../services/fcm");
module.exports = async (_, args, {app, user, pubsub}) => {
    console.log("🚀 ~ file: acceptOrder.js:7 ~ module.exports= ~ app:", app)
    console.log("🚀 ~ file: acceptOrder.js:7 ~ module.exports= ~ app:", app['fcmKey'])
    const {_id} = args;
    const order = await OrdersModel.findOne({_id: _id,app: app._id,}).select({_id: 1,user: 1, code: 1})
    if(order){
        order.status = orderStatus.PREPARING;
        return order.save().then(async (result) => {
            const data = {_id: order._id,status: orderStatus.PREPARING}
            pubsub.publish("ORDER_STATUS", {orderStatus:data})
            const user = await UsersModel.findById(order.user).select({fcmToken: 1})
            pushNotficationWithToken({
                app,
                title: "تم قبول طلبك ✅",
                body: `يتم الان تجهيز طلبك : #${order.code}`,
                token: user.fcmToken,
                data: {
                    type: 'ORDER',
                    _id: order._id.toString(),
                }
            })
            return data;
        }).catch((err) => {
            return new ApolloError('حدث خطأ')
        })
    } else {
    }
 
}