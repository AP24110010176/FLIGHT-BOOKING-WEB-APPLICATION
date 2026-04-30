import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Ticket, Calendar, Plane, CreditCard } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchTickets = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/bookings/tickets', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setTickets(res.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [user, navigate]);

  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await axios.delete(`http://localhost:5001/api/bookings/${bookingId}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setTickets(prev => prev.filter(t => t.bookingId._id !== bookingId));
        alert('Booking cancelled successfully');
      } catch (error) {
        console.error('Error cancelling booking:', error);
        alert(error.response?.data?.message || 'Failed to cancel booking');
      }
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-16 w-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold shadow-sm">
          {user?.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Welcome back, {user?.name}</h1>
          <p className="text-slate-500 mt-1">Manage your bookings and travel history</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
        <Ticket className="h-6 w-6 text-indigo-600" />
        Your Tickets
      </h2>

      {(!tickets || tickets.length === 0) ? (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center">
          <Plane className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-slate-900">No trips booked yet</h3>
          <p className="text-slate-500 mt-2 mb-6">When you book a flight, your tickets will appear here.</p>
          <button onClick={() => navigate('/')} className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md">
            Start Planning
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs font-bold tracking-wider text-primary-600 uppercase">E-Ticket • {ticket?.bookingId?.flightDetails?.airline || ticket?.bookingId?.flightId?.airlineName || 'Unknown Airline'}</span>
                    <h3 className="text-lg font-bold text-gray-900 mt-1">{ticket?.ticketNumber || 'N/A'}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${ticket?.bookingId?.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {ticket?.bookingId?.status || 'Unknown'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 mb-4 border border-gray-100">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{formatTime(ticket?.bookingId?.flightDetails?.departureTime || ticket?.bookingId?.flightId?.departureTime || new Date().toISOString())}</p>
                    <p className="text-sm font-medium text-gray-500">{ticket?.bookingId?.flightDetails?.source || ticket?.bookingId?.flightId?.source || 'Unknown'}</p>
                  </div>
                  <Plane className="h-6 w-6 text-primary-400 rotate-45" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{formatTime(ticket?.bookingId?.flightDetails?.arrivalTime || ticket?.bookingId?.flightId?.arrivalTime || new Date().toISOString())}</p>
                    <p className="text-sm font-medium text-gray-500">{ticket?.bookingId?.flightDetails?.destination || ticket?.bookingId?.flightId?.destination || 'Unknown'}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 flex items-center gap-1 mb-1"><Calendar className="h-4 w-4" /> Date</p>
                    <p className="font-semibold text-gray-900">{formatDate(ticket?.travelDate || new Date())}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 flex items-center gap-1 mb-1"><CreditCard className="h-4 w-4" /> Paid</p>
                    <p className="font-semibold text-gray-900">₹{ticket?.bookingId?.flightDetails?.price || ticket?.bookingId?.flightId?.price || 0}</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={() => handleCancel(ticket.bookingId._id)}
                    className="px-6 py-2 text-red-500 bg-red-50 border border-red-100 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-md font-semibold text-sm"
                  >
                    Cancel Flight
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
