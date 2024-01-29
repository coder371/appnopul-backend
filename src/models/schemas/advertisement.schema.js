const mongoose = require('mongoose');
const { cdn, CRUDStatus } = require('../../config/constants');

const AdvertisementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
      default: null,
    },
    image: {
      type: String,
      required: true
    },
    target: {
      type: String,
      enum: ['SCREEN', 'URL'],
      required: true,
    },
    source: {
      type: String,
      default: null
    },
    data: {
      type: String,
      default: null
    },
    status: {
      type: String,
      required: true,
      default: CRUDStatus.AVAILABLE,
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
  },
  {
    timestamps: true
  }
);

AdvertisementSchema.virtual('imageUrl').get(function() {
  return cdn + '/o/100/' + this.image
});
module.exports = AdvertisementSchema;
