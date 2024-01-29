const { AppsModel } = require("../../../../models")

module.exports = async (_, args, context) => {
    const { limit, page } = args
    const data = await AppsModel.find().skip((page - 1) * limit).limit(limit);
    console.log(data)
    return data
}