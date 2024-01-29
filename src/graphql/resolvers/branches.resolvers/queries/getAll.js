const { BranchModel } = require("../../../../models")

module.exports = async (_, args, context) => {
    const query = {};

    const {app} = context
    app ? query.app = app._id : null;
    const { limit, page } = args

    const data = await BranchModel.find(query).skip((page - 1) * limit).limit(limit)
    return data
}