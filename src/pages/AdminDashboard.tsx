import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import ProfileTable from '../components/admin/ProfileTable';
import ProfileForm from '../components/admin/ProfileForm';
import { Profile } from '../types';

const AdminDashboard: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | undefined>(undefined);
  
  const handleAddNew = () => {
    setSelectedProfile(undefined);
    setIsFormOpen(true);
  };
  
  const handleEdit = (profile: Profile) => {
    setSelectedProfile(profile);
    setIsFormOpen(true);
  };
  
  const handleFormSubmit = () => {
    setIsFormOpen(false);
    setSelectedProfile(undefined);
  };
  
  const handleFormCancel = () => {
    setIsFormOpen(false);
    setSelectedProfile(undefined);
  };
  
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        
        {!isFormOpen && (
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
          >
            <PlusCircle size={20} className="mr-2" />
            Add New Profile
          </button>
        )}
      </div>
      
      {isFormOpen ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {selectedProfile ? 'Edit Profile' : 'Add New Profile'}
          </h2>
          <ProfileForm 
            profile={selectedProfile}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </div>
      ) : (
        <ProfileTable onEdit={handleEdit} />
      )}
    </div>
  );
};

export default AdminDashboard;