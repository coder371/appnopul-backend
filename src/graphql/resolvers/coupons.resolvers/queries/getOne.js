const { AddressesModel, CouponsModel } = require("../../../../models")

module.exports = async (_, args, {app, user}) => {

    const query = {};
    app ? query.app = app._id : null;
    user ? query.user = user._id : null;
    
    const { code } = args;
    const coupon = await CouponsModel.findOne({ code: code})
    console.log("🚀 ~ file: getOne.js:11 ~ module.exports= ~ coupon:", {...query, code: code})
    return coupon
}