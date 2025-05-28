import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileDetail from '../components/profile/ProfileDetail';

const ProfileDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <div>Profile not found</div>;
  }
  
  return <ProfileDetail profileId={Number(id)} />;
};

export default ProfileDetailPage;