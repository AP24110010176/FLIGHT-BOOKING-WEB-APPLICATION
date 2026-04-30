import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlaneTakeoff, PlaneLanding, Clock, DollarSign } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const FlightResults = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stopFilter, setStopFilter] = useState('all');
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const dep_iata = queryParams.get('dep_iata') || '';
        const arr_iata = queryParams.get('arr_iata') || '';
        const date = queryParams.get('date') || '';
        
        const res = await axios.get(`http://localhost:5001/api/flights?dep_iata=${dep_iata}&arr_iata=${arr_iata}&date=${date}`);
        setFlights(res.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [location.search]);

  const handleBook = async (flight) => {
    if (!user) {
      alert('Please login to book a flight.');
      navigate('/login');
      return;
    }

    try {
      const token = user.token;
      await axios.post(
        'http://localhost:5001/api/bookings',
        { flightDetails: flight },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Flight booked successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error booking flight:', error);
      alert(error.response?.data?.message || 'Failed to book flight');
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredFlights = flights.filter(f => {
    if (stopFilter === 'all') return true;
    if (stopFilter === '0') return f.stops === 0;
    if (stopFilter === '1+') return f.stops > 0;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-10 tracking-tight">Search Results</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : flights.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-12 text-center">
          <PlaneTakeoff className="h-20 w-20 text-slate-200 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">No flights found</h2>
          <p className="text-slate-500 mt-2 text-lg font-light">Try adjusting your search criteria.</p>
          <button onClick={() => navigate('/')} className="mt-8 px-8 py-3 rounded-full border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition-all duration-300">
            Back to Search
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex gap-3 mb-4">
            <button onClick={() => setStopFilter('all')} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${stopFilter === 'all' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:shadow-sm hover:scale-105'}`}>All Flights</button>
            <button onClick={() => setStopFilter('0')} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${stopFilter === '0' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:shadow-sm hover:scale-105'}`}>Non-stop</button>
            <button onClick={() => setStopFilter('1+')} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${stopFilter === '1+' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:shadow-sm hover:scale-105'}`}>1+ Stops</button>
          </div>
          {filteredFlights.length === 0 ? (
            <div className="text-center py-10 text-gray-500">No flights match this filter.</div>
          ) : filteredFlights.map((flight, index) => (
            <div key={`${flight.flightNumber}-${index}`} className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row overflow-hidden group">
              <div className="flex-1 p-6 md:p-8 w-full relative">
                <div className="flex items-center justify-between md:justify-start gap-4 mb-6">
                  <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">{flight.airline} {flight.flightNumber !== 'Unknown' ? `- ${flight.flightNumber}` : ''}</h3>
                </div>
                
                <div className="flex items-center justify-between w-full max-w-md">
                  <div className="text-center">
                    <p className="text-3xl font-extrabold text-slate-900">{formatTime(flight.departureTime)}</p>
                    <p className="text-sm font-semibold text-slate-500 mt-1">{flight.source}</p>
                  </div>
                  
                  <div className="flex-1 px-6 flex flex-col items-center">
                    <div className="w-full flex items-center justify-center gap-2 text-indigo-300">
                      <div className="h-[2px] bg-indigo-100 flex-1"></div>
                      <PlaneTakeoff className="h-6 w-6 text-indigo-500" />
                      <div className="h-[2px] bg-indigo-100 flex-1"></div>
                    </div>
                    <span className="text-xs font-medium text-slate-500 mt-2 flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                      <Clock className="h-3 w-3" /> {flight.stops === 0 ? 'Direct' : `${flight.stops} Stop(s)`}
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-3xl font-extrabold text-slate-900">{formatTime(flight.arrivalTime)}</p>
                    <p className="text-sm font-semibold text-slate-500 mt-1">{flight.destination}</p>
                  </div>
                </div>
              </div>
              
              <div className="hidden md:block w-0 border-l-2 border-dashed border-slate-200 relative my-6"></div>
              
              <div className="bg-slate-50 p-6 md:p-8 flex flex-row md:flex-col items-center justify-center w-full md:w-64 border-t md:border-t-0 border-slate-100">
                <div className="text-4xl font-extrabold text-indigo-600 flex items-center mb-0 md:mb-6 tracking-tight">
                  ₹{flight.price}
                </div>
                <button 
                  onClick={() => handleBook(flight)}
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white w-full md:w-full px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md"
                >
                  Book Flight
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightResults;
