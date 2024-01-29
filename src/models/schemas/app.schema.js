const mongoose = require('mongoose');

const AppSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: null
    },
    delivery: {
        pricing : [{
            distance : {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            }
        }],
        kilometerPrice: {
            type: Number,
            required: true,
        }, 
        maxDistance: {
            type: Number,
            required: true,
        },
    },
    secretKey: {
        type: String,
        required: true,
    },
    fcmKey: {
        type: String,
        required: true,
    },
    serviceAccountKey: {
        type: String,
        required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    
});

module.exports = AppSchema;
