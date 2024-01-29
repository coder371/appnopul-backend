const { productSizeModel } = require("../../../../models");
const ProductSizeSchema = require("../../../../models/schemas/product.size.schema");

module.exports = async (_, args, context) => {
    const query = {};
    const {app, user} = context
    app ? query.app = app._id : null;
    const {limit, page} = args;

    const data = await productSizeModel.find(query).select("title ").skip((page - 1) * limit).limit(limit);
    return data
}