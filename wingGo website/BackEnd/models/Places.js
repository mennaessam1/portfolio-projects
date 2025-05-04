const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const allowedTypes = ['Monuments', 'Museums', 'Religious Sites', 'Palaces', 'Castles'];

const placeSchema = new Schema({
    governorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TourismGovernor',
       // required: true
    }
    ,
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pictures: {
        type: [String],
        // required: true
    },
    location: {
        type: String,
        required: true
    },
    openingHours: {
        type: String,
        required: true
    },
    ticketPrices: {
        foreigner: {
            type: Number
            // ,
            // required: true
        },
        native: {
            type: Number
            // ,
            // required: true
        },
        student: {
            type: Number
            // ,
            // required: true
        }
    },


    tags: {
        types: [{
            type: String,
            enum: allowedTypes,  // Restrict to allowed values
          //  required: true
        }],
        historicalPeriods: {
            type: [String],  // Flexible array for historical periods
            default: []
        }
    },
    flagged: {
        type: Boolean,
        default: false,  // Initially not flagged
      },
      photo:{
        type: String,
      },

      tagss: [{  type: String }] 
}, { timestamps: true });

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;