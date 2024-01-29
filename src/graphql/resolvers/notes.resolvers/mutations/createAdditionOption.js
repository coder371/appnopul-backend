const { ApolloError } = require("apollo-server-express");
const { otpExpired } = require("../../../../config/constants");
const { OtpModel, AdditionsModel,  } = require("../../../../models");
const { OTP } = require("../../../../utilities/helpers")

module.exports = async (_, args, {app,user}) => {
    const {title, price, icon, addition} = args;
    const AdditionData = await AdditionsModel.findById(addition)
    AdditionData.options.push({
        title,
        price,
        icon,
    })
    return AdditionData.save().then((res) => {

        return res;
    })
}