require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const flightRoutes = require('./routes/flights');
const bookingRoutes = require('./routes/bookings');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);

// Database Connection (UPDATED)
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/flight-booking')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));