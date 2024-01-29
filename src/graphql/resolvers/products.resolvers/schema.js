const { Prefixer } = require('../../../utilities/formatters');
const { prefix } = require('./config')
const { gql } = require('apollo-server-express');

Prefixer.setPrefix(prefix);

const productsSchema = gql`
  type Query {
    ${Prefixer.addPrefix('GetAll')}(limit:Int,page: Int,title: String, category: ID): [Product],
    ${Prefixer.addPrefix('GetOne')}(id: String): Product,
    ${Prefixer.addPrefix('GetByCategory')}(categoryId: String,limit:Int,page: Int): [Product],
  }
  type Mutation {
    createProduct(title: String!,description: String,color: String,images: [String]!,category: ID!,price:String,priceType:String,additions:[String]): JSON
    editProduct(_id: ID ,title: String,description: String,color: String,images: [String],category: ID,price:Float,priceType:String,additions:[String]): JSON
    deleteProduct(_id: ID!): JSON
    unavailableProduct(_id: ID!): JSON
    availableProduct(_id: ID!): JSON
  }
`;

module.exports = productsSchema;
