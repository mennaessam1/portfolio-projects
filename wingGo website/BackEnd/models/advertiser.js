const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const advertiserSchema = new Schema({
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
    companyName: {
        type: String,
        // required: true
    },
    website: {
        type: String,
        // required: true
    },
    hotline: {
        type: String,
        // required: true
    },
    companyProfile: {
        type: String,
        // required: false // Optional field, can contain the company's profile description
    },
    // accepted: {
    //     type: Boolean,
    //     default: false // Initially not accepted, to be changed later when approved
    // },
    contactEmail: {
        type: String,
        // required: true
    },
    contactPerson: {
        type: String,
        // required: true
    },
    
    // Additional fields if necessary, e.g., address, industry type, etc.
    logoUrl: {
        type: String,
    },
    socialMediaLinks: {
        facebook: { type: String },
        twitter: { type: String },
        instagram: { type: String },
        linkedin: { type: String }
    },
     isCreatedProfile: {
        type:Number,
        default:0

    },
    termsAccepted: {
        type: Boolean,
        default: false
    },
    notifications: [
        {
          type: {
            type: String,
            enum: ['reminder', 'eventBooking', 'promoCode'], // Extendable for future types
            required: true
          },
          eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' },
          message: { type: String, required: true },
          date: { type: Date, required: true },
          metadata: { type: Map, of: String }, // Store additional info like event name
          read: { type: Boolean, default: false }
        }
      ]

}, { timestamps: true });

const Advertiser = mongoose.model('Advertiser', advertiserSchema);

module.exports = Advertiser;
