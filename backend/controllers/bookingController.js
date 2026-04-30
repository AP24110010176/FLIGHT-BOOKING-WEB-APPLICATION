const Booking = require('../models/Booking');
const Ticket = require('../models/Ticket');
const Flight = require('../models/Flight');

exports.createBooking = async (req, res) => {
  try {
    const { flightDetails } = req.body;

    const seatNumber = String(Math.floor(Math.random() * 60) + 1) + String.fromCharCode(65 + Math.floor(Math.random() * 6));

    const booking = new Booking({
      userId: req.user._id,
      flightDetails,
      seatNumber,
      status: 'Confirmed'
    });

    const createdBooking = await booking.save();

    // Create a ticket
    const ticket = new Ticket({
      bookingId: createdBooking._id,
      ticketNumber: 'TKT-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      travelDate: flightDetails.departureTime
    });

    await ticket.save();

    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate('userId', 'name email');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      booking.status = req.body.status || booking.status;
      const updatedBooking = await booking.save();
      res.json(updatedBooking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserTickets = async (req, res) => {
  try {
    // Get all bookings for the user
    const bookings = await Booking.find({ userId: req.user._id });
    const bookingIds = bookings.map(b => b._id);
    
    const tickets = await Ticket.find({ bookingId: { $in: bookingIds } }).populate('bookingId');

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user is authorized to cancel it (must be the owner or admin)
    if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to cancel this booking' });
    }

    await Ticket.deleteMany({ bookingId: req.params.id });
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllSystemBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate('userId', 'name email');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
