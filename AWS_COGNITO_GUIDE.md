# AWS Cognito Complete Guide

## 🚀 Overview

AWS Cognito provides comprehensive user management with many advanced features. Let's explore all the options available!

## 📋 Table of Contents

1. [Authentication Methods](#authentication-methods)
2. [User Attributes](#user-attributes)
3. [Multi-Factor Authentication (MFA)](#multi-factor-authentication)
4. [Password Policies](#password-policies)
5. [Verification Methods](#verification-methods)
6. [Custom Attributes](#custom-attributes)
7. [Social Sign-In](#social-sign-in)
8. [Advanced Features](#advanced-features)
9. [Implementation Examples](#implementation-examples)

---

## 1. Authentication Methods

### A. Username/Email Sign-in
- **Current Setup**: Email as username
- **Alternative**: Allow both username and email

### B. Phone Number Sign-in
- **Use Case**: SMS-based authentication
- **Region Support**: Available in most regions
- **Format**: +1234567890

### C. Social Sign-in
- **Providers**: Google, Facebook, Amazon, Apple
- **SAML**: Enterprise identity providers
- **OpenID Connect**: Custom identity providers

---

## 2. User Attributes

### Standard Attributes
```javascript
// Current attributes
email: required
email_verified: auto-generated

// Additional standard attributes
phone_number: "+1234567890"
phone_number_verified: true/false
given_name: "John"
family_name: "Doe"
birthdate: "1990-01-01"
gender: "male/female/other"
address: "123 Main St"
locale: "en-US"
timezone: "America/New_York"
picture: "https://example.com/photo.jpg"
website: "https://johndoe.com"
```

### Required vs Optional
- **Required**: Must be provided during registration
- **Optional**: Can be added later
- **Mutable**: Can be changed after creation
- **Immutable**: Cannot be changed once set

---

## 3. Multi-Factor Authentication (MFA)

### Types of MFA

#### A. SMS MFA
```javascript
// Configuration
mfaConfiguration: 'OPTIONAL' // or 'ON' or 'OFF'
mfaTypes: ['SMS_MFA']
smsAuthenticationMessage: 'Your code: {####}'
```

#### B. TOTP MFA (Authenticator Apps)
```javascript
// Supports: Google Authenticator, Authy, etc.
mfaTypes: ['SOFTWARE_TOKEN_MFA']
```

#### C. Hardware Tokens
- **FIDO2**: WebAuthn, YubiKey
- **U2F**: Universal 2nd Factor

### MFA Settings
- **Optional**: User can choose to enable
- **Required**: All users must use MFA
- **Off**: MFA disabled

---

## 4. Password Policies

### Default Policy
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter  
- At least 1 number
- At least 1 special character

### Customizable Options
```javascript
passwordPolicy: {
  minimumLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSymbols: true,
  temporaryPasswordValidityDays: 7
}
```

---

## 5. Verification Methods

### A. Email Verification
```javascript
// Current setup
verificationMessageTemplate: {
  emailMessage: 'Your verification code is {####}',
  emailSubject: 'Verify your account',
  defaultEmailOption: 'CONFIRM_WITH_CODE' // or 'CONFIRM_WITH_LINK'
}
```

### B. Phone Number Verification
```javascript
// SMS verification
smsVerificationMessage: 'Your verification code is {####}',
smsConfiguration: {
  snsCallerArn: 'arn:aws:iam::account:role/sns-role',
  externalId: 'unique-id'
}
```

### C. Verification Options
- **Code**: 6-digit verification code
- **Link**: Click-to-verify email link
- **Auto-verify**: Skip verification (not recommended)

---

## 6. Custom Attributes

### Creating Custom Attributes
```javascript
// In AWS Console or CloudFormation
customAttributes: [
  {
    name: 'department',
    type: 'String',
    required: false,
    mutable: true
  },
  {
    name: 'employee_id',
    type: 'Number',
    required: true,
    mutable: false
  },
  {
    name: 'join_date',
    type: 'DateTime',
    required: false,
    mutable: true
  }
]
```

### Using Custom Attributes
```javascript
// During sign-up
Auth.signUp({
  username: 'john@example.com',
  password: 'TempPass123!',
  attributes: {
    email: 'john@example.com',
    'custom:department': 'Engineering',
    'custom:employee_id': '12345'
  }
});
```

---

## 7. Social Sign-In

### Google Sign-In
```javascript
// Configuration
oauth: {
  domain: 'your-domain.auth.region.amazoncognito.com',
  scope: ['email', 'profile', 'openid'],
  redirectSignIn: 'https://yourapp.com/callback',
  redirectSignOut: 'https://yourapp.com/',
  responseType: 'code',
  providers: ['Google']
}
```

### Implementation
```javascript
// Sign in with Google
Auth.federatedSignIn({provider: 'Google'});

// Sign in with Facebook
Auth.federatedSignIn({provider: 'Facebook'});
```

---

## 8. Advanced Features

### A. Lambda Triggers
```javascript
// Available triggers
PreSignUp: 'arn:aws:lambda:region:account:function:PreSignUp'
PostConfirmation: 'arn:aws:lambda:region:account:function:PostConfirmation'
PreAuthentication: 'arn:aws:lambda:region:account:function:PreAuth'
PostAuthentication: 'arn:aws:lambda:region:account:function:PostAuth'
```

### B. User Pool Groups
- **Admin**: Full access
- **User**: Limited access
- **Premium**: Special features

### C. App Clients
- **Web App**: No client secret
- **Mobile App**: With client secret
- **Server-side**: With client secret

### D. Identity Pools (Federated Identities)
- Access AWS resources directly
- Temporary AWS credentials
- Role-based access control

---

## 9. Implementation Examples

### A. Phone Number Authentication
```javascript
// Sign up with phone number
const signUpWithPhone = async (phoneNumber, password) => {
  try {
    const result = await Auth.signUp({
      username: phoneNumber,
      password: password,
      attributes: {
        phone_number: phoneNumber,
      },
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

### B. Add Custom Attributes
```javascript
// Update user with custom attributes
const updateUserAttributes = async (attributes) => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const result = await Auth.updateUserAttributes(user, attributes);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Usage
updateUserAttributes({
  'custom:department': 'Engineering',
  given_name: 'John',
  family_name: 'Doe'
});
```

### C. Enable MFA
```javascript
// Enable SMS MFA
const enableSMSMFA = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const result = await Auth.setPreferredMFA(user, 'SMS');
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Enable TOTP MFA
const enableTOTPMFA = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    
    // Get QR code for authenticator app
    const totpCode = await Auth.setupTOTP(user);
    
    // User scans QR code and enters token
    const challengeAnswer = 'token-from-app'; // User input
    await Auth.verifyTotpToken(user, challengeAnswer);
    
    // Set TOTP as preferred
    await Auth.setPreferredMFA(user, 'TOTP');
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

### D. Social Sign-In
```javascript
// Google Sign-In
const signInWithGoogle = async () => {
  try {
    await Auth.federatedSignIn({provider: 'Google'});
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

---

## 🔧 Quick Configuration Checklist

### User Pool Settings
- [ ] Sign-in options (email, phone, username)
- [ ] Required attributes
- [ ] Password policy
- [ ] MFA settings
- [ ] Verification methods
- [ ] Custom attributes

### App Client Settings
- [ ] Client secret (disable for web apps)
- [ ] Authentication flows
- [ ] OAuth settings
- [ ] Callback URLs
- [ ] Allowed OAuth scopes

### Advanced Settings
- [ ] Lambda triggers
- [ ] User pool groups
- [ ] Identity pool integration
- [ ] Domain configuration

---

## 📚 Next Steps

1. **Choose your authentication method** (email, phone, or both)
2. **Configure user attributes** (required vs optional)
3. **Set up MFA** (SMS, TOTP, or both)
4. **Customize password policy**
5. **Add social sign-in** (optional)
6. **Test different scenarios**
7. **Deploy to production**

This guide covers the most important Cognito features. Each feature can be configured through the AWS Console or Infrastructure as Code (CloudFormation, CDK, Terraform).

Would you like me to implement any specific feature in your React app?
