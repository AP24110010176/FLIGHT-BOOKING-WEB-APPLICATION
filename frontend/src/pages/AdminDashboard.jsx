import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchAllBookings = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/bookings/admin/all', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setBookings(res.data);
      } catch (error) {
        console.error('Error fetching admin bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBookings();
  }, [user, navigate]);

  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await axios.delete(`http://localhost:5001/api/bookings/${bookingId}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setBookings(prev => prev.filter(b => b._id !== bookingId));
        alert('Booking cancelled successfully');
      } catch (error) {
        console.error('Error cancelling booking:', error);
        alert(error.response?.data?.message || 'Failed to cancel booking');
      }
    }
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
      <h1 className="text-4xl font-extrabold text-slate-900 mb-10 tracking-tight">Admin Dashboard - All Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center">
          <p className="text-gray-500">No bookings found in the system.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-3xl shadow-md border border-slate-100">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Airline</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.userId?.name || 'Unknown'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.userId?.email || 'Unknown'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.flightDetails?.airline || booking.flightId?.airlineName || 'Unknown'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.flightDetails?.source || booking.flightId?.source || 'Unknown'} → {booking.flightDetails?.destination || booking.flightId?.destination || 'Unknown'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">₹{booking.flightDetails?.price || booking.flightId?.price || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleCancel(booking._id)}
                      className="text-red-500 bg-red-50 border border-red-100 hover:bg-red-500 hover:text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-md"
                    >
                      Admin Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
