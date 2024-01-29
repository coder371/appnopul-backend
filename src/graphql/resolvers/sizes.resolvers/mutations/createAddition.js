const { otpExpired } = require("../../../../config/constants");
const { OtpModel, AdditionsModel,  } = require("../../../../models");
const { OTP } = require("../../../../utilities/helpers")

module.exports = async (_, args, {app,user}) => {
    const {title, icon} = args;
    return await AdditionsModel.create({title, icon, app:app._id});
}