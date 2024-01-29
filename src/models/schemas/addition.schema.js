
const mongoose = require('mongoose');
const { cdn, CRUDStatus } = require('../../config/constants');
const additionOptionsSchema = require('./additionOptions.schema');




const additionsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false,
    },
    options: [additionOptionsSchema],
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
  },
  {
    timestamps: true
  }
);

additionsSchema.virtual('iconUrl').get(function() {
  return cdn + '/o/100/' + this.icon
});

module.exports = additionsSchema;
