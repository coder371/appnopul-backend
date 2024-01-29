const mongoose = require('mongoose');
const { AddressesModel, ProfitModel } = require("../../../../models");
const { cdn } = require('../../../../config/constants');

module.exports = async (_, args, {app, user}) => {
    const query = {};

    app ? query.app = app._id : null;
    
    const { limit, page } = args;
    const profitWithCoupon = await ProfitModel.aggregate([
        {
            $lookup: {
                from: 'coupons',
                let: {user: new mongoose.Types.ObjectId(user._id), profit: '$_id'},
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ['$profit', '$$profit'] },
                                    { $eq: ['$user', '$$user'] }
                                ]
                            }
                        }
                    }
                ],
                as: 'coupon'
            },
            
        },
        {
            $unwind: {
                path: '$coupon',
                includeArrayIndex: 'string',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
              points: 1,
              profit: 1,
              createdAt: 1,
              iconUrl: {
                $concat: [cdn, '/o/100/', '$icon'],
              },
              coupon: 1
            },
          },
    ]);
    console.log("🚀 ~ file: getAll.js:50 ~ module.exports= ~ profitWithCoupon:", profitWithCoupon)
    console.log("🚀 ~ file: getAll.js:29 ~ profitWithCoupon:", profitWithCoupon);
    return profitWithCoupon;
    // return await ProfitModel.find(query).skip((page - 1) * limit).limit(limit).sort({points: 1});
}