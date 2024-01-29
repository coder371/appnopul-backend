const {AdditionsModel } = require("../../../../models")

module.exports = async (_, args, context) => {
    const { _id } = args;
    const data = await AdditionsModel.findById(_id);
    console.log("🚀 ~ file: getAll.js:11 ~ module.exports= ~ data:", data)
    return data
}