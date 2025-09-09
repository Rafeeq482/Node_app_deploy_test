// Enhanced Login Component
// Supports email, phone number, and MFA authentication

import React, { useState } from 'react';
import { enhancedAuthService } from '../services/enhancedAuthService';
import SocialSignIn from './SocialSignIn';

const EnhancedLogin = ({ onLoginSuccess, switchToRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loginType, setLoginType] = useState('email'); // 'email' or 'phone'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mfaStep, setMfaStep] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [mfaType, setMfaType] = useState('');
  const [challengeUser, setChallengeUser] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Format phone number for login
  const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `+1${cleaned}`;
    } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+${cleaned}`;
    }
    return phone.startsWith('+') ? phone : `+${phone}`;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    let username = formData.username;
    
    // Format phone number if login type is phone
    if (loginType === 'phone') {
      username = formatPhoneNumber(formData.username);
    }

    const result = await enhancedAuthService.signIn(username, formData.password);
    
    if (result.success) {
      const user = result.data;
      
      // Check if MFA is required
      if (user.challengeName === 'SMS_MFA') {
        setMfaStep(true);
        setMfaType('SMS');
        setChallengeUser(user);
      } else if (user.challengeName === 'SOFTWARE_TOKEN_MFA') {
        setMfaStep(true);
        setMfaType('TOTP');
        setChallengeUser(user);
      } else {
        // No MFA required, login successful
        onLoginSuccess(user);
      }
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  // Handle MFA verification
  const handleMfaVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    let result;
    
    if (mfaType === 'SMS') {
      result = await enhancedAuthService.confirmSignInSMS(challengeUser, mfaCode);
    } else if (mfaType === 'TOTP') {
      result = await enhancedAuthService.confirmSignInTOTP(challengeUser, mfaCode);
    }

    if (result.success) {
      onLoginSuccess(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  // Reset MFA step
  const resetMfaStep = () => {
    setMfaStep(false);
    setMfaCode('');
    setMfaType('');
    setChallengeUser(null);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        
        {!mfaStep ? (
          <>
            <form onSubmit={handleSubmit}>
              {/* Login Type Selector */}
              <div className="login-type-selector">
                <label>Login with:</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="loginType"
                      value="email"
                      checked={loginType === 'email'}
                      onChange={(e) => setLoginType(e.target.value)}
                    />
                    Email
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="loginType"
                      value="phone"
                      checked={loginType === 'phone'}
                      onChange={(e) => setLoginType(e.target.value)}
                    />
                    Phone Number
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>
                  {loginType === 'email' ? 'Email:' : 'Phone Number:'}
                </label>
                <input
                  type={loginType === 'email' ? 'email' : 'tel'}
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder={
                    loginType === 'email' 
                      ? 'Enter your email address' 
                      : 'Enter your phone number'
                  }
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
                  placeholder="Enter your password"
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" disabled={loading} className="auth-button">
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            
            {/* <SocialSignIn onLoginSuccess={onLoginSuccess} /> */}
            <div className="social-signin-placeholder">
              <div className="divider">
                <span>Social sign-in available after domain setup</span>
              </div>
            </div>
          </>
        ) : (
          <form onSubmit={handleMfaVerification}>
            <div className="mfa-info">
              <h3>Two-Factor Authentication</h3>
              <p>
                {mfaType === 'SMS' 
                  ? 'Enter the code sent to your phone number'
                  : 'Enter the code from your authenticator app'
                }
              </p>
            </div>

            <div className="form-group">
              <label>Verification Code:</label>
              <input
                type="text"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                required
                placeholder="Enter 6-digit code"
                maxLength="6"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={loading} className="auth-button">
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>

            <div className="back-section">
              <button 
                type="button" 
                onClick={resetMfaStep}
                className="link-button"
              >
                ← Back to Login
              </button>
            </div>
          </form>
        )}

        <div className="auth-switch">
          <p>Don't have an account? 
            <button onClick={switchToRegister} className="link-button">
              Register here
            </button>
          </p>
          
          <div className="forgot-password">
            <p>
              <button className="link-button">
                Forgot Password?
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedLogin;
