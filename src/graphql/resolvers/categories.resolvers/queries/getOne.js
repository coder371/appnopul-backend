const { CategoriesModel } = require("../../../../models")

module.exports = async (_, args, context) => {
    const {app} = context
    const {id} = args
    console.log("🚀 ~ file: getOne.js:6 ~ module.exports= ~ id:", id)
    const data = await CategoriesModel.findById(id)
    console.log("🚀 ~ file: getOne.js:7 ~ module.exports= ~ data:", data)
    return data
}