const mongoose = require('mongoose');
const { productStatus, cdn, CRUDStatus, PRODUCTStatus } = require('../../config/constants');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    color: {
        type: String,
        required: false,
        default: "#ddd"
    },
    status: {
        type: String,
        required: true,
        default: PRODUCTStatus.AVAILABLE
    },
    diabetics: {
        type: Boolean,
        required: false
    },
    images: {
        type: [
            {
                type:String, 
                required: true
            }
        ],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        required: true,
    },
    app: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Apps",
        required: true,
    },
    priceType: {
        type: String,
        required: true,
        enum:['PRICE','SIZE']
    },
    price: {
        type: Number,
        required: true
    },
    sizes: {
        type: [{
            size: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Sizes",
                required: true,
            },
            price: {
                type: Number,
                required: true
            },
        }],
        required: true
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
    },
    note: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "notes",
        required: false,
        default: null,
    },
});

ProductSchema.virtual('mainImage').get(function() {
    return cdn + '/o/100/' + this.images[0]
});

ProductSchema.virtual('imagesUrl').get(function() {
    return this.images.map(img => cdn + '/o/100/' + img);
});


ProductSchema.virtual('maxPrice').get(function() {
    if( this.sizes.length > 0){
        const prices = this.sizes.map(size => size.price);
        return Math.max(...prices);

    }else{
        return null
    }
});

ProductSchema.virtual('minPrice').get(function() {
    if( this.sizes.length > 0){
        const prices = this.sizes.map(size => size.price);
        return Math.min(...prices);

    }else{
        return null
    }
});


  
module.exports = ProductSchema
