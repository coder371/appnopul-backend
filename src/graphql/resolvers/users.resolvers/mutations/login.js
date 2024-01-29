const { ApolloError } = require("apollo-server-express");
const { UsersModel, AddressesModel } = require("../../../../models");
const { hashPassword, jwtSign } = require("../../../../utilities/helpers/encryption");

module.exports = async (_, {phoneNumber, password}, context) => {

    const hashedPassword = await hashPassword(password);
    console.log({phoneNumber, hashedPassword});   
    const result = await UsersModel.findOne({phoneNumber,password: hashedPassword})
    if(result){
        if(result.deleted === false) {
        var defaultAddress = {_id: null,title: null,details: null,coordinates: null, isDefault: null}
        defaultAddress =  await AddressesModel.findOne({user: result._id, isDefault: true});
        const userData = { 
            fullname: result.fullname,
            avatarUrl: result.avatarUrl,
            phoneNumber: result.phoneNumber,
            admin: result.admin,
            _id: result._id,
            defaultAddress,
        }
        return {
            ...userData,
            token: jwtSign(userData),
        };
    }else{
        return new ApolloError("تم حذف هذا الحساب من قبل مالكه", "AUTH", { statusCode: 501 });
    }
    }else {
        return new ApolloError("خطأ في رقم الهاتف او كلمة المرور", "AUTH", { statusCode: 501 });
    }
        


}