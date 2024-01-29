const { result } = require("lodash");
const { otpExpired, cdn } = require("../../../../config/constants");
const { OtpModel, UsersModel } = require("../../../../models");
const { OTP } = require("../../../../utilities/helpers");
const { hashPassword, jwtSign } = require("../../../../utilities/helpers/encryption");
const { ApolloError } = require("apollo-server-express");

module.exports = async (_, args, {app, user}) => {
    const userAccount = await UsersModel.findById(user._id);
    userAccount.deleted = true;
    try{
        userAccount.save();
        return {
            deleted: true
        }
    }catch(e){
      return new ApolloError("حدث خطأ أثناء حذف الحساب")  
    }
}