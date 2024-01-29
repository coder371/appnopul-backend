const { ApolloError } = require("apollo-server-express");
const { CategoriesModel } = require("../../../../models");

module.exports = async (_, args, { user, app }) => {
  const { title, description, icon, _id } = args;
  console.log("🚀 ~ file: editCategory.js:6 ~ module.exports= ~ args:", args)

  if (!title || !icon || !_id) {
    throw new ApolloError("يجب توفير جميع الحقول الإلزامية لتعديل القسم", "BAD_REQUEST");
  }

  try {
    const Category = await CategoriesModel.findById(_id);
    if (!Category) {
      throw new ApolloError("القسم المطلوب غير موجود", "NOT_FOUND");
    }

    Category.title = title;
    Category.description = description ?? "";
    Category.icon = icon;

    await Category.save();

    return Category;
  } catch (err) {
    console.log("🚀 ~ file: editCategory.js:26 ~ module.exports= ~ err:", err)
    throw new ApolloError("حدث خطأ أثناء تعديل القسم", "INTERNAL_SERVER_ERROR");
  }
};
