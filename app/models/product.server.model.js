'use strict';

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;


/**
 * Product Schema
 */
var ProductSchema = new Schema({
    _id : Number,
    created: { type: Date, default: Date.now },
    category: { type: String },
    collection: { type : String },
    sku: { type: Number },
    upc: { type: String },
    seo: { type: String },
    is_featured: { type: Boolean },
    title: {
        type: String,
        default: '',
        required: 'Title cannot be blank',
        trim: true
    },
    shipping: {
        weight: Number,
        dimentions: {
            width: Number,
            height: Number,
            depth: Number
        }
    },
    pricing: {
        retail: Number,
        wholesale: Number,
        production: Number,
        is_taxable: Boolean  
    },
    details: {
        description: { type: String },
        attributes: { type: Array },
        variants: {
            color: [{ type: String}],
            size: { type: String },
            material: [{ type: Array }]
        }
    },
    images : [{ type: Schema.Types.ObjectId, ref: 'Image' }]
});


/**
 * Image Schema
 */
var ImageSchema = new Schema({
    _product: { type: Number, ref: 'Product' },
    position: Number,
    url: String,
    is_thumbnail: Boolean,
    width: Number,
    height: Number,
});
    
mongoose.model('Image', ImageSchema);
mongoose.model('Product', ProductSchema);