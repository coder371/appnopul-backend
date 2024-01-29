const { ApolloError } = require("apollo-server-express");
const { CategoriesModel, ProductsModel } = require("../../../../models");

module.exports = async (_, args, { user, app }) => {
    try {
        console.log("🚀 ~ file: createCategory.js:2 ~ args,{user,app}:", args);

        const { _id, title, description, color, images, category, additions, priceType, price, note } = args;

        const product = await ProductsModel.findById(_id);

        if (!product) {
            throw new ApolloError("المنتج غير موجود");
        }

        product.title = title;
        product.description = description;
        product.color = color;

        if (images) {
            product.images = images;
        }

        if (category) {
            product.category = category;
        } else {
            throw new ApolloError("يجب اختيار قسم");
        }

        product.additions = additions;
        product.priceType = priceType;
        product.price = price;
        product.note = note;

        const savedProduct = await product.save();

        console.log("تم حفظ التعديلات بنجاح.");

        return savedProduct;
    } catch (err) {
        console.error("حدث خطأ أثناء حفظ التعديلات:", err);
        throw new ApolloError("حدث خطأ أثناء حفظ التعديلات");
    }
};
