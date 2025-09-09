// Main App Component
// Handles routing between authentication and dashboard pages

import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import Login from './components/Login';
import Register from './components/Register';
import PhoneRegister from './components/PhoneRegister';
import EnhancedLogin from './components/EnhancedLogin';
import Dashboard from './components/Dashboard';
import { authService } from './services/authService';
import { enhancedAuthService } from './services/enhancedAuthService';
import awsConfig from './config/awsConfig';
import './App.css';

// Configure AWS Amplify with our Cognito settings
Amplify.configure(awsConfig);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('enhanced-login'); // 'enhanced-login', 'register', 'phone-register'

  // Check if user is already authenticated when app loads
  useEffect(() => {
    const checkAuthStatus = async () => {
      const authenticated = await authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Handle successful login
  const handleLoginSuccess = (user) => {
    console.log('Login successful:', user.username);
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    console.log('User logged out');
    setIsAuthenticated(false);
    setCurrentView('enhanced-login');
  };

  // Switch between different views
  const switchToRegister = () => setCurrentView('register');
  const switchToPhoneRegister = () => setCurrentView('phone-register');
  const switchToLogin = () => setCurrentView('enhanced-login');
  const switchToEmailRegister = () => setCurrentView('register');

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {isAuthenticated ? (
        // Show dashboard for authenticated users
        <Dashboard onLogout={handleLogout} />
      ) : (
        // Show authentication forms for non-authenticated users
        <div className="auth-wrapper">
          <div className="app-header">
            <h1>AWS Cognito Authentication</h1>
            <p>Multiple sign-in options with phone, email, and social login</p>
          </div>
          
          {currentView === 'enhanced-login' && (
            <EnhancedLogin 
              onLoginSuccess={handleLoginSuccess}
              switchToRegister={switchToRegister}
            />
          )}
          
          {currentView === 'register' && (
            <Register 
              switchToLogin={switchToLogin}
              switchToPhoneRegister={switchToPhoneRegister}
            />
          )}
          
          {currentView === 'phone-register' && (
            <PhoneRegister
              switchToLogin={switchToLogin}
              switchToEmailRegister={switchToEmailRegister}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
