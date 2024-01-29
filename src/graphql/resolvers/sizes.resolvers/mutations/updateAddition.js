const { ApolloError } = require("apollo-server-express");
const { otpExpired } = require("../../../../config/constants");
const { OtpModel, AdditionsModel,  } = require("../../../../models");
const { OTP } = require("../../../../utilities/helpers")

module.exports = async (_, args, {app,user}) => {
    const {title, icon, _id} = args;
    console.log("🚀 ~ file: updateAddition.js:8 ~ module.exports= ~ args:", args)
    const addition = await AdditionsModel.findById(_id);
    if(addition){
        if(title){
            addition.title = title
        }
        if(icon){
            addition.icon = icon
        }
        return addition.save().then((res) => {
            console.log("🚀 ~ file: updateAddition.js:18 ~ addition.save ~ res:", res)
            return res;
        }).catch((err) => {
            return new ApolloError("حدث خطأ اثناء الحفظ")
        });
    }else{
        return new ApolloError("لم يتم العثور على العنصر")
    }
}