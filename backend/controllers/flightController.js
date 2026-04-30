const Flight = require('../models/Flight');
const axios = require('axios');

exports.getFlights = async (req, res) => {
  try {
    console.log("Received Frontend Query:", req.query);

    // Extract whatever the frontend sends, or default to HYD/DEL to prevent crashes
    const origin = req.query.dep_iata || req.query.origin || req.query.source || 'HYD';
    const destination = req.query.arr_iata || req.query.destination || req.query.dest || 'DEL';
    const flightDate = req.query.date || '2026-05-13'; // Default to a valid future date
    
    const response = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: "google_flights",
        departure_id: origin,
        arrival_id: destination,
        type: "2",
        outbound_date: flightDate,
        currency: "INR",
        api_key: process.env.SERPAPI_KEY
      }
    });

    const allFlights = [...(response.data.best_flights || []), ...(response.data.other_flights || [])];

    const flights = allFlights.map(flight => {
      return {
        airline: flight.flights?.[0]?.airline || 'Unknown Airline',
        flightNumber: flight.flights?.[0]?.flight_number || 'Unknown',
        source: origin,
        destination: destination,
        departureTime: flight.flights?.[0]?.departure_airport?.time || new Date().toISOString(),
        arrivalTime: flight.flights?.[0]?.arrival_airport?.time || new Date().toISOString(),
        price: flight.price || 150,
        stops: flight.flights ? Math.max(0, flight.flights.length - 1) : 0
      };
    });

    res.json(flights);
  } catch (error) {
    console.error("SerpApi Error:", error.message, error.response?.data);
    res.json([]);
  }
};

exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (flight) {
      res.json(flight);
    } else {
      res.status(404).json({ message: 'Flight not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createFlight = async (req, res) => {
  try {
    const flight = new Flight(req.body);
    const createdFlight = await flight.save();
    res.status(201).json(createdFlight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);

    if (flight) {
      flight.airlineName = req.body.airlineName || flight.airlineName;
      flight.source = req.body.source || flight.source;
      flight.destination = req.body.destination || flight.destination;
      flight.departureTime = req.body.departureTime || flight.departureTime;
      flight.arrivalTime = req.body.arrivalTime || flight.arrivalTime;
      flight.price = req.body.price || flight.price;

      const updatedFlight = await flight.save();
      res.json(updatedFlight);
    } else {
      res.status(404).json({ message: 'Flight not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (flight) {
      res.json({ message: 'Flight removed' });
    } else {
      res.status(404).json({ message: 'Flight not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
