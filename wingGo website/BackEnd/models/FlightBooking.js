const mongoose = require('mongoose');

  
  const flightBookingSchema = new mongoose.Schema({
    flightId: String,
    origin: String,
    destination: String,
    departureDate: String,
    arrivalDate: String,
    duration: String,
    price: {
      currency: String,
      total: String,
    },
    airline: String,
    flightNumber: String,
    createdAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'tourist', required: true },
  });
  
  const FlightBooking = mongoose.model('FlightBooking', flightBookingSchema);
  module.exports = FlightBooking;