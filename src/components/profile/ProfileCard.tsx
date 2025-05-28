import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Info } from 'lucide-react';
import { Profile } from '../../types';
import { useProfiles } from '../../contexts/ProfilesContext';

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const { setSelectedProfileId, selectedProfileId } = useProfiles();
  
  const handleSummaryClick = () => {
    setSelectedProfileId(profile.id);
    
    // Scroll to map if on mobile
    if (window.innerWidth < 1024) {
      const mapElement = document.getElementById('map-section');
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isSelected = selectedProfileId === profile.id;
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col
                 ${isSelected ? 'ring-2 ring-blue-500 transform scale-[1.02]' : ''}`}
    >
      <div className="relative h-48">
        <img 
          src={profile.photo} 
          alt={profile.name}
          className="w-full h-full object-cover object-center"
        />
        {isSelected && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
            Selected
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{profile.name}</h3>
        
        <p className="text-gray-600 mb-3 line-clamp-2 flex-grow">{profile.description}</p>
        
        <div className="flex items-center text-gray-500 mb-3">
          <MapPin size={16} className="mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{profile.address}</span>
        </div>
        
        <div className="space-y-3 mt-auto">
          <button
            onClick={handleSummaryClick}
            className={`w-full px-4 py-2 rounded-md transition-colors duration-200 flex items-center justify-center
                      ${isSelected 
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            <MapPin size={18} className="mr-2" />
            <span>{isSelected ? 'Location Shown' : 'Show on Map'}</span>
          </button>
          
          <Link 
            to={`/profile/${profile.id}`}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
          >
            <Info size={18} className="mr-2" />
            <span>View Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;