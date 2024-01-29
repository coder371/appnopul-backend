const { USERS_ROLES } = require("../../../../config/constants");
const { UsersModel } = require("../../../../models");
const { countByDays, countBetweenDays } = require("../../../../utilities/database/analysis");
const { rateOfChange } = require("../../../../utilities/helpers/math");

module.exports = async (_, args, { app }) => {
    const { daysCount } = args;
    const query = {
        role: USERS_ROLES.USER,
    };

    const usersCount = await countByDays({ daysCount, app, model: UsersModel, query });
    const usersCountSameDuration = await countBetweenDays({ startDays: daysCount, daysCount: daysCount, query, app, model: UsersModel });
    const changeRate = rateOfChange(usersCount, usersCountSameDuration )
    return {
        count: usersCount,
        sameDuration: usersCountSameDuration,
        changeRate,
    };
};
