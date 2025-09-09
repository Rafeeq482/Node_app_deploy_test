# AWS Cognito Configuration Examples

## 🚀 How to Enable Different Features in AWS Console

This guide shows you exactly what to configure in the AWS Cognito console to enable the features demonstrated in the code.

## 📱 1. Enable Phone Number Authentication

### Step 1: Configure Sign-in Options
1. **Go to AWS Console** → Amazon Cognito
2. **Select your User Pool**
3. **Go to "Sign-in experience" tab**
4. **Click "Edit"**
5. **Under "Cognito user pool sign-in options":**
   - ✅ Check **Phone number**
   - ✅ Keep **Email** if you want both options
6. **Save changes**

### Step 2: Configure SMS Settings
1. **Go to "Messaging" tab**
2. **Click "Edit" for SMS**
3. **Configure SMS settings:**
   - **SMS message**: "Your verification code is {####}"
   - **From phone number**: Use Amazon SNS sandbox or configure your own
4. **Save changes**

---

## 👤 2. Add User Attributes

### Standard Attributes
1. **Go to "Sign-up experience" tab**
2. **Click "Edit"**
3. **Under "Required attributes":**
   - ✅ **Email** (already selected)
   - ✅ **Phone number** (if you want it required)
   - ✅ **Given name** (first name)
   - ✅ **Family name** (last name)
   - ✅ **Birthdate**
   - ✅ **Gender**

### Optional Attributes
4. **Under "Optional attributes":**
   - ✅ Select any additional attributes you want
   - ✅ **Address**
   - ✅ **Website**
   - ✅ **Picture**
   - ✅ **Locale**
   - ✅ **Timezone**

### Custom Attributes
5. **Under "Custom attributes":**
   - **Click "Add custom attribute"**
   - **Name**: `department` (will become `custom:department`)
   - **Type**: String
   - **Min/Max Length**: Set as needed
   - **Mutable**: Yes (can be changed)
   - **Required**: No

   **Add more custom attributes:**
   - `employee_id` (Number type)
   - `join_date` (DateTime type)
   - `role` (String type)

---

## 🔐 3. Configure Multi-Factor Authentication (MFA)

### SMS MFA
1. **Go to "Sign-in experience" tab**
2. **Click "Edit"**
3. **Under "Multi-factor authentication":**
   - **MFA enforcement**: `Optional` or `Required`
   - **MFA methods**: ✅ **SMS message**
4. **Configure SMS settings** in "Messaging" tab (see above)

### TOTP MFA (Authenticator Apps)
1. **Under "MFA methods":**
   - ✅ **Authenticator apps**
2. **This enables:**
   - Google Authenticator
   - Microsoft Authenticator
   - Authy
   - Other TOTP apps

### Both SMS + TOTP
1. **Enable both options:**
   - ✅ **SMS message**
   - ✅ **Authenticator apps**
2. **Users can choose their preferred method**

---

## 📧 4. Configure Verification Methods

### Email Verification
1. **Go to "Messaging" tab**
2. **Click "Edit" for Email**
3. **Email verification message:**
   ```
   Subject: Verify your account
   Message: Your verification code is {####}
   ```
4. **Or use verification link:**
   ```
   Subject: Verify your account  
   Message: Click here to verify: {##Click here to verify your account##}
   ```

### Phone Verification
1. **SMS verification message:**
   ```
   Your verification code is {####}
   ```

---

## 🔒 5. Password Policy Configuration

### Default Policy
1. **Go to "Sign-in experience" tab**
2. **Click "Edit"**
3. **Under "Password policy":**
   - **Minimum length**: 8 characters
   - ✅ **Require uppercase letters**
   - ✅ **Require lowercase letters**
   - ✅ **Require numbers**
   - ✅ **Require symbols**

### Custom Policy
```javascript
// Example: Relaxed policy for testing
- Minimum length: 6 characters
- ❌ Uppercase letters (optional)
- ✅ Lowercase letters
- ✅ Numbers
- ❌ Symbols (optional)
```

---

## 🌐 6. Social Sign-in Configuration

### Google Sign-in
1. **Go to "Sign-in experience" tab**
2. **Click "Edit"**
3. **Under "Federated sign-in":**
   - **Add identity provider**
   - **Select "Google"**
4. **Configure Google settings:**
   - **Google app ID**: From Google Console
   - **Google app secret**: From Google Console
   - **Authorized scopes**: `profile email openid`

### Facebook Sign-in
1. **Add identity provider**
2. **Select "Facebook"**
3. **Configure Facebook settings:**
   - **Facebook app ID**: From Facebook Developer Console
   - **Facebook app secret**: From Facebook Developer Console

---

## ⚙️ 7. App Client Configuration

### Web App Configuration
1. **Go to "App integration" tab**
2. **Click your app client**
3. **Click "Edit"**
4. **Configure settings:**
   - **Client secret**: ❌ **Uncheck "Generate a client secret"**
   - **Authentication flows**:
     - ✅ **ALLOW_USER_PASSWORD_AUTH**
     - ✅ **ALLOW_USER_SRP_AUTH** (recommended)
     - ✅ **ALLOW_REFRESH_TOKEN_AUTH**

### OAuth Configuration
1. **Under "OAuth 2.0 settings":**
   - **Callback URLs**: `http://localhost:3000/` (for development)
   - **Sign-out URLs**: `http://localhost:3000/`
   - **OAuth grant types**:
     - ✅ **Authorization code grant**
     - ✅ **Implicit grant** (if needed)
   - **OAuth scopes**:
     - ✅ **email**
     - ✅ **openid**
     - ✅ **profile**

---

## 🎯 8. Quick Setup for Different Scenarios

### Scenario 1: Email Only (Current Setup)
```
✅ Email sign-in
❌ Phone sign-in
✅ Email verification
❌ MFA
✅ Basic password policy
```

### Scenario 2: Phone Number Authentication
```
❌ Email sign-in (optional)
✅ Phone sign-in
✅ SMS verification
✅ SMS MFA (optional)
✅ Standard password policy
```

### Scenario 3: Enterprise Setup
```
✅ Email sign-in
✅ Phone sign-in (backup)
✅ Both email and SMS verification
✅ Required MFA (SMS + TOTP)
✅ Strong password policy
✅ Custom attributes (department, employee_id)
✅ Social sign-in (Google)
```

### Scenario 4: Maximum Security
```
✅ Email + Phone required
✅ MFA required (both SMS + TOTP)
✅ Strong password policy
✅ Account recovery via admin only
✅ Short session duration
✅ Advanced security features enabled
```

---

## 🧪 Testing Your Configuration

### 1. Test Phone Number Registration
```bash
# Try different phone number formats
+1234567890
1234567890
234-567-8900
(234) 567-8900
```

### 2. Test MFA
1. **Register a user**
2. **Enable MFA in user settings**
3. **Test login with MFA challenge**

### 3. Test Custom Attributes
```javascript
// Register with custom attributes
{
  email: 'user@example.com',
  'custom:department': 'Engineering',
  'custom:employee_id': '12345',
  given_name: 'John',
  family_name: 'Doe'
}
```

---

## 🚨 Common Configuration Issues

### 1. Phone Number Issues
- **Problem**: Phone verification not working
- **Solution**: Configure SMS settings in "Messaging" tab
- **Check**: SNS permissions and region support

### 2. MFA Not Working
- **Problem**: MFA challenge not triggered
- **Solution**: Set MFA to "Optional" or "Required"
- **Check**: User has phone number for SMS MFA

### 3. Custom Attributes Not Saving
- **Problem**: Custom attributes rejected
- **Solution**: Use correct format `custom:attribute_name`
- **Check**: Attribute is marked as mutable

### 4. Social Sign-in Errors
- **Problem**: Google/Facebook login fails
- **Solution**: Verify callback URLs match exactly
- **Check**: App secrets and IDs are correct

---

## 📝 Configuration Checklist

### Basic Setup ✅
- [ ] User pool created
- [ ] App client configured (no client secret for web)
- [ ] Sign-in options selected
- [ ] Password policy set
- [ ] Verification method configured

### Advanced Features 🚀
- [ ] Phone number authentication enabled
- [ ] MFA configured (SMS/TOTP)
- [ ] Custom attributes added
- [ ] Social sign-in providers configured
- [ ] Lambda triggers (if needed)

### Testing 🧪
- [ ] Email registration works
- [ ] Phone registration works (if enabled)
- [ ] Login with email works
- [ ] Login with phone works (if enabled)
- [ ] MFA challenges work (if enabled)
- [ ] Custom attributes save correctly

This configuration guide corresponds directly to the code examples in your React app. Follow these steps to enable the features you want to test!
