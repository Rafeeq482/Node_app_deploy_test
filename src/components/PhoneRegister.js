// Phone Number Registration Component
// Demonstrates phone number authentication with AWS Cognito

import React, { useState } from 'react';
import { enhancedAuthService } from '../services/enhancedAuthService';

const PhoneRegister = ({ switchToLogin, switchToEmailRegister }) => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
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
    } else if (cleaned.startsWith('+')) {
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

    // Additional attributes
    const additionalAttributes = {};
    if (formData.firstName) additionalAttributes.given_name = formData.firstName;
    if (formData.lastName) additionalAttributes.family_name = formData.lastName;

    const result = await enhancedAuthService.signUpWithPhone(
      formattedPhone,
      formData.password,
      additionalAttributes
    );

    if (result.success) {
      setSuccess('Registration successful! Check your phone for verification code.');
      setShowVerification(true);
      setFormData({...formData, phoneNumber: formattedPhone});
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

    const result = await enhancedAuthService.confirmSignUpPhone(
      formData.phoneNumber, 
      verificationCode
    );

    if (result.success) {
      setSuccess('Phone number verified successfully! You can now login.');
      setTimeout(() => switchToLogin(), 2000);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  // Resend verification code
  const handleResendCode = async () => {
    setLoading(true);
    setError('');
    
    const result = await enhancedAuthService.resendConfirmationCode(formData.phoneNumber);
    
    if (result.success) {
      setSuccess('Verification code resent to your phone.');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{showVerification ? 'Verify Phone Number' : 'Register with Phone'}</h2>
        
        {!showVerification ? (
          <form onSubmit={handleSubmit}>
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
              <label>First Name (Optional):</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
              />
            </div>

            <div className="form-group">
              <label>Last Name (Optional):</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
              />
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
              {loading ? 'Registering...' : 'Register with Phone'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerification}>
            <div className="verification-info">
              <p>We've sent a verification code to:</p>
              <strong>{formData.phoneNumber}</strong>
            </div>

            <div className="form-group">
              <label>Verification Code:</label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                placeholder="Enter 6-digit code"
                maxLength="6"
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <button type="submit" disabled={loading} className="auth-button">
              {loading ? 'Verifying...' : 'Verify Phone Number'}
            </button>

            <div className="resend-section">
              <p>Didn't receive the code?</p>
              <button 
                type="button" 
                onClick={handleResendCode}
                disabled={loading}
                className="link-button"
              >
                Resend Code
              </button>
            </div>
          </form>
        )}

        <div className="auth-switch">
          <div className="switch-options">
            <p>Prefer email? 
              <button onClick={switchToEmailRegister} className="link-button">
                Register with Email
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

export default PhoneRegister;
