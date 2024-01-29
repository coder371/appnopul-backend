const { ApolloError } = require("apollo-server-express");
const { AdditionsModel } = require("../../../../models");

module.exports = async (_, args, { app, user }) => {
  const { title, price, icon, _id } = args;

  try {
    const AdditionData = await AdditionsModel.findById(_id);

    if (!AdditionData) {
      throw new ApolloError("البيانات غير موجودة", "NOT_FOUND");
    }

    AdditionData.options.push({
      title,
      price,
      icon,
    });

    const savedData = await AdditionData.save();
    return savedData;
  } catch (error) {
    console.log("🚀 ~ file: createAdditionOption.js:23 ~ module.exports= ~ error:", error)
    throw new ApolloError("حدث خطأ أثناء معالجة البيانات", "DATA_ERROR");
  }
};
