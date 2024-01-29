
const { ApolloError } = require("apollo-server-express");
const { OrdersModel, UsersModel } = require("../../../../models");
const { orderStatus } = require("../../../../config/constants");
const { pushNotficationWithToken } = require("../../../../services/fcm");

module.exports = async (_, args, {app, user, pubsub}) => {
    const {_id} = args;
    console.log("🚀 ~ file: paidOrder.js:9 ~ module.exports= ~ args:", args)
    const order = await OrdersModel.findOne({_id: _id,app: app._id,}).select({_id: 1, user: 1, code: 1})
    if(order){
        order.status = orderStatus.PAID;
        return order.save().then(async (result) => {
            const data = {_id: order._id,status: orderStatus.REJECTED}
            pubsub.publish("ORDER_STATUS", {orderStatus:data})
            const user = await UsersModel.findById(order.user).select({fcmToken: 1})
            pushNotficationWithToken({
                app,
                title:  "تم تسليم طلبك بنجاح ",
                body: `تم تسليم الطلب : #${order.code} وتم اضافة ٢٥ نقطة لحسابك تحقق من هنا ٫٫٫`,
                token: user.fcmToken,
                imageUrl: 'https://cdn.appnobul.com/o/100/1694563570482-442391226-619245672.png',
                data: {
                    type: 'POINTS',
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