# Quick Setup Guide

## 🚀 Your React App is Ready!

Your app now includes **phone number authentication** and **social sign-in** features. Here's how to enable them:

## 📱 Step 1: Enable Phone Number Authentication

### In AWS Cognito Console:
1. **Go to AWS Console** → Amazon Cognito
2. **Select your User Pool** (`ap-south-1_aEoN8ugqE`)
3. **Click "Sign-in experience" tab**
4. **Click "Edit"**
5. **Under "Cognito user pool sign-in options":**
   - ✅ **Email** (already enabled)
   - ✅ **Phone number** (enable this)
6. **Click "Save changes"**

### Configure SMS:
1. **Go to "Messaging" tab**
2. **Click "Edit" in SMS section**
3. **SMS message**: `Your verification code is {####}`
4. **Click "Save changes"**

**Note**: For SMS to work, you may need to set up Amazon SNS permissions or move out of sandbox mode.

## 🌐 Step 2: Enable Social Sign-in (Optional)

### For Google Sign-in:
1. **Create Google OAuth App**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `https://your-domain.auth.ap-south-1.amazoncognito.com/oauth2/idpresponse`

2. **Configure in Cognito**:
   - Go to "Sign-in experience" tab → "Federated identity provider sign-in"
   - Click "Add identity provider" → "Google"
   - Enter **Client ID** and **Client secret** from Google
   - **Attribute mapping**: email → email, name → name
   - **Save changes**

3. **Update App Client**:
   - Go to "App integration" tab
   - Click your app client
   - Enable "Google" in OAuth 2.0 settings
   - Add callback URL: `http://localhost:3000/` (for testing)

## 🧪 Step 3: Test Your Features

### Test Current Setup (Email):
1. **Run your app**: `npm start`
2. **Register with email** - should work as before
3. **Login with email** - should work as before

### Test Phone Authentication:
1. **Click "Register with Phone"** (in email registration form)
2. **Enter phone number**: `+1234567890` (use your actual number for SMS)
3. **Fill other details and register**
4. **Check your phone for SMS code**
5. **Enter verification code**
6. **Try logging in with phone number**

### Test Social Sign-in:
1. **Go to login page**
2. **Scroll down to see "or continue with"**
3. **Click "Google"** (if configured)
4. **Authorize your app** in Google popup
5. **Should be logged in**

## 🎯 What Your App Now Has:

### ✅ **Enhanced Login**:
- Radio buttons to choose Email or Phone login
- MFA support (if enabled in Cognito)
- Social sign-in buttons (Google, Facebook, Amazon)

### ✅ **Phone Registration**:
- Phone number input with format validation
- SMS verification
- First/Last name fields
- Switch between email and phone registration

### ✅ **Social Sign-in**:
- Google, Facebook, Amazon buttons
- Proper error handling
- Loading states

## 🚨 Common Issues & Solutions:

### Issue 1: Phone SMS Not Working
- **Cause**: SNS sandbox limitations
- **Solution**: Configure SNS properly or use verified phone numbers

### Issue 2: Social Sign-in Not Working  
- **Cause**: Provider not configured
- **Solution**: Set up Google/Facebook OAuth apps first

### Issue 3: "Module not found" errors
- **Cause**: New components not recognized
- **Solution**: Restart your dev server (`npm start`)

## 🎛️ Features You Can Enable Later:

### 1. **Multi-Factor Authentication**:
- SMS MFA
- TOTP MFA (Google Authenticator)

### 2. **Custom User Attributes**:
- Department, Employee ID, etc.
- Additional user profile fields

### 3. **Advanced Security**:
- Password policies
- Account lockout
- Advanced security features

## 📱 Test Phone Numbers:

For testing in SNS sandbox mode, use:
- Your own verified phone number
- Or add test numbers in SNS console

## 🔧 Quick Commands:

```bash
# Start the app
npm start

# Build for production
npm run build

# Install any missing dependencies (if needed)
npm install
```

## 📚 Documentation:

- **Complete Guide**: `AWS_COGNITO_GUIDE.md`
- **Configuration**: `COGNITO_CONFIGURATIONS.md` 
- **Testing**: `TESTING_GUIDE.md`

---

**Your enhanced Cognito app is ready!** 🎉 

Start with email authentication (which already works), then gradually enable phone and social features as you configure them in AWS Cognito.
