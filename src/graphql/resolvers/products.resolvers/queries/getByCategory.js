const { ProductsModel } = require("../../../../models");

module.exports = async (_, args, context) => {

    const query = {};

    const {app} = context
    app ? query.app = app._id : null;

    const { categoryId, limit, page } = args;
    
    categoryId ? query.category = categoryId : null;

    const data = await ProductsModel.find(query).skip((page - 1) * limit).limit(limit)
    return data;
};
