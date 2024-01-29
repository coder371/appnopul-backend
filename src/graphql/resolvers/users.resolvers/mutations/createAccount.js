const { result } = require("lodash");
const { otpExpired, cdn } = require("../../../../config/constants");
const { OtpModel, UsersModel } = require("../../../../models");
const { OTP } = require("../../../../utilities/helpers");
const { hashPassword, jwtSign } = require("../../../../utilities/helpers/encryption");

module.exports = async (_, {fullname, phoneNumber, password, fcmToken} , {app}) => {
    
    const userExist = await UsersModel.findOne({phoneNumber, app: app._id});
    const hashedPassword = await hashPassword(password);
    if(!userExist){
        return UsersModel.create({fullname, phoneNumber, fcmToken, password: hashedPassword, app: app._id}).then((result) =>{
            console.log("🚀 ~ file: createAccount.js:17 ~ UsersModel.create ~ result:", result)
            const userData = { 
                fullname: result.fullname,
                avatarUrl: cdn + "/o/100/" + result.avatar,
                phoneNumber: result.phoneNumber,
                admin: result.admin,
                _id: result._id,
            }
            return {
                ...userData,
                token: jwtSign(userData),
            };
        }).catch((error) => {
            console.log("🚀 ~ file: createAccount.js:22 ~ UsersModel.create ~ error:", error)
        })
    }
}