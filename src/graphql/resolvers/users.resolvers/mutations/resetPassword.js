const { result } = require("lodash");
const { otpExpired, cdn } = require("../../../../config/constants");
const { OtpModel, UsersModel } = require("../../../../models");
const { OTP } = require("../../../../utilities/helpers");
const { hashPassword, jwtSign } = require("../../../../utilities/helpers/encryption");
const { ApolloError } = require("apollo-server-express");

module.exports = async (_, args, {app}) => {
    const {password, phoneNumber} = args
    const userData = await UsersModel.findOne({app: app._id, phoneNumber: phoneNumber});
    userData.password = await hashPassword(password);
    const userDataUpdate = await userData.save();
    if(userDataUpdate){
        return {
            message: 'success',
            status: 200,
        }
    }
}