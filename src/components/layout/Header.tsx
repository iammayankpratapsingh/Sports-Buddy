import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Bell, Menu, User, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2" onClick={closeMenus}>
          <Activity className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">SportsBuddy</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link 
            to="/" 
            className={`font-medium transition-colors duration-200 ${
              isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/events" 
            className={`font-medium transition-colors duration-200 ${
              isActive('/events') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            Events
          </Link>
          <Link 
            to="/buddies" 
            className={`font-medium transition-colors duration-200 ${
              isActive('/buddies') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            Find Buddies
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/notifications" className="relative p-2 text-gray-600 hover:text-blue-500 transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link>
              <div className="relative">
                <button 
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img 
                    src={user?.avatar || "https://ui-avatars.com/api/?name=User"} 
                    alt="Profile" 
                    className="h-8 w-8 rounded-full object-cover border-2 border-blue-500"
                  />
                  <span className="font-medium text-gray-700">{user?.name || 'User'}</span>
                </button>
                
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link 
                      to="/my-events" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      My Events
                    </Link>
                    {user?.isAdmin && (
                      <Link 
                        to="/admin" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={() => {
                        logout();
                        setIsProfileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="px-4 py-2 text-blue-600 font-medium hover:text-blue-800 transition-colors"
              >
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600 focus:outline-none" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3 space-y-1">
            <Link 
              to="/" 
              className={`block py-2 px-4 rounded-md ${
                isActive('/') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={closeMenus}
            >
              Home
            </Link>
            <Link 
              to="/events" 
              className={`block py-2 px-4 rounded-md ${
                isActive('/events') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={closeMenus}
            >
              Events
            </Link>
            <Link 
              to="/buddies" 
              className={`block py-2 px-4 rounded-md ${
                isActive('/buddies') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={closeMenus}
            >
              Find Buddies
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/notifications" 
                  className={`block py-2 px-4 rounded-md ${
                    isActive('/notifications') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={closeMenus}
                >
                  Notifications
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">3</span>
                </Link>
                <Link 
                  to="/profile" 
                  className={`block py-2 px-4 rounded-md ${
                    isActive('/profile') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={closeMenus}
                >
                  Profile
                </Link>
                <Link 
                  to="/my-events" 
                  className={`block py-2 px-4 rounded-md ${
                    isActive('/my-events') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={closeMenus}
                >
                  My Events
                </Link>
                {user?.isAdmin && (
                  <Link 
                    to="/admin" 
                    className={`block py-2 px-4 rounded-md ${
                      isActive('/admin') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={closeMenus}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={() => {
                    logout();
                    closeMenus();
                  }}
                  className="block w-full text-left py-2 px-4 text-red-600 hover:bg-gray-50 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="pt-2 pb-3 flex flex-col space-y-2">
                <Link 
                  to="/login" 
                  className="block w-full text-center py-2 px-4 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                  onClick={closeMenus}
                >
                  Log In
                </Link>
                <Link 
                  to="/signup" 
                  className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={closeMenus}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;