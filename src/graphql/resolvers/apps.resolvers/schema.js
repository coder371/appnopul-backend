const { Prefixer } = require('../../../utilities/formatters');
const {prefix} = require('./config')
const { gql } = require('apollo-server-express');

Prefixer.setPrefix(prefix);

const productsSchema = gql`
  type Query {
    ${Prefixer.addPrefix('GetAll')}(limit:Int,page: Int): [appResult],
    ${Prefixer.addPrefix('GetOne')}(id: String): appResult,
  }
  type Mutation {
    hello : String
  }
`;

module.exports = productsSchema;
