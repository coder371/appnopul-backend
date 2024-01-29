const { ApolloError } = require("apollo-server-express");
const { OrdersModel, UsedCouponModel, CouponsModel } = require("../../../../models");
const { generator } = require("../../../../utilities/helpers");
const { cdn } = require("../../../../config/constants");

module.exports = async (_, args, {app, user, pubsub}) => {
    const orderCode = await generator.generateUniqueCode(8, OrdersModel);
    const {cart, address, discount, productsCost, delivery} = args.data;
    const total = productsCost + Number(delivery?.cost) - (discount?.cost ?? 0);
    console.log("🚀 ~ file: newOrder.js:8 ~ module.exports= ~ delivery:", delivery)

    if(!delivery){
        return new ApolloError('موقعك الحالي غير صالح')
    }
    const items = cart.map((item) => {
        const additions = item.additions.map((addition) => addition)
        return {
            product: item.product._id,
            quantity: item.quantity,
            size: item.size ?? null,
            additions: additions,
            total: item.total,
            price: item.price ?? item.size.price,
    }});

    if(!user){
        return new ApolloError('قم بتسيجل الدخول مرة للتاكد من حماية معلومات الشخصية')
    }
    const newOrder = await OrdersModel.create({
        code: orderCode,
        user: user._id,
        app: app._id,
        branch: delivery.nearestBranch._id,
        items: items,
        productsCost,
        delivery: {...delivery,nearestBranch: {...delivery.nearestBranch, app: app._id, user: user._id},address: {...address, app: app._id, user: user._id}},
        discount,
        total
    })
    if(newOrder){
        if(discount){
            const coupon = await CouponsModel.findOne({code : discount.code}).select({_id: 1});
            if(coupon){
                UsedCouponModel.create({
                    user: user._id,
                    app: app._id,
                    coupon: coupon._id,
                })
            }
        }
    const orderId = newOrder._id.toString()
    const newOrderData = await OrdersModel.findById(orderId)
        .select("code items.size items.total items.quantity items.additions delivery.cost discount.cost productsCost total status createdAt updatedAt")
        .populate('items.product', 'title images ') 
        .populate('delivery.address', 'title ')
        .populate('user','fullname avatar phoneNumber')
        .populate('app','_id')
        .populate('items.additions')
        .lean();
        newOrderData.user.avatarUrl = cdn + '/o/100/' + newOrderData.user.avatar
    
        pubsub.publish("NEW_ORDER", {newOrder: newOrderData})
        return newOrder;
    } else {
        return new ApolloError('حدث خطأ')
    }
 
}