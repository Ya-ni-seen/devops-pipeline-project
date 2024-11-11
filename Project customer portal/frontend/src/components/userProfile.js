import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    accountNumber: '',
    email: '',
  });

  useEffect(() => {
    // Fetch user data (Replace with real API endpoint)
    async function fetchUserData() {
      try {
        const response = await fetch("https://localhost:3001/profile/profile");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    }

    fetchUserData();
  }, []);

  const handleChangePassword = () => {
    // Handle password change (Implement password change form)
    alert('Password change functionality is not implemented yet.');
  };

  return (
    <div className="container">
      <h3>Your Profile</h3>
      <p><strong>Full Name:</strong> {userData.fullName}</p>
      <p><strong>Account Number:</strong> {userData.accountNumber}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <button onClick={handleChangePassword} className="btn btn-warning">Change Password</button>
    </div>
  );
};

export default UserProfile;
