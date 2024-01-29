const mongoose = require('mongoose');
const { CRUDStatus } = require('../../config/constants');

const ProductSizeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    app: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Apps",
        required: true,
    },
    status: {
      type: String,
      required: true,
      default: CRUDStatus.UNAVAILABLE,
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
});

  
module.exports = ProductSizeSchema
