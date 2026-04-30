const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flightDetails: {
    airline: String,
    flightNumber: String,
    source: String,
    destination: String,
    price: Number,
    departureTime: Date
  },
  bookingDate: { type: Date, default: Date.now },
  seatNumber: { type: String },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' }
});

module.exports = mongoose.model('Booking', bookingSchema);
