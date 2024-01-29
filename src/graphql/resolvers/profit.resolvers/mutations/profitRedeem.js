const { default: mongoose } = require("mongoose");
const { otpExpired } = require("../../../../config/constants");
const { OtpModel, AddressesModel, ProfitModel, PointsModel, CouponsModel, UsedProfitModel } = require("../../../../models");
const { OTP } = require("../../../../utilities/helpers");
const { ApolloError } = require("apollo-server-express");
const { generateUniqueCode } = require("../../../../utilities/helpers/generator");

module.exports = async (_, args, { app, user }) => {
  const { _id } = args;
  const profit = await ProfitModel.findById(_id);
  const ifUsedProfit = await UsedProfitModel.findOne({ user: user._id, profit: profit._id, app: app._id });
  if (!ifUsedProfit) {
    await PointsModel.create({
      user: user._id,
      app: app._id,
      points: 50,
    })

    const totalPoints = (await PointsModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(user._id),
        },
      },
      {
        $group: {
          _id: null,
          totalPoints: {
            $sum: "$points",
          },
        },
      },
    ]).exec())[0].totalPoints;

    const code = await generateUniqueCode(8, CouponsModel)

    if (totalPoints >= profit.points) {
      return CouponsModel.create({
        code: code,
        target: 'ORDER',
        order: {
          couponType: 'FIXED',
          fixed: profit.profit,
        },
        profit: profit._id,
        user: user._id,
      }).then(() => {
        UsedProfitModel.create({
          user: user._id,
          profit: profit._id,
          app: app._id,
          profit: profit._id
        })
        return {
          coupon: code,
        }
      }).catch((err) => {
        return new ApolloError('حدث خطأ اثناء استلام الجائزة')
      })

    } else {
      return new ApolloError('النقاط غير كافية')
    }

  } else {
    return new ApolloError('تم استخدام الجائزة من قبل')
  }

}