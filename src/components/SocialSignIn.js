// Social Sign-in Component
// Provides Google, Facebook, and other social login options

import React, { useState } from 'react';
import { enhancedAuthService } from '../services/enhancedAuthService';

const SocialSignIn = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');

  // Handle social sign-in
  const handleSocialSignIn = async (provider) => {
    setLoading(provider);
    setError('');

    try {
      const result = await enhancedAuthService.socialSignIn(provider);
      if (result.success) {
        onLoginSuccess(result.data);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError(`${provider} sign-in failed: ${error.message}`);
    }
    setLoading('');
  };

  return (
    <div className="social-signin">
      <div className="social-signin-header">
        <div className="divider">
          <span>or continue with</span>
        </div>
      </div>

      <div className="social-buttons">
        {/* Google Sign-in */}
        <button
          onClick={() => handleSocialSignIn('Google')}
          disabled={loading === 'Google'}
          className="social-button google-button"
        >
          <div className="social-button-content">
            <svg className="social-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>{loading === 'Google' ? 'Connecting...' : 'Google'}</span>
          </div>
        </button>

        {/* Facebook Sign-in */}
        <button
          onClick={() => handleSocialSignIn('Facebook')}
          disabled={loading === 'Facebook'}
          className="social-button facebook-button"
        >
          <div className="social-button-content">
            <svg className="social-icon" viewBox="0 0 24 24">
              <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>{loading === 'Facebook' ? 'Connecting...' : 'Facebook'}</span>
          </div>
        </button>

        {/* Amazon Sign-in */}
        <button
          onClick={() => handleSocialSignIn('LoginWithAmazon')}
          disabled={loading === 'LoginWithAmazon'}
          className="social-button amazon-button"
        >
          <div className="social-button-content">
            <svg className="social-icon" viewBox="0 0 24 24">
              <path fill="#FF9900" d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.231-.047.285.086.054.13.047.208-.091.278-.675.335-1.375.647-2.1.935-2.933 1.167-6.014 1.75-9.242 1.75-4.186 0-8.123-1.147-11.81-3.44-.138-.084-.146-.175-.022-.31z"/>
              <path fill="#FF9900" d="M20.996 15.673c-.289-.434-1.916-.205-2.643-.103-.735.103-.858.205-.643.474.218.27 1.374.193 2.06.463.688.27.902.744.751 1.246-.15.503-.966.744-2.11.744s-2.643-.434-3.58-1.107c-.936-.673-1.374-1.555-1.374-2.647 0-.936.289-1.73.858-2.381.578-.652 1.295-.977 2.152-.977.754 0 1.438.289 2.06.858.622.578.936 1.295.936 2.152 0 .578-.15 1.107-.467 1.595z"/>
            </svg>
            <span>{loading === 'LoginWithAmazon' ? 'Connecting...' : 'Amazon'}</span>
          </div>
        </button>
      </div>

      {error && <div className="error-message social-error">{error}</div>}

      <div className="social-signin-note">
        <small>
          By signing in with social accounts, you agree to our terms and privacy policy.
        </small>
      </div>
    </div>
  );
};

export default SocialSignIn;
