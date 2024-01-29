const { ApolloError } = require("apollo-server-express");
const { otpExpired } = require("../../../../config/constants");
const { OtpModel, AddressesModel, AdvertisementsModel } = require("../../../../models");
const { OTP } = require("../../../../utilities/helpers")

module.exports = async (_, args, {app,user}) => {
    const {title, description, image, target, source} = args;
    console.log("🚀 ~ file: createSliderImage.js:8 ~ module.exports= ~ args:", args)
    if(!title){
        return new ApolloError("يجب كتابة العنوان")
    }
    // if(!description){
    //     return new ApolloError("يجب كتابة وصف العنوان")
    // }
    if(!image){
        return new ApolloError("يجب اختبار صورة للاعلان")
    }
    const result = await AdvertisementsModel.create({title, description, image, target, source, app:app._id});
    return result
}