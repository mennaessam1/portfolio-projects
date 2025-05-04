
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
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
    name: {
        type: String

    },
    description:{
        type: String
    },
    isCreatedProfile: {
       type:Number,
       default:0
   },
   logo: {
       type: String
   },
   termsAccepted: {
    type: Boolean,
    default: false
},
notifications: [
    {
      type: {
        type: String, // e.g., "stock-alert"
        required: true
      },
      message: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      },
      read: {
        type: Boolean,
        default: false
      }
    }
  ]

}, { timestamps: true });

const Seller = mongoose.model('Seller', sellerSchema);

//export module so tahy you can use it somewhere else in the proj
module.exports= Seller;