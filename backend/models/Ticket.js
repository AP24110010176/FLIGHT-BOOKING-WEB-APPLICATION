const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  ticketNumber: { type: String, required: true, unique: true },
  travelDate: { type: Date, required: true }
});

module.exports = mongoose.model('Ticket', ticketSchema);
