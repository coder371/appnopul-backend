const { ApolloError } = require("apollo-server-express");
const { AddressesModel, BranchModel } = require("../../../../models");
const { locations } = require("../../../../utilities/helpers");

module.exports = async (_, args, {app,user}) => {
    const {delivery} = app;
    const {_id} = args;
    const address =  await AddressesModel.findOne({_id});
    if(address){
        const nearestBranch = await BranchModel.findOne({
            location: {
                $near: {
                    $geometry: address.location,
                    $maxDistance: delivery.maxDistance * 1000,
                },
            },
        }).select({_id:1,title:1,location:1, address:1});
        if(nearestBranch){
            const distance = locations.distance({origin: nearestBranch.location.coordinates, location:address.location.coordinates})
            var cost;
            var highestDistance = Math.max(...delivery.pricing.map((item) => item.distance));
            if(distance < highestDistance){
                for (const price of delivery.pricing) {
                    if (distance <= price.distance) {
                      cost = price.price;
                      break;
                    }
                }
            }else {
                cost = distance * delivery.kilometerPrice;
            }
            return {
                cost,
                distance,
                address: _id,
                delivery: true,
                nearestBranch,
            }
        }else {
            return new ApolloError('لا يوجد دعم لهذا المكان')
        }
    }else{
        return new ApolloError('حدث خطأ اثناء التعرف على العنوان')

    }

}