import React from 'react';
import { Edit, Trash2, MapPin } from 'lucide-react';
import { Profile } from '../../types';
import { useProfiles } from '../../contexts/ProfilesContext';

interface ProfileTableProps {
  onEdit: (profile: Profile) => void;
}

const ProfileTable: React.FC<ProfileTableProps> = ({ onEdit }) => {
  const { profiles, deleteProfile } = useProfiles();
  
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      deleteProfile(id);
    }
  };
  
  if (profiles.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-sm">
        <p className="text-gray-600">No profiles available. Add a new profile to get started.</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Profile
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {profiles.map((profile) => (
            <tr key={profile.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img 
                      className="h-10 w-10 rounded-full object-cover"
                      src={profile.photo} 
                      alt={profile.name} 
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{profile.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{profile.description}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{profile.email}</div>
                <div className="text-sm text-gray-500">{profile.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin size={16} className="mr-1 text-gray-400" />
                  <span className="truncate max-w-xs">{profile.address}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(profile)}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(profile.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileTable;