const mongoose = require('mongoose');
const { categoryStatus, cdn } = require('../../config/constants');

const categorySchema = new mongoose.Schema({
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
    default: null
  },
  status: {
    type: String,
    default: categoryStatus.AVAILABLE
  },
  app: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apps",
    required: true,
  },  
  createdAt: {
    type: Date,
    default: Date.now
  },
  additions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Additions",
    required: true,
    default: null,
  }
});

categorySchema.virtual('iconUrl').get(function() {
  return cdn + '/o/100/' + this.icon
});

categorySchema.index({ createdAt: 1 })
module.exports = categorySchema;
