const { Prefixer } = require('../../../utilities/formatters');
const {prefix} = require('./config')
const { gql } = require('apollo-server-express');

Prefixer.setPrefix(prefix);

const productsSchema = gql`
  type Query {
    ${Prefixer.addPrefix('GetAll')}(limit:Int,page: Int): JSON,
    ${Prefixer.addPrefix('GetOne')}(id: String): JSON,
    ${Prefixer.addPrefix('GetAllForAdmins')}(status:String,limit:Int,page: Int, code: String): JSON,
  }
  type Mutation {
    newOrder(data: JSON) : JSON,
    changeOrderStatus(_id: ID): String,
    acceptOrder(_id: ID): OrderStatus,
    inDeliveryOrder(_id: ID): OrderStatus,
    rejectOrder(_id: ID): OrderStatus,
    paidOrder(_id: ID): OrderStatus,
  }

  type Subscription{
    newOrder: JSON,
    orderStatus(_id: ID): OrderStatus
  }
  type Test {
      productsCost: Float,
      delivery: JSON
    }
  type OrderStatus {
      _id: ID,
      status: String
    }
`;

module.exports = productsSchema;
