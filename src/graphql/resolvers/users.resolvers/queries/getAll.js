const { ProductsModel } = require("../../../../models")

module.exports = async (_, args, context) => {
    const query = {};

    const {app} = context
    app ? query.app = app._id : null;
    
    const { limit, page , title, category} = args;
    title ? query.title = { $regex: title, $options: 'i' } : null;
    category ? query.category = category : null;
    const data = await ProductsModel.find(query).populate('category').skip((page - 1) * limit).limit(limit)
    console.log(data)
    console.log("🚀 ~ file: getAll.js:11 ~ module.exports= ~ data:")
    return data
}