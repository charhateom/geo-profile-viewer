import React from 'react';
import { useProfiles } from '../../contexts/ProfilesContext';
import ProfileCard from './ProfileCard';
import LoadingSpinner from '../ui/LoadingSpinner';

const ProfileList: React.FC = () => {
  const { filteredProfiles } = useProfiles();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner />
      </div>
    );
  }

  if (filteredProfiles.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No profiles found</h3>
        <p className="text-gray-600">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
      {filteredProfiles.map(profile => (
        <div key={profile.id} className="h-full">
          <ProfileCard profile={profile} />
        </div>
      ))}
    </div>
  );
};

export default ProfileList;