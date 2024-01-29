
const { ApolloError } = require("apollo-server-express");
const { OrdersModel, UsersModel } = require("../../../../models");
const { orderStatus } = require("../../../../config/constants");
const { pushNotficationWithToken } = require("../../../../services/fcm");

module.exports = async (_, args, {app, user, pubsub}) => {
    const {_id} = args;
    const order = await OrdersModel.findOne({_id: _id,app: app._id,}).select({_id: 1, user: 1, code: 1})
    if(order){
        // order.status = orderStatus.REJECTED;
        return order.save().then(async (result) => {
            const data = {_id: order._id,status: orderStatus.REJECTED}
            pubsub.publish("ORDER_STATUS", {orderStatus:data})
            const user = await UsersModel.findById(order.user).select({fcmToken: 1})
            pushNotficationWithToken({
                app,
                title:  "تم رفض طلبك ❌",
                body: `تم رفض الطلب : #${order.code}`,
                token: user.fcmToken,
                data: {
                    type: 'ORDER',
                    _id: order._id.toString(),
                }
            })
            return data;
        }).catch((err) => {
            console.log("🚀 ~ file: rejectOrder.js:25 ~ returnorder.save ~ err:", err)
            return new ApolloError('حدث خطأ')
        })
    } else {
    }
 
}