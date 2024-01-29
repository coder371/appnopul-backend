const { cdn } = require("../../../../config/constants")
const { OrdersModel } = require("../../../../models")

module.exports = async (_, {limit, page, status, code}, {app, user}) => {
    const query = {};
    app ? query.app = app._id : null;
    status ? query.status = status : null;
    code ? query.code = code : null;
    console.log("🚀 ~ file: getAllForAdmins.js:8 ~ module.exports= ~ query:", query)

    const data = await OrdersModel.find(query)
    .select("code items.size items.total items.quantity delivery.cost discount.cost productsCost total status createdAt updatedAt")
    .populate('items.product', 'title images ') 
    .populate('delivery.address', 'title ')
    .populate('user','fullname avatar phoneNumber')
    .populate('items.additions', "title")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: 1 })
    .lean();
    data.forEach(item => {
        item.user.avatarUrl = cdn + '/o/100/' + item.user.avatar
    });
    // data.items.forEach(item => {
    //     item.product.mainImage = cdn + '/o/100/' + item.product.images[0];
    // });

    return data
}