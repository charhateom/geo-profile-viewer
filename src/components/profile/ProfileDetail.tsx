import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Mail, Phone, Link as LinkIcon, ArrowLeft, Heart } from 'lucide-react';
import { Profile } from '../../types';
import { useProfiles } from '../../contexts/ProfilesContext';
import MapView from '../map/MapView';

interface ProfileDetailProps {
  profileId: number;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ profileId }) => {
  const { getProfileById, setSelectedProfileId } = useProfiles();
  const navigate = useNavigate();
  const profile = getProfileById(Number(profileId));

  React.useEffect(() => {
    if (profile) {
      setSelectedProfileId(profile.id);
    }
    
    return () => {
      setSelectedProfileId(null);
    };
  }, [profile, setSelectedProfileId]);

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">The profile you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Profiles
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img 
              src={profile.photo} 
              alt={profile.name}
              className="w-full h-72 md:h-full object-cover"
            />
          </div>
          
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{profile.name}</h1>
            
            <p className="text-gray-600 mb-6 leading-relaxed">{profile.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPin size={20} className="mr-3 text-blue-500" />
                <span>{profile.address}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Mail size={20} className="mr-3 text-blue-500" />
                <a href={`mailto:${profile.email}`} className="hover:text-blue-600 transition-colors">
                  {profile.email}
                </a>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Phone size={20} className="mr-3 text-blue-500" />
                <a href={`tel:${profile.phone}`} className="hover:text-blue-600 transition-colors">
                  {profile.phone}
                </a>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                <Heart size={20} className="mr-2 text-red-500" />
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                <LinkIcon size={20} className="mr-2 text-blue-500" />
                Social Links
              </h3>
              <div className="flex gap-4">
                {profile.socials.twitter && (
                  <a 
                    href={`https://twitter.com/${profile.socials.twitter}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    Twitter
                  </a>
                )}
                {profile.socials.linkedin && (
                  <a 
                    href={`https://linkedin.com/in/${profile.socials.linkedin}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
                {profile.socials.github && (
                  <a 
                    href={`https://github.com/${profile.socials.github}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Location</h3>
          <MapView />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;