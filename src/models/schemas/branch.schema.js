const mongoose = require('mongoose');

const BranchSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    address: {
        type: String,
        required: true
    },
    phoneNumbers: {
        type: [String],
        required: true
    },
    app: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Apps",
        required: true,
    },  
    createdAt: {
        type: Date,
        default: Date.now
    }
});

BranchSchema.index({ location: '2dsphere' });
module.exports = BranchSchema
