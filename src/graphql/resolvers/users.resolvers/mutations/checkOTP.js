const { result } = require("lodash");
const { otpExpired } = require("../../../../config/constants");
const { OtpModel } = require("../../../../models");
const { OTP } = require("../../../../utilities/helpers");
const { AppSchema } = require("../../../../models/schemas");
const { ApolloError } = require("apollo-server-express");

module.exports = async (_, {_id,code}, context) => {
    console.log("🚀 ~ file: checkOTP.js:7 ~ module.exports= ~ {_id,code}:", {_id,code})
    const finalResult = {};
    await OtpModel.findOne({_id,code}).then((result) => {

        if(result){
            return true;
        }else{
            return new ApolloError("رمز غير صالح")
        }
        
    }).catch((err) => {
        console.error(err, "err");
        return new ApolloError("رمز غير صالح")
    })

}