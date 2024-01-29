const { CategoriesModel } = require("../../../../models")

module.exports = async (_, args, context) => {
    const {app} = context
    const {id} = args
    const data = await CategoriesModel.findById(id).where('app').equals(app._id)
    return data
}