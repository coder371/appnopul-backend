const { ProductsModel } = require("../../../../models")

module.exports = async (_, args, context) => {
    const query = {};

    const { app } = context;
    const { limit, page, title, category } = args;

    app ? query.app = app._id : null;
    title ? query.title = { $regex: title, $options: 'i' } : null;

    if (category) {
        query.category = category;
    }

    return data = await ProductsModel.find(query).populate('category').skip((page - 1) * limit).limit(limit);
}
