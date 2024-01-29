const { cdn } = require("../../../../config/constants")
const { OrdersModel } = require("../../../../models")

module.exports = async (_, {id}, context) => {
    const data = await OrdersModel.findById(id)
    .select("code items.size items.total items.price items.quantity items.additions delivery.cost discount.cost productsCost total status createdAt updatedAt")
    .populate('items.product', 'title images ') 
    .populate('delivery.address', 'title ')
    .lean();

    data.items.forEach(item => {
        item.product.mainImage = cdn + '/o/100/' + item.product.images[0];
    });

    return data
}