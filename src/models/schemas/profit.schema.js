const mongoose = require("mongoose");
const { cdn } = require("../../config/constants");

const ProfitSchema = new mongoose.Schema({
        app: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Apps"
        },
        icon: {
            type: String,
            required: true
        },
        points: {
            type: Number,
            require: true
        },
        profit:{
            type: Number,
            require: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    },
    {timestamps: true}
);

ProfitSchema.virtual('iconUrl').get(function() {
    return cdn + '/o/100/' + this.icon
});
  
module.exports = ProfitSchema