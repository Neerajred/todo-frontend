// ProfilePage.js

import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile, updateProfilePassword } from '../services/api'; // Import API functions

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [message, setMessage] = useState('');

  // Load user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUserData({ name: data.name, email: data.email });
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchProfile();
  }, []);

  // Handle input changes for name and email
  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle password inputs
  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // Update profile (name and email)
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(userData);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile');
    }
  };

  // Update password
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      // Update password API call (this should be created in your API)
      await updateProfilePassword(passwords);
      setMessage('Password updated successfully!');
      setPasswords({ oldPassword: '', newPassword: '' }); // Reset password fields
    } catch (error) {
      setMessage('Failed to update password');
    }
  };

  return (
    <div className="container mt-5 profile-page">
  <h2 className="text-center">Profile Page</h2>
  {message && <p className="alert alert-info">{message}</p>}

  {/* Section 1: Update Name and Email */}
  <div className="section mb-4">
    <h3>Update Profile</h3>
    <form onSubmit={handleUpdateProfile}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">Update Profile</button>
    </form>
  </div>

  {/* Section 2: Update Password */}
  <div className="section mb-4">
    <h3>Update Password</h3>
    <form onSubmit={handleUpdatePassword}>
      <div className="mb-3">
        <label htmlFor="oldPassword" className="form-label">Old Password:</label>
        <input
          type="password"
          id="oldPassword"
          name="oldPassword"
          value={passwords.oldPassword}
          onChange={handlePasswordChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="newPassword" className="form-label">New Password:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={passwords.newPassword}
          onChange={handlePasswordChange}
          required
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">Update Password</button>
    </form>
  </div>
</div>

  );
};

export default ProfilePage;
