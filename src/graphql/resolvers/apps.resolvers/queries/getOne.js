const { AppsModel } = require("../../../../models")

module.exports = async (_, args, context) => {
    const {id} = args
    const data = await AppsModel.findById(id)
    return data
}