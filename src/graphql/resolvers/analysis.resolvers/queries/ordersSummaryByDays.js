const { OrdersModel } = require("../../../../models");
const { summaryByDays } = require("../../../../utilities/database/analysis");

module.exports = async (_, args, { app }) => {
    const { daysCount } = args;
    return await summaryByDays({daysCount,model: OrdersModel, app})
}
