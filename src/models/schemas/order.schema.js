const mongoose = require('mongoose');
const { orderStatus } = require('../../config/constants');
const OrderSchema = new mongoose.Schema(
  {

    code: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    },

    app: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Apps',
      required: true
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branches',
      required: true
    },
    items: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      size: {
        name: {
            type: String,
            required: false
        },
        price: {
            type: Number,
            required: false
        },
      },
      additions: [{
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Additions",
          required: true,
        },
        title: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        iconUrl: {
          type: String,
          required: true
        },
        addition: {
          _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Additions',
            required: true,
          },
          title: {
            type: String,
            required: true
          },
          iconUrl: {
            type: String,
            required: true
          },
        }
      }],
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      }
    }],
    delivery: {
      distance: {
        type: Number,
        required: true
      },
      cost: {
        type: Number,
        required: true
      },
      address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Addresses",
        required: true,
      },
    },

    discount: {
      code: {
        type: String,
      },
      target: {
        type: String,
      },
      expiryDate: {
        type: Date,
      },
      createdAt: {
        type: Date,
      },
      order: {
        couponType : {
          type: String,
        },
        fixed : {
          type: Number,
        },
        percentage : {
          type: Number,
          minimum: 0,
          maximum: 100,
        },
      },
      delivery: {
        couponType : {
          type: String,
        },
        fixed : {
          type: Number,
        },
        percentage : {
          type: Number,
          minimum: 0,
          maximum: 100,
        },
      },
      products: [
        {
          couponType : {
            type: String,
          },
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
          },
          percentage : {
            type: Number,
            minimum: 0,
            maximum: 100,
          },
          fixed : {
            type: Number,
          },
        }
      ],
      cost: {
        type: Number,
        default: 0,
      },
    },
    
    productsCost:  {
      type: Number,
      required: true
    },

    total: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      required: true,
      default: orderStatus.PENDING
    },

    createdAt: {
      type: Date,
      default: Date.now
    },

  },{
    timestamps: true,
  }
);
OrderSchema.index({ createdAt: 1 });

module.exports = OrderSchema;
