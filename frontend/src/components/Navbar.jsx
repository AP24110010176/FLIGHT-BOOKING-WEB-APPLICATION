import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, LogOut, User as UserIcon } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Plane className="h-8 w-8 text-indigo-600" />
              <span className="font-extrabold text-2xl tracking-tighter bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">AeroBook</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 transition-colors font-medium flex items-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  Dashboard
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors font-medium"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">
                  Login
                </Link>
                <Link to="/register" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-5 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
