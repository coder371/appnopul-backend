const { ApolloError } = require("apollo-server-express");
const { AddressesModel, CouponsModel, UsedCouponModel } = require("../../../../models")

module.exports = async (_, args, { app, user }) => {
    const { code } = args;
    const coupon = await CouponsModel.findOne({ code: code })
    console.log("🚀 ~ file: getDiscount.js:14 ~ module.exports= ~ coupon:", coupon)
    if (!coupon) {
        return new ApolloError('كود غير صالح')
    }
    const itUsedCoupon = await UsedCouponModel.findOne({ coupon: coupon._id, user: user._id, app: app._id });
    if (!itUsedCoupon) {
        if (coupon) {
            return coupon
        } else {
            return new ApolloError('كود غير صالح')
        }
    } else {
        return new ApolloError('لقد قمت بإستخدام هذا الكود من قبل')
    }
}