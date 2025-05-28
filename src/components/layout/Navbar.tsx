import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, Users, Settings, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Map size={24} className="text-blue-500 mr-2" />
              <span className="font-bold text-xl text-gray-800">ProfileMap</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/' 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-500'
              }`}
            >
              Profiles
            </Link>
            <Link 
              to="/admin" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/admin' 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-500'
              }`}
            >
              Admin
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-2 shadow-inner">
            <Link 
              to="/" 
              className={`block px-4 py-2 text-sm font-medium ${
                location.pathname === '/' 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-500'
              }`}
            >
              Profiles
            </Link>
            <Link 
              to="/admin" 
              className={`block px-4 py-2 text-sm font-medium ${
                location.pathname === '/admin' 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-500'
              }`}
            >
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;