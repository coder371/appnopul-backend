const { OrdersModel } = require("../../../../models")

module.exports = async (_, args, context) => {
    const query = {};
    const {app, user} = context
    app ? query.app = app._id : null;
    user ? query.user = user._id : null;
    const {limit, page} = args;
    const data = await OrdersModel.find(query)
    .select({code: 1, createdAt: 1, total: 1, productsCost: 1, status: 1, delivery: 1, discount:{code: 1,totalDiscount: 1}}).skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 })
    .populate('delivery.address', 'title')
    return data
}