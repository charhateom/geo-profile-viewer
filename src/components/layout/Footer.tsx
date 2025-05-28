import React from 'react';
import { Map, Github as GitHub, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Map size={24} className="text-blue-400 mr-2" />
              <span className="font-bold text-xl text-white">ProfileMap</span>
            </div>
            <p className="text-gray-400">
              Explore profiles and their locations with our interactive map interface.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/admin" className="text-gray-400 hover:text-white transition-colors">
                  Admin Dashboard
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-2">
              <a 
                href="mailto:info@profilemap.com" 
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={18} className="mr-2" />
                info@profilemap.com
              </a>
              <a 
                href="https://github.com/profilemap" 
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <GitHub size={18} className="mr-2" />
                github.com/profilemap
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ProfileMap Explorer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;