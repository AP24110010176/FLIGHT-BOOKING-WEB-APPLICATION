const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings, getAllBookings, updateBookingStatus, getUserTickets, cancelBooking, getAllSystemBookings } = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .post(protect, createBooking)
  .get(protect, admin, getAllBookings);

router.route('/admin/all')
  .get(protect, admin, getAllSystemBookings);

router.route('/user')
  .get(protect, getUserBookings);

router.route('/tickets')
  .get(protect, getUserTickets);

router.route('/:id')
  .delete(protect, cancelBooking);

router.route('/:id/status')
  .put(protect, admin, updateBookingStatus);

module.exports = router;
