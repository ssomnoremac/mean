'use strict';

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

/**
 * Product Category
 */
var CategorySchema = new Schema({
    title : String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    description: { type : String },
    image_url: String
});
/**
 * Product Schema
 */
var ProductSchema = new Schema({
    created: { type: Date, default: Date.now },
    _category: { type: Number, ref: 'Category' },
    season: { type : String },
    sku: { type: Number },
    upc: { type: String },
    seo: { type: String },
    is_visible: { type: Boolean },
    is_discountable: { type: Boolean },
    is_preorderable: { type: Boolean },
    is_featured: { type: Boolean },
    position: Number,
    category_position: Number,
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
        attributes: [{ type: String }],
        variants: {
            color: [{ type: String}],
            size: { type: String },
            material: [{ type: String }]
        }
    },
    images : [{ type: Schema.Types.ObjectId, ref: 'ProductImage' }]
});


/**
 * Image Schema
 */
var ProductImageSchema = new Schema({
    _product: { type: Number, ref: 'Product' },
    position: Number,
    url: String,
    is_thumbnail: Boolean,
    width: Number,
    height: Number,
});


    
mongoose.model('ProductImage', ProductImageSchema);
mongoose.model('Product', ProductSchema);
mongoose.model('Category', CategorySchema);