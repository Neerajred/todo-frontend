import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../services/api';

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profile);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} required />
        <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} required />
        <input type="password" placeholder="New Password" onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
