const mongoose = require('mongoose');
const { cdn, USERS_ROLES } = require('../../config/constants');

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      maxlength: 30,
    },
    bio: {
      type: String,
    },
    birthDay: {
      type: Date,
    },
    avatar: {
      type: String,
      required: true,
      default: 'avatar.jpg'
    },
    password: {
      type: String,
      required: true,
    },
    fcmToken: {
      type: String,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    suspended: {
      type: Boolean,
      default: false,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    activated: {
      type: Boolean,
      default: false,
    },
    admin: {
      type: Boolean,
      required: true,
      default: false,
    },  
    role: {
      type: String,
      required: true,
      default: USERS_ROLES.USER,
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
    timestamps: true,
  }
);
userSchema.virtual('avatarUrl').get(function() {
  return cdn + '/o/100/' + this.avatar
});

module.exports = userSchema;