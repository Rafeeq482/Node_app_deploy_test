// Dashboard Component
// Main page shown after successful authentication

import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';

const Dashboard = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get current user information when component loads
  useEffect(() => {
    const getCurrentUser = async () => {
      const result = await authService.getCurrentUser();
      if (result.success) {
        setUser(result.data);
      }
      setLoading(false);
    };

    getCurrentUser();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    const result = await authService.signOut();
    if (result.success) {
      onLogout();
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="user-info-card">
          <h2>User Information</h2>
          {user ? (
            <div className="user-details">
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.attributes?.email || 'Not available'}</p>
              <p><strong>Email Verified:</strong> {user.attributes?.email_verified ? 'Yes' : 'No'}</p>
              <p><strong>User Status:</strong> {user.attributes?.cognito_user_status || 'Active'}</p>
            </div>
          ) : (
            <p>Unable to load user information</p>
          )}
        </div>

        <div className="features-card">
          <h2>Available Features</h2>
          <div className="features-list">
            <div className="feature-item">
              <h3>✅ Secure Authentication</h3>
              <p>Your account is protected by AWS Cognito authentication</p>
            </div>
            
            <div className="feature-item">
              <h3>🔐 Password Security</h3>
              <p>Passwords are securely hashed and stored</p>
            </div>
            
            <div className="feature-item">
              <h3>📧 Email Verification</h3>
              <p>Email addresses are verified for additional security</p>
            </div>
            
            <div className="feature-item">
              <h3>🌐 Scalable Infrastructure</h3>
              <p>Built on AWS cloud infrastructure for reliability</p>
            </div>
          </div>
        </div>

        <div className="deployment-info-card">
          <h2>Deployment Information</h2>
          <p>This React application is ready to be deployed on:</p>
          <ul>
            <li>🚀 Amazon EC2 instances</li>
            <li>☁️ AWS Elastic Beanstalk</li>
            <li>🌍 Amazon S3 with CloudFront</li>
            <li>🔧 Any web server supporting static files</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
