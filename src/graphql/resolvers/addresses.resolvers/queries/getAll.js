const { CRUDStatus } = require("../../../../config/constants");
const { AddressesModel } = require("../../../../models")

module.exports = async (_, args, {app, user}) => {
    const query = {};
    app ? query.app = app._id : null;
    user ? query.user = user._id : null;
    const { limit, page } = args;
    console.log("🚀 ~ file: getAll.js:10 ~ module.exports= ~ CRUDStatus.AVAILABLE:", CRUDStatus.AVAILABLE)
    return await AddressesModel.find({...query, status: CRUDStatus.AVAILABLE}).skip((page - 1) * limit).limit(limit)
}