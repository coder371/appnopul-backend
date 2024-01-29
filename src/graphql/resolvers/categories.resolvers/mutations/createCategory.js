const { CategoriesModel } = require("../../../../models")

module.exports = async (_,args,{user,app}) => {
    console.log("🚀 ~ file: createCategory.js:2 ~ args,{user,app}:", args,{user,app})
    const {title,description,icon} = args
    const Category = await CategoriesModel.create({
        title: title,
        description: description,
        icon: icon,
        app: app._id,
        user: user._id
    })
    console.log("🚀 ~ file: createCategory.js:13 ~ module.exports= ~ Category:", Category)
    return Category
}