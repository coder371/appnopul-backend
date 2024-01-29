const { CategoriesModel } = require("../../../../models")

module.exports = async (_, { limit, page,title }, {app}) => {
    const query = {};
    app ? query.app = app._id : null;
    title ? query.title = { $regex: title, $options: 'i' } : null;
    const data = await CategoriesModel.find(query).skip((page - 1) * limit).limit(limit)
    return data
}