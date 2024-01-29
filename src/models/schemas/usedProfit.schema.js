const mongoose = require("mongoose");
const { cdn } = require("../../config/constants");

const usedProfitSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        app: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Apps"
        },
        profit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profits"
        },
        usedAt: {
            type: Date,
            default: Date.now
        },
    },
    {timestamps: true}
);

module.exports = usedProfitSchema