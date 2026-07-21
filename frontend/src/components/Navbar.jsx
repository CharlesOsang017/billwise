import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Bell } from 'lucide-react';

const Navbar = ({ isAuthenticated, setAuth }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth(false);
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary dark:text-blue-400 font-bold text-2xl tracking-tight">BillWise</span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              {isAuthenticated && (
                <>
                  <Link to="/dashboard" className={`${isActive('/dashboard') ? 'border-primary dark:border-blue-400 text-gray-900 dark:text-white' : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors`}>
                    Dashboard
                  </Link>
                  <Link to="/ai-advice" className={`${isActive('/ai-advice') ? 'border-primary dark:border-blue-400 text-gray-900 dark:text-white' : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors`}>
                    AI Advice
                  </Link>
                  <Link to="/connect" className={`${isActive('/connect') ? 'border-primary dark:border-blue-400 text-gray-900 dark:text-white' : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors`}>
                    Connect
                  </Link>
                </>
              )}
              <Link to="/features" className={`${isActive('/features') ? 'border-primary dark:border-blue-400 text-gray-900 dark:text-white' : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors`}>
                Features
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4 ml-4">
                <Link to="/notifications" className="relative p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"></span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="hidden sm:flex text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 items-center transition-colors ml-4"
                >
                  <LogOut className="w-4 h-4 mr-1" /> Logout
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex sm:items-center space-x-4 ml-4">
                <Link to="/login" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-primary dark:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark dark:hover:bg-blue-700 transition-colors shadow-sm">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
