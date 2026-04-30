import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Search } from 'lucide-react';

const Home = () => {
  const [dep_iata, setDepIata] = useState('');
  const [arr_iata, setArrIata] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const popularDestinations = [
    {
      city: "Bali, Indonesia",
      iata: 'DPS',
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      description: "Experience tropical paradise and ancient temples."
    },
    {
      city: "Paris, France",
      iata: 'CDG',
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80",
      description: "Explore the city of love and iconic landmarks."
    },
    {
      city: "Tokyo, Japan",
      iata: 'HND',
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
      description: "Discover the perfect blend of tradition and future."
    },
    {
      city: "New York, USA",
      iata: 'JFK',
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
      description: "The city that never sleeps."
    },
    {
      city: "Dubai, UAE",
      iata: 'DXB',
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      description: "Experience futuristic architecture and luxury."
    },
    {
      city: "Sydney, Australia",
      iata: 'SYD',
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
      description: "Beautiful beaches and the iconic Opera House."
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (dep_iata && arr_iata && date) {
      navigate(`/flights?dep_iata=${dep_iata}&arr_iata=${arr_iata}&date=${date}`);
    }
  };

  const handleDestinationClick = (destinationIATA) => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    const formattedDate = futureDate.toISOString().split('T')[0];
    navigate(`/flights?dep_iata=DEL&arr_iata=${destinationIATA}&date=${formattedDate}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full relative py-32 px-4 flex items-center justify-center min-h-[600px]">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80" alt="Hero Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/80 via-slate-900/60 to-slate-900/90"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tighter drop-shadow-lg">
            Discover Your Next Adventure
          </h1>
          <p className="text-slate-200 text-lg md:text-2xl mb-12 max-w-3xl mx-auto font-light drop-shadow">
            Book premium flights to destinations worldwide. Experience seamless travel planning at its finest.
          </p>
          
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 transform translate-y-12 max-w-4xl mx-auto border border-white/20">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={dep_iata}
                    onChange={(e) => setDepIata(e.target.value)}
                    placeholder="Departure IATA (e.g. HYD)"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>
              
              <div className="flex-1 relative">
                <label className="block text-sm font-semibold text-slate-700 mb-1 text-left">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={arr_iata}
                    onChange={(e) => setArrIata(e.target.value)}
                    placeholder="Arrival IATA (e.g. DEL)"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>
              
              <div className="flex-1 relative">
                <label className="block text-sm font-semibold text-slate-700 mb-1 text-left">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-end">
                <button type="submit" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white w-full md:w-auto px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <Search className="h-5 w-5" />
                  Search Flights
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="mt-32 w-full max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-10 text-center tracking-tight">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularDestinations.map((item, index) => (
            <div key={index} onClick={() => handleDestinationClick(item.iata)} className="rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300 relative h-80">
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10 group-hover:from-indigo-900/90 transition-colors duration-500" />
               <img src={item.image} alt={item.city} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute bottom-0 left-0 p-8 z-20 w-full transform transition-transform duration-300">
                 <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">{item.city}</h3>
                 <p className="text-slate-200 text-sm drop-shadow">{item.description}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
