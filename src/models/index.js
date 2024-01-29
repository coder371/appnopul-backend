const { default: mongoose } = require("mongoose");
const {addresseSchema,AdvertisementSchema,AppSchema,categorieSchema,orderSchema,otpSchema,productSchema,userSchema,pointSchema, PolygonSchema, BranchSchema, additionsSchema, couponSchema, profitSchema, usedCouponSchema, usedProfitSchema, notesSchema, productSizeSchema} = require('./schemas');
module.exports = {
    AdditionsModel: mongoose.model('Additions', additionsSchema),
    AddressesModel: mongoose.model('Addresses', addresseSchema),
    AdvertisementsModel: mongoose.model('Advertisements', AdvertisementSchema),
    AppsModel: mongoose.model('Apps', AppSchema),
    BranchModel: mongoose.model('Branches', BranchSchema),
    CategoriesModel: mongoose.model('Categories', categorieSchema),
    CouponsModel: mongoose.model('Coupons', couponSchema),
    NotesModel: mongoose.model('Notes', notesSchema),
    OrdersModel: mongoose.model('Orders', orderSchema),
    OtpModel: mongoose.model('Otp', otpSchema),
    polygonModel: mongoose.model('Polygons', PolygonSchema),
    ProductsModel:  mongoose.model('Products', productSchema),
    productSizeModel:  mongoose.model('Sizes', productSizeSchema),
    ProfitModel:  mongoose.model('Profits', profitSchema),
    UsersModel: mongoose.model('Users', userSchema),
    PointsModel: mongoose.model('Points', pointSchema),
    UsedCouponModel: mongoose.model('UsedCoupons', usedCouponSchema),
    UsedProfitModel: mongoose.model('UsedProfits', usedProfitSchema),
}