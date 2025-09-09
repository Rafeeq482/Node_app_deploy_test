// Enhanced Authentication Service
// Extended AWS Cognito operations with phone number, MFA, and custom attributes

import { Auth } from 'aws-amplify';

import { authService } from './authService';

export const enhancedAuthService = {
  // Original methods from authService
  ...authService,

  // Sign up with phone number
  signUpWithPhone: async (phoneNumber, password, additionalAttributes = {}) => {
    try {
      const result = await Auth.signUp({
        username: phoneNumber,
        password: password,
        attributes: {
          phone_number: phoneNumber,
          ...additionalAttributes
        },
      });
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Sign up with email and phone
  signUpWithEmailAndPhone: async (email, phoneNumber, password, additionalAttributes = {}) => {
    try {
      const result = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
          phone_number: phoneNumber,
          ...additionalAttributes
        },
      });
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Sign up with custom attributes
  signUpWithCustomAttributes: async (username, password, email, customAttributes = {}) => {
    try {
      const attributes = {
        email: email,
        ...customAttributes
      };

      const result = await Auth.signUp({
        username,
        password,
        attributes
      });
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Confirm sign up with phone number
  confirmSignUpPhone: async (phoneNumber, code) => {
    try {
      await Auth.confirmSignUp(phoneNumber, code);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Resend confirmation code
  resendConfirmationCode: async (username) => {
    try {
      await Auth.resendSignUp(username);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Sign in with phone number
  signInWithPhone: async (phoneNumber, password) => {
    try {
      const user = await Auth.signIn(phoneNumber, password);
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Handle MFA challenge (SMS)
  confirmSignInSMS: async (user, code) => {
    try {
      const signedUser = await Auth.confirmSignIn(
        user,
        code,
        'SMS_MFA'
      );
      return { success: true, data: signedUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Handle MFA challenge (TOTP)
  confirmSignInTOTP: async (user, code) => {
    try {
      const signedUser = await Auth.confirmSignIn(
        user,
        code,
        'SOFTWARE_TOKEN_MFA'
      );
      return { success: true, data: signedUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Update user attributes
  updateUserAttributes: async (attributes) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const result = await Auth.updateUserAttributes(user, attributes);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get user attributes
  getUserAttributes: async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const attributes = await Auth.userAttributes(user);
      return { success: true, data: attributes };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Verify attribute (phone or email)
  verifyUserAttribute: async (attributeName, code) => {
    try {
      const result = await Auth.verifyUserAttributeSubmit(attributeName, code);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Send verification code for attribute
  sendAttributeVerificationCode: async (attributeName) => {
    try {
      const result = await Auth.verifyUserAttribute(attributeName);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Enable SMS MFA
  enableSMSMFA: async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const result = await Auth.setPreferredMFA(user, 'SMS');
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Enable TOTP MFA
  setupTOTPMFA: async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const secretCode = await Auth.setupTOTP(user);
      return { success: true, data: secretCode };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Verify TOTP setup
  verifyTOTPSetup: async (challengeAnswer) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.verifyTotpToken(user, challengeAnswer);
      await Auth.setPreferredMFA(user, 'TOTP');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Disable MFA
  disableMFA: async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const result = await Auth.setPreferredMFA(user, 'NOMFA');
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get preferred MFA
  getPreferredMFA: async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const result = await Auth.getPreferredMFA(user);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Change password
  changePassword: async (oldPassword, newPassword) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const result = await Auth.changePassword(user, oldPassword, newPassword);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Forgot password
  forgotPassword: async (username) => {
    try {
      const result = await Auth.forgotPassword(username);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Confirm new password
  confirmForgotPassword: async (username, code, newPassword) => {
    try {
      const result = await Auth.forgotPasswordSubmit(username, code, newPassword);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Social sign-in
  socialSignIn: async (provider) => {
    try {
      const result = await Auth.federatedSignIn({ provider });
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Delete user account
  deleteUser: async () => {
    try {
      const result = await Auth.deleteUser();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Check if user needs to change password
  checkUserStatus: async (user) => {
    try {
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        return { 
          success: true, 
          requiresPasswordChange: true,
          user: user
        };
      }
      return { 
        success: true, 
        requiresPasswordChange: false,
        user: user
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Complete new password challenge
  completeNewPasswordChallenge: async (user, newPassword, requiredAttributes = {}) => {
    try {
      const loggedUser = await Auth.completeNewPassword(
        user,
        newPassword,
        requiredAttributes
      );
      return { success: true, data: loggedUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};
