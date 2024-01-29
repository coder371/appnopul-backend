const { ApolloError } = require("apollo-server-express")
const { OrdersModel, NotesModel } = require("../../../../models")
const { cdn } = require("../../../../config/constants")

module.exports = async (_, {_id}, context) => {
    try{
        const order = await OrdersModel.findOne({_id})
        .select("code items.size items.total items.price items.quantity delivery.cost discount.cost productsCost total status createdAt updatedAt")
        .populate('items.additions') 
        .populate('items.product', 'title images ') 
        .populate('delivery.address', 'location details title')
        .populate("user", "fullname phoneNumber avatar")
        .lean()
        order.user.avatarUrl = cdn + '/o/100/' + order.user.avatar
        order.items.forEach((item) => {
            item.product.mainImageUrl = cdn + '/o/100/' + item.product.images[0]
        })
        if(!order){
            return new ApolloError("لم يتم العثور على الطلب")
        }    
        return order
    }catch(err){
        return new ApolloError("لم يتم العثور على الطلب")
    }
}