# Troubleshooting Guide

## ❌ SECRET_HASH Error

**Error Message:** `Client 21pkhlvrg472tpdl1ap1pl2mul is configured with secret but SECRET_HASH was not received`

### 🔧 Quick Fix (Recommended)

The easiest solution is to **disable the client secret** in your Cognito App Client:

#### Step-by-Step Instructions:

1. **Go to AWS Console** → Amazon Cognito
2. **Select your User Pool** (`ap-south-1_aEoN8ugqE`)
3. **Click "App Integration" tab**
4. **Find your App Client** (`21pkhlvrg472tpdl1ap1pl2mul`)
5. **Click "Edit" or the pencil icon**
6. **Scroll to "App client secret"**
7. **Uncheck "Generate a client secret"** (or disable it)
8. **Save changes**

### ✅ After Making Changes:

1. **Clear browser cache** and refresh your app
2. **Try logging in again**
3. The SECRET_HASH error should be resolved

### 🤔 Why This Happens:

- **Client secrets** are meant for server-side applications
- **Web applications** (React apps) run in browsers and cannot securely store secrets
- **AWS Cognito** requires a SECRET_HASH when a client secret is configured
- **React apps** cannot generate this hash securely in the browser

### 🔒 Security Note:

Disabling the client secret is the **correct and secure approach** for web applications like React apps.

### 📱 Alternative Solution (Advanced)

If you absolutely must keep the client secret (not recommended for web apps), you would need to:

1. Create a backend API that handles authentication
2. Generate the SECRET_HASH on the server side
3. Make API calls from your React app to your backend

This is much more complex and not recommended for learning projects.

## 🚀 Other Common Issues

### CORS Errors
- Check your Cognito callback URLs
- Ensure they match your domain exactly

### Network Issues
- Verify internet connectivity
- Check AWS region settings

### Authentication Flows
- Make sure your app client has the correct auth flows enabled:
  - ALLOW_USER_PASSWORD_AUTH
  - ALLOW_REFRESH_TOKEN_AUTH
  - ALLOW_USER_SRP_AUTH (recommended)

## 📞 Need Help?

If you continue having issues:
1. Check the browser console for detailed error messages
2. Verify your AWS Cognito configuration
3. Ensure your `awsConfig.js` has the correct values
