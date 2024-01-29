const mongoose = require('mongoose');
const { addressesStatus } = require('../../config/constants');

const AddressSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    details: {
      type: String,
      required: true,
      default: ''
    },
    location: {
      type: {
          type: String,
          enum: ['Point'],
          required: true
      },
      coordinates: {
          type: [Number],
          required: true
      }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
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
      default: addressesStatus.AVAILABLE
    },
    isDefault: {
      type: Boolean,
      default: false,
    },  
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = AddressSchema;
