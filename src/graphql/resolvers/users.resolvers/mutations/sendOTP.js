const { ApolloError } = require("apollo-server-express");
const { otpExpired } = require("../../../../config/constants");
const { OtpModel } = require("../../../../models");
const { OTP } = require("../../../../utilities/helpers")

module.exports = async (_, args, {app : {name, _id}}) => {
    const {phone} = args;
    const lastOTPCODE = await OtpModel.findOne({phone: phone, app: _id});
    console.log("🚀 ~ file: sendOTP.js:8 ~ module.exports= ~ lastOTPCODE:", lastOTPCODE)
    if(lastOTPCODE){
        return await OTP.sendSMS({phone,code: lastOTPCODE.code, sender: name}).then(() => {
            return {
                _id: lastOTPCODE._id,
                code: lastOTPCODE.code,
                phone,
                expiredAfter: otpExpired,
            }
        }).catch((err) => {
            console.log("🚀 ~ file: sendOTP.js:19 ~ awaitOTP.sendSMS ~ err:", err)
            return new ApolloError('حدث خطأ أثناء ارسال رمز المصادقة حاول في وقت لاحق')
        })
    }else{
        const code = OTP.OTPGenerate(6);
        return OTP.sendSMS({phone,code, sender: name}).then(async (response) => {
            console.log("🚀 ~ file: sendOTP.js:9 ~ OTP.sendSMS ~ response:", response)
            const OtpModelResponse = await OtpModel.create({phone, code, app : _id});
            console.log("🚀 ~ file: sendOTP.js:27 ~ OTP.sendSMS ~ OtpModelResponse:", OtpModelResponse)
            return {
                _id: OtpModelResponse._id,
                code,
                phone,
                expiredAfter: otpExpired,
            }
        }).catch((err) => {
            console.log("🚀 ~ file: sendOTP.js:18 ~ OTP.sendSMS ~ err:", err)
            return new ApolloError('حدث خطأ أثناء ارسال رمز المصادقة حاول في وقت لاحق')
        })
    }


}