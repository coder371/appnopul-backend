const { ApolloError } = require("apollo-server-express")
const { PRODUCTStatus } = require("../../../../config/constants")
const { CategoriesModel, ProductsModel } = require("../../../../models")

module.exports = async (_,args,{user,app}) => {
    const {_id} = args
    const product = await ProductsModel.findOne({_id,app:app._id})
    if(product){
        product.status = PRODUCTStatus.REMOVED;
        return product.save().then((result) => {
            return result
        }).catch((err) => {
            console.log("🚀 ~ file: deleteProduct.js:13 ~ returnproduct.save ~ err:", err)
            return new ApolloError("حدث خطأ اثناء حذف المنتج")
        })
    }else{
        return new ApolloError("لم نتمكن من العثور على المنتج")
    }
}