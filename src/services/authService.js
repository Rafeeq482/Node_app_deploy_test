// Authentication Service
// This file handles all authentication operations with AWS Cognito

import { Auth } from 'aws-amplify';

// Note: If you're getting SECRET_HASH errors, disable the client secret
// in your Cognito App Client settings. Web apps should not use client secrets.

export const authService = {
  // Sign up a new user
  signUp: async (username, password, email) => {
    try {
      const result = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Confirm user registration with verification code
  confirmSignUp: async (username, code) => {
    try {
      await Auth.confirmSignUp(username, code);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Sign in user
  signIn: async (username, password) => {
    try {
      const user = await Auth.signIn(username, password);
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Sign out user
  signOut: async () => {
    try {
      await Auth.signOut();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get current authenticated user
  getCurrentUser: async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Check if user is authenticated
  isAuthenticated: async () => {
    try {
      await Auth.currentAuthenticatedUser();
      return true;
    } catch (error) {
      return false;
    }
  }
};
