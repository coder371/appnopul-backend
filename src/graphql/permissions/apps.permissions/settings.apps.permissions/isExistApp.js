const { ApolloError } = require("apollo-server-express");
const { rule } = require("graphql-shield")
module.exports = rule()(async (parent, args, ctx, info) => {
  const {app} = ctx;
    if(!app){
      return new ApolloError("تطبيق غير مصرح به");
    }
    return true;
  })