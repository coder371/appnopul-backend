const { ApolloError } = require("apollo-server-express");
const { UsersModel, AddressesModel, AppsModel } = require("../../../../models");
const { hashPassword, jwtSign } = require("../../../../utilities/helpers/encryption");

module.exports = async (_, {phoneNumber, password}, context) => {

    const hashedPassword = await hashPassword(password);
    console.log({phoneNumber, hashedPassword});   
    const result = await UsersModel.findOne({phoneNumber,password: hashedPassword,admin: true});
    if(result){
        if(result.deleted === false) {
            const userData = { 
                fullname: result.fullname,
                avatarUrl: result.avatarUrl,
                phoneNumber: result.phoneNumber,
                admin: result.admin,
                _id: result._id,
            }
            return {
                ...userData,
                token: jwtSign(userData),
                app: (await AppsModel.findById(result.app)).secretKey,
            };
        }else{
            return new ApolloError("تم حذف هذا الحساب من قبل مالكه", "AUTH", { statusCode: 501 });
        }
    }else {
        return new ApolloError("خطأ في رقم الهاتف او كلمة المرور", "AUTH", { statusCode: 501 });
    }
        


}