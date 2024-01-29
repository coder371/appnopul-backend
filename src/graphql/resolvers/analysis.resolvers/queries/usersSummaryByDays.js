const { USERS_ROLES } = require("../../../../config/constants");
const { UsersModel } = require("../../../../models");
const { summaryByDays } = require("../../../../utilities/database/analysis");

module.exports = async (_, args, { app }) => {
    const { daysCount } = args;
    const query = {
        role: USERS_ROLES.USER,
    }
    return await summaryByDays({daysCount,model: UsersModel, query, app})
}
