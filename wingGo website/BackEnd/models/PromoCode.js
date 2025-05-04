const mongoose = require('mongoose');
const { Schema } = mongoose;

const promoCodeSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    discount: {
        type: Number,
        required: true, // Discount percentage or amount
        min: 0
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    description: {
        type: String, // Optional description of the promo code
        required: false
    },
    touristId: { // Add this field to link to a specific tourist
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tourist',
        required: true
    }
}, { timestamps: true });

const PromoCode = mongoose.model('PromoCode', promoCodeSchema);

module.exports = PromoCode;
