const { CategoriesModel, ProductsModel } = require("../../../../models")

module.exports = async (_,args,{user,app}) => {
    console.log("🚀 ~ file: createCategory.js:2 ~ args,{user,app}:", args)
    const {title, description, color, images, diabetics, category,additions, priceType, price} = args
    const product = await ProductsModel.create({
        title,
        description,
        color,
        images,
        diabetics,
        category,
        app:app._id,
        additions,
        priceType,
        price,
    })
    return product
}