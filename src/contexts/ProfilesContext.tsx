import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Profile, SearchFilters } from '../types';
import { profilesData } from '../data/profiles';

interface ProfilesContextProps {
  profiles: Profile[];
  selectedProfileId: number | null;
  searchFilters: SearchFilters;
  setSelectedProfileId: (id: number | null) => void;
  setSearchFilters: (filters: SearchFilters) => void;
  addProfile: (profile: Omit<Profile, 'id'>) => void;
  updateProfile: (id: number, profile: Partial<Profile>) => void;
  deleteProfile: (id: number) => void;
  getProfileById: (id: number) => Profile | undefined;
  filteredProfiles: Profile[];
}

const ProfilesContext = createContext<ProfilesContextProps | undefined>(undefined);

export const ProfilesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>(profilesData);
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    query: '',
    location: ''
  });

  const addProfile = (profile: Omit<Profile, 'id'>) => {
    const newId = Math.max(0, ...profiles.map(p => p.id)) + 1;
    setProfiles([...profiles, { ...profile, id: newId }]);
  };

  const updateProfile = (id: number, updatedProfile: Partial<Profile>) => {
    setProfiles(
      profiles.map(profile => 
        profile.id === id ? { ...profile, ...updatedProfile } : profile
      )
    );
  };

  const deleteProfile = (id: number) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
    if (selectedProfileId === id) {
      setSelectedProfileId(null);
    }
  };

  const getProfileById = (id: number) => {
    return profiles.find(profile => profile.id === id);
  };

  const filteredProfiles = profiles.filter(profile => {
    const matchesQuery = searchFilters.query 
      ? profile.name.toLowerCase().includes(searchFilters.query.toLowerCase()) ||
        profile.description.toLowerCase().includes(searchFilters.query.toLowerCase())
      : true;
    
    const matchesLocation = searchFilters.location
      ? profile.address.toLowerCase().includes(searchFilters.location.toLowerCase())
      : true;
    
    return matchesQuery && matchesLocation;
  });

  return (
    <ProfilesContext.Provider
      value={{
        profiles,
        selectedProfileId,
        searchFilters,
        setSelectedProfileId,
        setSearchFilters,
        addProfile,
        updateProfile,
        deleteProfile,
        getProfileById,
        filteredProfiles
      }}
    >
      {children}
    </ProfilesContext.Provider>
  );
};

export const useProfiles = () => {
  const context = useContext(ProfilesContext);
  if (context === undefined) {
    throw new Error('useProfiles must be used within a ProfilesProvider');
  }
  return context;
};