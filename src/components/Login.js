// Login Component
// Simple login form for AWS Cognito authentication

import React, { useState } from 'react';
import { authService } from '../services/authService';

const Login = ({ onLoginSuccess, switchToRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await authService.signIn(formData.username, formData.password);
    
    if (result.success) {
      onLoginSuccess(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username or Email:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username or email"
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

        <div className="auth-switch">
          <p>Don't have an account? 
            <button onClick={switchToRegister} className="link-button">
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
