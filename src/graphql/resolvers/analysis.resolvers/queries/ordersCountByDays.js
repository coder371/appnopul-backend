const { USERS_ROLES } = require("../../../../config/constants");
const { OrdersModel } = require("../../../../models");
const { countByDays, countBetweenDays } = require("../../../../utilities/database/analysis");
const { rateOfChange } = require("../../../../utilities/helpers/math");

module.exports = async (_, args, {app}) => {
    const { daysCount } = args;

    const ordersCount = await countByDays({daysCount, app, model: OrdersModel})
    const ordersCountSameDuration = await countBetweenDays({startDays:daysCount, daysCount: daysCount , app, model: OrdersModel})
    const changeRate = rateOfChange(ordersCount, ordersCountSameDuration )

    return {
        count: ordersCount,
        sameDuration: ordersCountSameDuration,
        changeRate,
    }
}