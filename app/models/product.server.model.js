'use strict';

var mongoose = require("mongoose"),
    Schema = mongoose.Schema;


/**
 * Product Schema
 */
var ProductSchema = new Schema({
    created: { type: Date, default: Date.now },
    category: { type: String },
    tags: { type: String },
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
        is_taxable: Boolean,
        is_on_sale: Boolean,
        sale_amount: Number,
        sale_percent: Number
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
    images : [{
        url: String,
        position: Number,
        width: Number,
        height: Number
        }]

    
});



    

mongoose.model('Product', ProductSchema);
