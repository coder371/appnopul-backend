const { Prefixer } = require('../../../utilities/formatters');
const {prefix} = require('./config')
const { gql } = require('apollo-server-express');

Prefixer.setPrefix(prefix);

const productsSchema = gql`
  type Query {
    ${Prefixer.addPrefix('GetOne')}(code:String): Coupon,
  }
  type Mutation {
    getDiscount(code:String): Coupon,
  }
`;

module.exports = productsSchema;
