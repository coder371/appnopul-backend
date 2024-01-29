
const mongoose = require('mongoose');
const { cdn, CRUDStatus } = require('../../config/constants');


const additionOptionsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      default: CRUDStatus.AVAILABLE
    }
  }
);

additionOptionsSchema.virtual('iconUrl').get(function() {
  return cdn + '/o/100/' + this.icon;
});


module.exports = additionOptionsSchema;
