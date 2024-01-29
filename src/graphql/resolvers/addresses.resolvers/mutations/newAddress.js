const { ApolloError } = require("apollo-server-express");
const { otpExpired, CRUDStatus } = require("../../../../config/constants");
const { OtpModel, AddressesModel } = require("../../../../models");
const { OTP } = require("../../../../utilities/helpers")

module.exports = async (_, args, {app,user}) => {
    const {title, details, location} = args;
    if(!title){
        return new ApolloError("يجب كتابة العنوان")
    }
    if(!details){
        return new ApolloError("يجب كتابة وصف العنوان")
    }
    if(!location){
        return new ApolloError("يجب تحديد الموقع")
    }
    const haveAnyAddress =  (await AddressesModel.find({user: user._id, status: CRUDStatus.AVAILABLE})).length;
    console.log({title, details, location:{...location, type: 'Point'}});
    const result = await AddressesModel.create({title, details, location:{...location, type: 'Point'}, app:app._id, user:user._id, isDefault: haveAnyAddress ? false : true});
    return result
}