// Register Component
// User registration form with email verification

import React, { useState } from 'react';
import { authService } from '../services/authService';

const Register = ({ switchToLogin, switchToPhoneRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Format phone number
  const formatPhoneNumber = (phone) => {
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, '');
    
    // Add country code if not present
    if (cleaned.length === 10) {
      return `+1${cleaned}`;
    } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+${cleaned}`;
    } else if (phone.startsWith('+')) {
      return phone;
    }
    
    return `+${cleaned}`;
  };

  // Handle registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Format phone number
    const formattedPhone = formatPhoneNumber(formData.phoneNumber);

    const result = await authService.signUp(
      formData.username,
      formData.password,
      formData.email,
      formattedPhone
    );

    if (result.success) {
      setSuccess('Registration successful! Check your email for verification code.');
      setShowVerification(true);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  // Handle verification code submission
  const handleVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await authService.confirmSignUp(formData.username, verificationCode);

    if (result.success) {
      setSuccess('Email verified successfully! You can now login.');
      setTimeout(() => switchToLogin(), 2000);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{showVerification ? 'Verify Email' : 'Register'}</h2>
        
        {!showVerification ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Choose a username"
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                placeholder="+1234567890 or 1234567890"
              />
              <small>Include country code (e.g., +1 for US)</small>
            </div>
            
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <button type="submit" disabled={loading} className="auth-button">
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerification}>
            <div className="form-group">
              <label>Verification Code:</label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                placeholder="Enter verification code from email"
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <button type="submit" disabled={loading} className="auth-button">
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>
        )}

        <div className="auth-switch">
          <div className="switch-options">
            <p>Prefer phone number? 
              <button onClick={switchToPhoneRegister} className="link-button">
                Register with Phone
              </button>
            </p>
            <p>Already have an account? 
              <button onClick={switchToLogin} className="link-button">
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
