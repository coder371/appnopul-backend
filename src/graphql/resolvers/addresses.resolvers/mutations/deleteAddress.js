const { ApolloError } = require("apollo-server-express");
const { CRUDStatus } = require("../../../../config/constants");
const { AddressesModel } = require("../../../../models");

module.exports = async (_, args, {app,user}) => {
    const {_id} = args;
    console.log("🚀 ~ file: deleteAddress.js:7 ~ module.exports= ~ _id:", _id)
    if(!_id){
        return new ApolloError("هل يمكن حذف هذا العنوان")
    }
    const address =  await AddressesModel.findById(_id);
    address.status = CRUDStatus.REMOVED;
    return address.save().then( async (result) => {
        var defaultAddress = {}
        if(result.isDefault){
            defaultAddress = await AddressesModel.findOne({status: CRUDStatus.AVAILABLE, user: user._id})
            if(defaultAddress){
                defaultAddress.isDefault = true;
                await defaultAddress.save();
            }
            
        }
        
        return defaultAddress
    }).catch((err) => {
        return new ApolloError("حدث خطأ اثناء حذف العنوان")
    });
}