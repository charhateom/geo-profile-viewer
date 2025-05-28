import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Profile, MapPosition } from '../../types';
import { useProfiles } from '../../contexts/ProfilesContext';
import LoadingSpinner from '../ui/LoadingSpinner';

// Fix for Leaflet marker icon issue in React
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

interface MapUpdateProps {
  position: MapPosition;
  zoom: number;
}

// Component to handle map view updates
const MapUpdater: React.FC<MapUpdateProps> = ({ position, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(position, zoom);
  }, [map, position, zoom]);
  
  return null;
};

const MapView: React.FC = () => {
  const { profiles, selectedProfileId } = useProfiles();
  const [isLoading, setIsLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState<MapPosition>({ lat: 39.8283, lng: -98.5795 });
  const [mapZoom, setMapZoom] = useState(4);

  useEffect(() => {
    // If a profile is selected, center the map on that profile
    if (selectedProfileId) {
      const selectedProfile = profiles.find(p => p.id === selectedProfileId);
      if (selectedProfile) {
        setMapCenter(selectedProfile.position);
        setMapZoom(13);
      }
    } else if (profiles.length > 0) {
      // Default to US center if no profile is selected
      setMapCenter({ lat: 39.8283, lng: -98.5795 });
      setMapZoom(4);
    }
    
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [selectedProfileId, profiles]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[500px] bg-gray-100 rounded-lg">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="h-[500px] rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {profiles.map((profile) => (
          <Marker 
            key={profile.id} 
            position={profile.position}
            icon={defaultIcon}
            opacity={selectedProfileId ? (selectedProfileId === profile.id ? 1 : 0.6) : 1}
          >
            <Popup>
              <div className="text-center">
                <img 
                  src={profile.photo} 
                  alt={profile.name} 
                  className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
                />
                <h3 className="font-semibold text-lg">{profile.name}</h3>
                <p className="text-sm text-gray-600">{profile.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        
        <MapUpdater position={mapCenter} zoom={mapZoom} />
      </MapContainer>
    </div>
  );
};

export default MapView;