const { OrdersModel, NotesModel } = require("../../../../models")

module.exports = async (_, args, context) => {
    const query = {};
    const {app, user} = context
    app ? query.app = app._id : null;
    const {limit, page} = args;

    const data = await NotesModel.find(query).select("text icon type ").skip((page - 1) * limit).limit(limit);
    return data
}