import React, { useState, useEffect } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { useProfiles } from '../../contexts/ProfilesContext';

const SearchFilter: React.FC = () => {
  const { searchFilters, setSearchFilters } = useProfiles();
  const [localQuery, setLocalQuery] = useState(searchFilters.query);
  const [localLocation, setLocalLocation] = useState(searchFilters.location);
  
  // Debounce search inputs
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchFilters({
        query: localQuery,
        location: localLocation
      });
    }, 300);
    
    return () => clearTimeout(timer);
  }, [localQuery, localLocation, setSearchFilters]);
  
  const clearFilters = () => {
    setLocalQuery('');
    setLocalLocation('');
    setSearchFilters({ query: '', location: '' });
  };
  
  const hasFilters = localQuery || localLocation;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or description..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Filter by location..."
            value={localLocation}
            onChange={(e) => setLocalLocation(e.target.value)}
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      {hasFilters && (
        <div className="flex justify-end mt-3">
          <button
            onClick={clearFilters}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors text-sm"
          >
            <X size={16} className="mr-1" />
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;