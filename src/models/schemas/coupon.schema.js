const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    target: {
        type: String,
        required: true,
        enum: ['ORDER', 'PRODUCTS', 'DELIVERY'],
    },
    order: {
        type: {
            couponType: {
                type: String,
                required: false,
                enum: ['PERCENTAGE', 'FIXED'],
            },
            percentage: {
                type: Number,
                required: false,
            },
            fixed: {
                type: Number,
                required: false,
            },
        }
    },
    delivery: {
        type: {
            couponType: {
                type: String,
                required: false,
                enum: ['PERCENTAGE', 'FIXED'],
            },
            percentage: {
                type: Number,
                required: false,
            },
            fixed: {
                type: Number,
                required: false,
            },
        },
        
    },
    products: {
        type: [{
            couponType: {
                type: String,
                required: false,
                enum: ['PERCENTAGE', 'FIXED'],
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                required: false,
            },
            percentage: {
                type: Number,
                default: 0,
            },
            fixed: {
                type: Number,
                default: 0,
            },
        }],
    },
    expiryDate: {
        type: Date,
        required: false,
        default: null,
    },
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            default: null,
            required: true
    },
    profit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profits",
        default: null,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = CouponSchema;
