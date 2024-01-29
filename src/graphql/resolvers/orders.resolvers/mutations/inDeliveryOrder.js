
const { ApolloError } = require("apollo-server-express");
const { OrdersModel } = require("../../../../models");
const { orderStatus } = require("../../../../config/constants");
const { pushNotficationWithToken } = require("../../../../services/fcm");

module.exports = async (_, args, {app, user, pubsub}) => {
    const {_id} = args;
    const order = await OrdersModel.findOne({_id: _id,app: app._id,}).select({_id: 1,user: 1, code: 1})
    if(order){
        order.status = orderStatus.IN_DELIVERY;
        order.save().then((result) => {
            const data = {_id: order._id,status: orderStatus.IN_DELIVERY,}
            pubsub.publish("ORDER_STATUS", {orderStatus:data})
            pushNotficationWithToken({
                app,
                title: "الطلب في الطريق 🚀",
                body: `خرج الطلب الخاص بك : #${order.code}`,
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