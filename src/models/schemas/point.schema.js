const mongoose = require("mongoose")

const PointSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    app: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Apps"
    },
    points: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
},
    {
        timestamps: true,
    });

module.exports = PointSchema