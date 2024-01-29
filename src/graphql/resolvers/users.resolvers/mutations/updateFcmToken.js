const { UsersModel } = require("../../../../models");
const { ApolloError } = require("apollo-server-express");

module.exports = async (_, args, {app, user}) => {
    const {fcmToken} = args
    const userData = await UsersModel.findOne({_id: user._id});
    userData.fcmToken = fcmToken;
    return userData.save().then(() => {
        return {
            message: 'success',
            status: 200,
        }
    }).catch(err => {
        console.log("🚀 ~ file: updateFcmToken.js:18 ~ returnuserData.save ~ err:", err)
        return ApolloError('حدث خطأ  اثناء تحديث رمز الاشعارات')
    });
}