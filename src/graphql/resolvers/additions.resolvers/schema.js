const { Prefixer } = require('../../../utilities/formatters');
const {prefix} = require('./config')
const { gql } = require('apollo-server-express');

Prefixer.setPrefix(prefix);

const productsSchema = gql`
  type Query {
    ${Prefixer.addPrefix('GetAll')}(limit:Int,page: Int, title: String): [Addition],
    ${Prefixer.addPrefix('GetOne')}(_id:ID): Addition,
  }
  type Mutation {
    createAddition(title: String, icon: String) : Addition
    editAddition(title: String,description: String, icon: String, _id: ID) : Addition
    createAdditionOption(title: String, icon: String,price: Float, _id: ID) : Addition
  }
`;

module.exports = productsSchema;
