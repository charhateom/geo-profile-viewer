import React, { useState, useEffect } from 'react';
import { Profile } from '../../types';
import { useProfiles } from '../../contexts/ProfilesContext';

interface ProfileFormProps {
  profile?: Profile;
  onSubmit: () => void;
  onCancel: () => void;
}

const defaultProfile: Omit<Profile, 'id'> = {
  name: '',
  photo: '',
  description: '',
  address: '',
  position: {
    lat: 0,
    lng: 0
  },
  email: '',
  phone: '',
  interests: [],
  socials: {}
};

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onSubmit, onCancel }) => {
  const { addProfile, updateProfile } = useProfiles();
  const [formData, setFormData] = useState<Omit<Profile, 'id'>>(
    profile ? { ...profile } : { ...defaultProfile }
  );
  const [interestsInput, setInterestsInput] = useState('');
  const [error, setError] = useState('');
  const [isGeocoding, setIsGeocoding] = useState(false);
  
  const geocodeAddress = async (address: string) => {
    try {
      setIsGeocoding(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      
      if (data && data[0]) {
        setFormData(prev => ({
          ...prev,
          position: {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon)
          }
        }));
      }
    } catch (err) {
      console.error('Geocoding error:', err);
      setError('Failed to get coordinates from address. Please enter manually.');
    } finally {
      setIsGeocoding(false);
    }
  };
  
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'address') {
      setFormData(prev => ({ ...prev, address: value }));
      if (value.length > 5) {
        await geocodeAddress(value);
      }
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestsInput(e.target.value);
  };
  
  const handleInterestsBlur = () => {
    if (interestsInput) {
      const interests = interestsInput.split(',').map(i => i.trim()).filter(Boolean);
      setFormData(prev => ({
        ...prev,
        interests
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.address) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (profile) {
      updateProfile(profile.id, formData);
    } else {
      addProfile(formData);
    }
    
    onSubmit();
  };
  
  useEffect(() => {
    if (profile) {
      setInterestsInput(profile.interests.join(', '));
    }
  }, [profile]);
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Photo URL <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/photo.jpg"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {isGeocoding && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Latitude <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="position.lat"
            value={formData.position.lat}
            onChange={handleChange}
            step="0.0001"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Longitude <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="position.lng"
            value={formData.position.lng}
            onChange={handleChange}
            step="0.0001"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Interests (comma separated)
        </label>
        <input
          type="text"
          value={interestsInput}
          onChange={handleInterestsChange}
          onBlur={handleInterestsBlur}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Coding, Hiking, Photography"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Twitter Username
          </label>
          <input
            type="text"
            name="socials.twitter"
            value={formData.socials.twitter || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            LinkedIn Username
          </label>
          <input
            type="text"
            name="socials.linkedin"
            value={formData.socials.linkedin || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            GitHub Username
          </label>
          <input
            type="text"
            name="socials.github"
            value={formData.socials.github || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {profile ? 'Update Profile' : 'Add Profile'}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;