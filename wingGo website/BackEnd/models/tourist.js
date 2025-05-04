const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const touristSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true 
    },
    username: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true 
    },
    nationality: {
        type: String,
        required: true
    },
    DOB: {
        type: Date, //Make as a date
        required: true
    },
    jobOrStudent: {
        type: String,
        required: false,
        enum: ['job', 'student', 'Job', 'Student'] // Ensures the field is either job or student
    },
    wallet: {
        type: Number,
        default: 0    // Initialize to zero
          
    },
    loyaltyPoints: {
        type: Number,
        default: 0    // Initialize to zero
          
    },
    badge: {
        level: {
            type: Number,
            default: 1    // Default level is 1
        },
        amount: {
            type: Number,
            default: 0.5  // Default amount is 0.5
        }
    },
    transports: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transport'
         }
        ],
    purchasedProducts: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            purchaseDate: { type: Date, default: Date.now },
            rating: { type: Number, min: 1, max: 5 }  // Add a rating field for each purchased product
        }
    ],
    bookedItineraries: [{
        itineraryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary' },
        bookingDate: { type: Date} // Default to the current date
    }] ,
    preferences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PreferenceTag' }],
  
    bookedActivities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],

    notifications: [
        {
          type: {
            type: String,
            enum: ['reminder', 'eventBooking', 'promoCode'], // Extendable for future types
            required: true
          },
          eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' },
          itineraryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary' },
          message: { type: String, required: true },
          date: { type: Date, required: true },
          metadata: { type: Map, of: String }, // Store additional info like event name
          read: { type: Boolean, default: false }
        }
      ],
      
    
    deliveryAddresses: [{type: String, trim: true }],
    chosenAddress: {
        type: String,
    },
    
    promoCodes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'PromoCode',
        },
      ],
    savedActivities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Activity' // Reference the Activity model
        }
    ],
    savedItineraries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Itinerary' // Reference the Itinerary model
        }
    ],
    notifyOnInterest: {
        type: Boolean,
        default: false, // Initially set to false
        required: true,
    }


}, {timestamps: true});


const Tourist = mongoose.model('Tourist', touristSchema);

//export module so tahy you can use it somewhere else in the proj
module.exports= Tourist;