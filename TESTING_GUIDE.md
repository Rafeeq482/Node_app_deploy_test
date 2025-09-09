# AWS Cognito Testing Guide

## 🎯 How to Test Different Cognito Features

This guide shows you how to test all the AWS Cognito features you've implemented, step by step.

## 📧 1. Testing Email Authentication (Basic)

### Test Email Registration
1. **Start your app**: `npm start`
2. **Click "Register here"**
3. **Fill in the form:**
   - Email: `test@example.com`
   - Username: `testuser`
   - Password: `TempPass123!`
   - Confirm Password: `TempPass123!`
4. **Click "Register"**
5. **Check your email for verification code**
6. **Enter the verification code**
7. **Success!** You should see "Email verified successfully"

### Test Email Login
1. **Go to login page**
2. **Enter credentials:**
   - Username: `testuser` or `test@example.com`
   - Password: `TempPass123!`
3. **Click "Login"**
4. **Success!** You should see the dashboard

---

## 📱 2. Testing Phone Number Authentication

### Prerequisites in AWS Console
1. **Enable phone number sign-in** (see COGNITO_CONFIGURATIONS.md)
2. **Configure SMS settings**
3. **Ensure your account can send SMS** (SNS sandbox)

### Test Phone Registration
1. **Use the enhanced components** (you'll need to integrate these)
2. **Fill in phone registration:**
   - Phone: `+1234567890` or `1234567890`
   - First Name: `John`
   - Last Name: `Doe`
   - Password: `TempPass123!`
3. **Click "Register with Phone"**
4. **Check your phone for SMS verification code**
5. **Enter the verification code**
6. **Success!** Account created with phone number

### Test Phone Login
1. **Use Enhanced Login component**
2. **Select "Phone Number" radio button**
3. **Enter:**
   - Phone: `+1234567890`
   - Password: `TempPass123!`
4. **Click "Login"**
5. **Success!** Logged in with phone number

---

## 🔐 3. Testing Multi-Factor Authentication (MFA)

### Prerequisites in AWS Console
1. **Enable MFA** (Optional or Required)
2. **Enable SMS MFA and/or TOTP**
3. **Configure SMS settings**

### Test SMS MFA
1. **Register a user with phone number**
2. **Login normally**
3. **Enable SMS MFA** (you can add this to dashboard)
4. **Logout and login again**
5. **You should see MFA challenge screen**
6. **Check your phone for SMS code**
7. **Enter the code**
8. **Success!** Logged in with MFA

### Test TOTP MFA (Authenticator App)
1. **Install Google Authenticator** on your phone
2. **Enable TOTP MFA** in your app
3. **Scan QR code** with authenticator app
4. **Enter code from app** to verify setup
5. **Logout and login again**
6. **Enter code from authenticator app**
7. **Success!** TOTP MFA working

---

## 👤 4. Testing Custom Attributes

### Prerequisites in AWS Console
1. **Add custom attributes** (department, employee_id, etc.)
2. **Mark them as mutable**

### Test Custom Attribute Registration
```javascript
// Example test data
{
  email: 'employee@company.com',
  username: 'emp001',
  password: 'TempPass123!',
  'custom:department': 'Engineering',
  'custom:employee_id': '12345',
  given_name: 'Jane',
  family_name: 'Smith'
}
```

### Test Custom Attribute Updates
1. **Login to dashboard**
2. **Add profile update functionality**
3. **Update custom attributes:**
   - Department: `Marketing`
   - Employee ID: `54321`
4. **Refresh and verify changes saved**

---

## 🌐 5. Testing Social Sign-in

### Prerequisites
1. **Configure Google/Facebook** in Cognito console
2. **Set up OAuth redirect URLs**
3. **Get app credentials** from Google/Facebook

### Test Google Sign-in
1. **Add Google sign-in button** to your login page
2. **Click "Sign in with Google"**
3. **Authorize your app** in Google popup
4. **Success!** Logged in with Google account

---

## 🔧 6. Testing Error Scenarios

### Test Invalid Phone Numbers
```bash
# Try these invalid formats
123456789      # Too short
abc123def      # Contains letters  
+999999999999  # Invalid country code
```

### Test Password Policy Violations
```bash
# Try weak passwords
123          # Too short
password     # No uppercase/numbers
PASSWORD     # No lowercase/numbers
Pass123      # No special characters (if required)
```

### Test MFA Errors
```bash
# Try wrong codes
000000      # Invalid code
123456      # Expired code
abcdef      # Non-numeric code
```

---

## 🛠️ 7. Quick Testing Checklist

### Basic Features ✅
- [ ] Email registration works
- [ ] Email verification works
- [ ] Email login works
- [ ] Password validation works
- [ ] Dashboard loads after login
- [ ] Logout works

### Phone Features 📱
- [ ] Phone registration works
- [ ] SMS verification works
- [ ] Phone login works
- [ ] Phone number format validation works

### MFA Features 🔐
- [ ] SMS MFA setup works
- [ ] SMS MFA challenge works
- [ ] TOTP MFA setup works
- [ ] TOTP MFA challenge works
- [ ] MFA can be disabled

### Advanced Features 🚀
- [ ] Custom attributes save correctly
- [ ] User profile updates work
- [ ] Password change works
- [ ] Forgot password works
- [ ] Social sign-in works

---

## 🐛 8. Common Test Issues & Solutions

### Issue: SMS Not Received
**Possible Causes:**
- SNS sandbox limitations
- Invalid phone number format
- SMS service not configured

**Solutions:**
1. Check AWS SNS console for delivery status
2. Verify phone number format (+1234567890)
3. Check SMS limits in your region
4. Move out of SNS sandbox if needed

### Issue: Email Not Received
**Possible Causes:**
- Email in spam folder
- SES sandbox limitations
- Invalid email address

**Solutions:**
1. Check spam/junk folder
2. Use verified email in SES sandbox
3. Check SES sending statistics
4. Verify email address format

### Issue: MFA Not Working
**Possible Causes:**
- MFA not enabled in user pool
- Phone number missing
- Clock sync issues (TOTP)

**Solutions:**
1. Enable MFA in Cognito console
2. Ensure user has phone number
3. Check device clock sync
4. Verify authenticator app setup

### Issue: Custom Attributes Not Saving
**Possible Causes:**
- Incorrect attribute format
- Attribute not marked as mutable
- Missing permissions

**Solutions:**
1. Use `custom:` prefix
2. Mark as mutable in console
3. Check IAM permissions
4. Verify attribute type matches data

---

## 📊 9. Testing Automation Scripts

### Create Test Users Script
```javascript
// testUsers.js
const testUsers = [
  {
    username: 'test.email@example.com',
    email: 'test.email@example.com',
    password: 'TestPass123!',
    type: 'email'
  },
  {
    username: '+1234567890',
    phone_number: '+1234567890',
    password: 'TestPass123!',
    type: 'phone'
  },
  {
    username: 'mfa.user@example.com',
    email: 'mfa.user@example.com',
    phone_number: '+1987654321',
    password: 'TestPass123!',
    type: 'mfa_user'
  }
];

// Use these for consistent testing
```

### Testing Scenarios
```javascript
// Test scenarios to verify
const testScenarios = [
  'User registration with email only',
  'User registration with phone only', 
  'User registration with both email and phone',
  'User registration with custom attributes',
  'Email verification flow',
  'Phone verification flow',
  'Login with email',
  'Login with phone number',
  'Login with MFA challenge',
  'Password change',
  'Forgot password flow',
  'User attribute updates',
  'Account deletion'
];
```

---

## 🎓 10. Learning Exercises

Try these exercises to better understand Cognito:

### Exercise 1: Create Different User Types
1. **Regular User**: Email only
2. **VIP User**: Email + Phone + MFA
3. **Employee**: Email + Custom attributes
4. **Social User**: Google/Facebook login

### Exercise 2: Test Edge Cases
1. **Register same email twice** (should fail)
2. **Login with wrong password 5 times** (account locked?)
3. **Try to access dashboard without login** (should redirect)
4. **Verify expired verification code** (should fail)

### Exercise 3: Security Testing
1. **Test XSS prevention** (try script tags in inputs)
2. **Test CSRF protection** (manual API calls)
3. **Test rate limiting** (rapid requests)
4. **Test session timeout** (wait for token expiry)

---

## 📝 Testing Notes

### Keep Track Of:
- **User Pool ID**: `ap-south-1_aEoN8ugqE`
- **App Client ID**: `21pkhlvrg472tpdl1ap1pl2mul`
- **Region**: `ap-south-1`

### Test Phone Numbers:
```bash
# Use these for testing
+1234567890    # Primary test number
+1987654321    # Secondary test number  
+1555000001    # Backup test number
```

### Test Email Addresses:
```bash
# Use these for testing
test1@example.com
test2@example.com
mfa@example.com
admin@example.com
```

Remember to clean up test users periodically to keep your user pool organized!

Happy testing! 🚀
