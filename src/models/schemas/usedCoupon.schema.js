const mongoose = require("mongoose");
const { cdn } = require("../../config/constants");

const UsedCouponSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        app: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Apps"
        },
        coupon: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Coupons"
        },
        usedAt: {
            type: Date,
            default: Date.now
        },
    },
    {timestamps: true}
);

module.exports = UsedCouponSchema