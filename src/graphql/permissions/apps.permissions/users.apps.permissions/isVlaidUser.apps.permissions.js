const { ApolloError } = require("apollo-server-express");
const { rule } = require("graphql-shield")
module.exports = rule()(async (parent, args, ctx, info) => {
    const {user} = ctx;
    if(!user){
      return new ApolloError("مستخدم غير مصرح به");
    }else{
      return true;
    }
  })