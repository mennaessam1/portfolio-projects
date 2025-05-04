const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
    touristId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tourist",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    addedDate: {
        type: Date,
        default: Date.now
    }
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
