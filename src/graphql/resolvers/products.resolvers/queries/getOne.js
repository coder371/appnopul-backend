const { ProductsModel, AdditionsModel } = require("../../../../models")

module.exports = async (_, args, context) => {

    const {app} = context
    const {id} = args
    const data = await ProductsModel.findById(id).where('app').equals(app._id).populate('category').populate('additions');
    // if(data.category){
    //     const additions = await AdditionsModel.find({category: data.category})
    //     data.additions = additions
    // }
    console.log("🚀 ~ file: getOne.js:8 ~ module.exports= ~ data:", data)
    return data
}