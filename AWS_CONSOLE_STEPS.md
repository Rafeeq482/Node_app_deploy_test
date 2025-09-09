# AWS Console Configuration Steps

## 🎯 Complete Setup Guide for Your Enhanced Cognito App

Follow these exact steps to enable phone number authentication and social sign-in in your AWS Cognito User Pool.

---

## 📱 STEP 1: Enable Phone Number Authentication

### 1.1 Navigate to Your User Pool
1. **Open AWS Console** → Search for "Cognito" → Click **Amazon Cognito**
2. **Click "User pools"** in the left sidebar
3. **Find and click your User Pool**: `ap-south-1_aEoN8ugqE`

### 1.2 Enable Phone Number Sign-in
1. **Click "Sign-in experience" tab** (left sidebar)
2. **Click "Edit"** button (top right)
3. **Under "Cognito user pool sign-in options":**
   - ✅ **Email** (should already be checked)
   - ✅ **Phone number** ← **CHECK THIS BOX**
   - ✅ **Username** (optional, can keep checked)
4. **Click "Save changes"** (bottom right)

### 1.3 Configure SMS Settings
1. **Click "Messaging" tab** (left sidebar)
2. **In the "SMS" section, click "Edit"**
3. **SMS settings:**
   - **SMS message**: `Your verification code is {####}`
   - **SMS sender ID**: Leave blank (optional)
4. **Click "Save changes"**

**⚠️ Important**: For SMS to work in production, you may need to:
- Move out of SNS sandbox mode
- Set up proper SNS permissions
- For now, it will work with verified phone numbers in sandbox

---

## 🌐 STEP 2: Enable Social Sign-in (Google)

### 2.1 Set up Cognito Domain (Required for Social Sign-in)
1. **Click "App integration" tab** (left sidebar)
2. **Find "Domain" section**
3. **Click "Create domain"** or **"Actions" → "Create custom domain"**
4. **Choose domain prefix**: `your-app-name-auth` (must be unique)
   - Example: `rafeeq-cognito-app`
   - Full domain will be: `rafeeq-cognito-app.auth.ap-south-1.amazoncognito.com`
5. **Click "Create domain"**
6. **Wait for domain to be created** (takes a few minutes)
7. **Copy the full domain name** - you'll need it later

### 2.2 Create Google OAuth App
1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Create new project** (or select existing)
   - Project name: `Cognito React App` (or any name)
3. **Enable Google+ API**:
   - Search for "Google+ API" in the search bar
   - Click on it and click "Enable"
4. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: **Web application**
   - Name: `Cognito React App`
   - **Authorized redirect URIs**: 
     - `https://YOUR-DOMAIN.auth.ap-south-1.amazoncognito.com/oauth2/idpresponse`
     - Replace `YOUR-DOMAIN` with your actual domain from step 2.1
   - Click "Create"
5. **Copy Client ID and Client Secret** - you'll need these next

### 2.3 Configure Google in Cognito
1. **Back in Cognito Console → "Sign-in experience" tab**
2. **Scroll down to "Federated identity provider sign-in"**
3. **Click "Add identity provider"**
4. **Select "Google"**
5. **Fill in the details**:
   - **Provider name**: `Google` (keep default)
   - **Client ID**: Paste from Google Console
   - **Client secret**: Paste from Google Console
   - **Authorize scopes**: `profile email openid`
6. **Attribute mapping**:
   - `email` → `email`
   - `given_name` → `given_name`
   - `family_name` → `family_name`
7. **Click "Create identity provider"**

### 2.4 Update App Client for OAuth
1. **Click "App integration" tab**
2. **Find your App Client** (`21pkhlvrg472tpdl1ap1pl2mul`)
3. **Click on the App Client name**
4. **Click "Edit"** in Hosted UI section
5. **Configure OAuth settings**:
   - **Allowed callback URLs**: `http://localhost:3000/`
   - **Allowed sign-out URLs**: `http://localhost:3000/`
   - **Identity providers**: ✅ **Google** ← **CHECK THIS**
   - **OAuth grant types**: ✅ **Authorization code grant**
   - **OAuth scopes**: ✅ **email**, ✅ **openid**, ✅ **profile**
6. **Click "Save changes"**

### 2.5 Update Your React App Config
1. **Edit `src/config/awsConfig.js`**
2. **Uncomment the OAuth section** and update:
```javascript
oauth: {
  domain: 'YOUR-DOMAIN.auth.ap-south-1.amazoncognito.com', // Your domain from step 2.1
  scope: ['email', 'profile', 'openid'],
  redirectSignIn: 'http://localhost:3000/',
  redirectSignOut: 'http://localhost:3000/',
  responseType: 'code'
}
```

---

## 🔐 STEP 3: Enable Multi-Factor Authentication (Optional)

### 3.1 Configure MFA
1. **Click "Sign-in experience" tab**
2. **Click "Edit"**
3. **Scroll down to "Multi-factor authentication"**
4. **MFA enforcement**: Select **"Optional"** (users can choose)
5. **MFA methods**:
   - ✅ **SMS message** (for SMS MFA)
   - ✅ **Authenticator apps** (for Google Authenticator, etc.)
6. **Click "Save changes"**

---

## 🧪 STEP 4: Test Your Configuration

### 4.1 Test Phone Authentication
1. **Run your app**: `npm start`
2. **Click "Register with Phone"**
3. **Enter YOUR actual phone number**: `+1234567890`
4. **Complete registration**
5. **Check your phone for SMS**
6. **Enter verification code**

### 4.2 Test Google Sign-in
1. **Go to login page**
2. **Click "Google" button**
3. **You should be redirected to Google**
4. **Authorize your app**
5. **You should be logged into your React app**

---

## 🚨 Troubleshooting Common Issues

### Issue 1: SMS Not Working
**Error**: "Unable to send SMS"
**Solution**: 
- Your AWS account is in SNS sandbox mode
- Either add your phone number to verified numbers in SNS console
- Or request production access for SNS

### Issue 2: Google Sign-in Not Working
**Error**: "Invalid redirect URI"
**Solutions**:
- Check that your Google OAuth redirect URI exactly matches Cognito domain
- Make sure you enabled the identity provider in app client settings
- Verify the domain is active in Cognito

### Issue 3: "Domain not found" Error
**Solution**:
- Wait for domain creation to complete (can take 15 minutes)
- Check that domain status is "Active"

---

## ✅ Verification Checklist

After completing all steps, verify:

### Phone Authentication ✅
- [ ] Phone number is enabled in sign-in options
- [ ] SMS message is configured
- [ ] You can register with phone number
- [ ] SMS verification works
- [ ] You can login with phone number

### Social Sign-in ✅
- [ ] Cognito domain is created and active
- [ ] Google OAuth app is created
- [ ] Google identity provider is configured in Cognito
- [ ] App client OAuth settings are updated
- [ ] awsConfig.js OAuth section is uncommented
- [ ] Google sign-in button works

### Basic Features Still Work ✅
- [ ] Email registration works
- [ ] Email login works
- [ ] Dashboard loads correctly
- [ ] Logout works

---

## 🎯 Quick Commands Summary

```bash
# Test your app after configuration
npm start

# Build for production
npm run build
```

---

## 📞 Need Help?

If you encounter issues:

1. **Check AWS CloudWatch logs** for error details
2. **Verify all settings** match the steps exactly
3. **Test with your own phone number** and email
4. **Make sure browser cache is cleared**

Your configuration is now complete! 🎉

**Start with phone authentication first, then add social sign-in when you're comfortable with the setup.**
