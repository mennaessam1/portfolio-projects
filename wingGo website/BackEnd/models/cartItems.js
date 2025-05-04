const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    touristId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tourist', // Reference to the Tourist model
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true
    },
    amount: {
        type: Number,
        default: 1, // Starts from 1
        // validate: {
        //     validator: async function (value) {
        //         // Fetch the product using the productId
        //         const product = await mongoose.model('Product').findById(this.productId);
        //         if (!product) return false; // Ensure the product exists
        //         return value >= 1 && value <= product.quantity; // Validate against product quantity
        //     },
        //     message: 'Amount must be at least 1 and cannot exceed the available product quantity.'
        // }
    },
    price:{
        type:Number
    },
    name:{
        type:String
    }
}, { timestamps: true });

const Cart = mongoose.model('CartItems', cartSchema);

module.exports = Cart;
