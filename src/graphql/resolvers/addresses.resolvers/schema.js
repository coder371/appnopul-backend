const { Prefixer } = require('../../../utilities/formatters');
const {prefix} = require('./config')
const { gql } = require('apollo-server-express');

Prefixer.setPrefix(prefix);

const productsSchema = gql`
  type Query {
    ${Prefixer.addPrefix('GetAll')}(limit:Int,page: Int): [Address],
  }

  type Mutation {
    newAddress(title: String, details: String, location: JSON) : Address
    setDefaultAddress(_id: ID) : Address
    deliveryPricing(_id: ID) : DeliveryCost
    deleteAddress(_id: ID) : Address
  }
`;

module.exports = productsSchema;
