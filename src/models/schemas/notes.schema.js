
const mongoose = require('mongoose');
const { cdn, CRUDStatus } = require('../../config/constants');
const additionOptionsSchema = require('./additionOptions.schema');




const notesSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['WARNING', 'PRIMARY', 'DANGER', 'SUCCESS'],
      default: 'WARNING',
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
  },
  {
    timestamps: true
  }
);

notesSchema.virtual('iconUrl').get(function() {
  return cdn + '/o/100/' + this.icon
});

module.exports = notesSchema;
