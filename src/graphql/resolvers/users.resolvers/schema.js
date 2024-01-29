const { Prefixer } = require('../../../utilities/formatters');
const {prefix} = require('./config')
const { gql } = require('apollo-server-express');

Prefixer.setPrefix(prefix);

const productsSchema = gql`
  type Query {
    ${Prefixer.addPrefix('GetAll')}(limit:Int,page: Int,title: String, category: ID): [Product],
  }
  type Mutation {
    sendOTP(phone: String): JSON
    checkOTP(_id: String, code: String): checkOTP
    createAccount(fullname: String, password: String, phoneNumber: String, fcmToken: String): User
    deleteAccount: JSON
    login(phoneNumber: String, password: String) : User
    adminLogin(phoneNumber: String, password: String) : Admin
    resetPassword(password: String, phoneNumber: String): JSON
    updateFcmToken(fcmToken: String): JSON
  }
`;

module.exports = productsSchema;
