const { ApolloError } = require("apollo-server-express");
const { AddressesModel } = require("../../../../models");

module.exports = async (_, args, { app, user }) => {
  const appAndUserQuery = { user: user._id, app: app._id };
  const { _id } = args;

  try {
    // تحديث جميع العناوين الافتراضية للمستخدم في التطبيق إلى "false"
    await AddressesModel.updateMany({ isDefault: true, ...appAndUserQuery }, { isDefault: false });

    // تحديث العنوان المحدد إلى "isDefault: true"
    await AddressesModel.updateOne({ _id, ...appAndUserQuery }, { isDefault: true });
    const result = await AddressesModel.findOne({_id})
    console.log("🚀 ~ file: setAddressDefault.js:14 ~ module.exports= ~ result:", result)
    return result;
  } catch (err) {
    console.error("حدث خطأ:", err);
    throw new ApolloError("حدث خطأ أثناء التحديث.");
  }
};
