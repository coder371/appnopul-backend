const { Prefixer } = require('../../../utilities/formatters');
const {prefix} = require('./config')
const { gql } = require('apollo-server-express');

Prefixer.setPrefix(prefix);

const productsSchema = gql`
  type Query {
    ${Prefixer.addPrefix('GetAll')}(limit:Int,page: Int, title: String): [Category],
    ${Prefixer.addPrefix('GetOne')}(id:String): Category,
  }
  type Mutation {
    createCategory(title:String,description:String,icon:String) : Category
    editCategory(_id:ID,title:String,description:String,icon:String) : Category
  }
`;

module.exports = productsSchema;
