const { Prefixer } = require('../../../utilities/formatters');
const {prefix} = require('./config')
const { gql } = require('apollo-server-express');

Prefixer.setPrefix(prefix);

const productsSchema = gql`
  type Query {
    ${Prefixer.addPrefix('UsersCountByDays')}(daysCount: Int): JSON,
    ${Prefixer.addPrefix('OrdersCountByDays')}(daysCount: Int): JSON,
    ${Prefixer.addPrefix('UsersSummaryByDays')}(daysCount: Int): JSON,
    ${Prefixer.addPrefix('OrdersSummaryByDays')}(daysCount: Int): JSON,
  }
`;

module.exports = productsSchema;
