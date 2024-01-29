const { Prefixer } = require('../../../../utilities/formatters');
const {prefix} = require('../config');
Prefixer.setPrefix(prefix);

module.exports = {
    [Prefixer.addPrefix('UsersCountByDays')]: require('./usersCountByDays'),
    [Prefixer.addPrefix('OrdersCountByDays')]: require('./ordersCountByDays'),
    [Prefixer.addPrefix('UsersSummaryByDays')]: require('./usersSummaryByDays'),
    [Prefixer.addPrefix('OrdersSummaryByDays')]: require('./ordersSummaryByDays'),
}