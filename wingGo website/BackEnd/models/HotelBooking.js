const mongoose = require('mongoose');

const hotelBookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  confirmationNumber: { type: String },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  guests: 
    {
      adults: { type: Number },
      
    },
  
  hotel: {
    hotelId: { type: String },
    chainCode: { type: String },
    name: { type: String },
    address: [
      {type: String}
    ], // optional if you want to add more detailed address info
    selfLink: { type: String }, // Link to the hotel’s reference data
  },
  room: {
    description: String,
    type: String,
    rateCode: String,
    quantity: Number,
  },
  price: {
    base: { type: Number },
    currency: { type: String },
    total: { type: Number },
    taxes: [
      {
        amount: { type: Number },
        code: String,
        included: Boolean,
      },
    ],
  },
  cancellationPolicy: [
    {
      amount: { type: Number },
      deadline: { type: Date },
    },
  ],
  payment: {
    method: String,
    vendorCode: String,
    cardNumber: String,
    expiryDate: String,
    holderName: String,
  },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'tourist', required: true }
});

const HotelBooking = mongoose.model('HotelBooking', hotelBookingSchema);

module.exports = HotelBooking;
