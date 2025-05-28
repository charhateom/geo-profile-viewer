import React from 'react';
import ProfileList from '../components/profile/ProfileList';
import MapView from '../components/map/MapView';
import SearchFilter from '../components/search/SearchFilter';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Profile Map Explorer</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse through our collection of profiles and explore their locations on the interactive map.
        </p>
      </div>
      
      <SearchFilter />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 order-2 lg:order-1">
          <ProfileList />
        </div>
        
        <div id="map-section" className="lg:col-span-4 order-1 lg:order-2 lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)]">
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Location Map</h2>
            <p className="text-gray-600 text-sm mb-4">
              Click the "Show on Map" button on any profile to highlight their location.
            </p>
          </div>
          <MapView />
        </div>
      </div>
    </div>
  );
};

export default HomePage;