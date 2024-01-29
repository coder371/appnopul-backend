const { Prefixer } = require('../../../utilities/formatters');
const {prefix} = require('./config')
const { gql } = require('apollo-server-express');

Prefixer.setPrefix(prefix);

const productsSchema = gql`
  type Query {
    ${Prefixer.addPrefix('GetAll')}(limit:Int,page: Int): [Advertisement],
  }
  type Mutation {
    pushNotification(title: String, body: String, image: String): JSON
    createSliderImage(title: String, description: String, image: String, target: String, source: String): JSON
  }
`;

module.exports = productsSchema;
