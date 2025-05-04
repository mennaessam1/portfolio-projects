const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourGuideSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String, // No default, user must provide it or leave it undefined
    },
    yearsOfExperience: {
        type: Number, // No default, user must provide it or leave it undefined
    },
    previousWork: {
        type: String, // Can be a URL or description of previous work, no default
    },
    isCreatedProfile: {
        type:Number,
        default:0
    },
    photo: {
        type: String,
    },
    termsAccepted: {
        type: Boolean,
        default: false
    },
    ratings: [{ type: Number, min: 0, max: 5 }],
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    comment: [
        {
            tourist: { type: mongoose.Schema.Types.ObjectId, ref: 'Tourist' },
            text: { type: String, required: true },
        }
    ],
    notifications: [
        {
          type: {
            type: String,
            enum: ['reminder', 'eventBooking', 'promoCode'], // Extendable for future types
            required: true
          },
          itineraryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary' },
          message: { type: String, required: true },
          date: { type: Date, required: true },
          metadata: { type: Map, of: String }, // Store additional info like event name
          read: { type: Boolean, default: false }
        }
      ]
    
}, { timestamps: true });

const TourGuide = mongoose.model('TourGuide', tourGuideSchema);

module.exports = TourGuide;
