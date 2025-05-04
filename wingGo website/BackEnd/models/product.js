const mongoose = require('mongoose');
const { Schema } = mongoose;  // This imports Schema from mongoose

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number, // This should be quantity instead of price
        required: true
    },
    sales: { 
        type: Number, 
        default: 0, 
        required: false
    }, 
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: false,
        default: null 
    },
    ratings: [
        {
            touristId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tourist' },
            rating:  { type: Number, required: true, min: 1, max: 5 }
        }
    ],
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: [
        {
            touristId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tourist' },
            review: { type: String, required: true }
        }
    ],
    // sellingDates: [
    //     {
    //         type: Date,
    //         // required: true // if each date in the array must be provided
    //     }
    // ],
    discountedPrices: [
        {
            promoCodeId: { type: mongoose.Schema.Types.ObjectId, ref: 'PromoCode' }, // Applied promo code
            totalDiscountedPrice: { type: Number, required: true }, // Discounted price
            quantity: { type: Number, required: true } // Quantity purchased under this discount
        }
    ],
    sellingDates: [
        {
            type: Date,
            // required: true // if each date in the array must be provided
        }
    ],    
    archive:{
        type:Boolean,
        default:false,
        required:true
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
