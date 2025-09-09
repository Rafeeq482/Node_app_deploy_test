# AWS Cognito React App

A simple, clean, and easy-to-understand React application with AWS Cognito authentication. Perfect for DevOps trainees learning to deploy React apps on EC2.

## ✨ Features

- 🔐 **Secure Authentication**: AWS Cognito user management
- 📧 **Email Verification**: Built-in email verification workflow
- 🎨 **Clean UI**: Simple and responsive design
- 🚀 **EC2 Ready**: Optimized for deployment on AWS EC2
- 📱 **Mobile Friendly**: Responsive design works on all devices
- 🛡️ **Production Ready**: Includes proper error handling and loading states

## 🏗️ Project Structure

```
cognito-react-app/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/         # React components
│   │   ├── Login.js        # Login form
│   │   ├── Register.js     # Registration form
│   │   └── Dashboard.js    # User dashboard
│   ├── config/
│   │   └── awsConfig.js    # AWS Cognito configuration
│   ├── services/
│   │   └── authService.js  # Authentication service
│   ├── App.js              # Main app component
│   ├── App.css             # Main styles
│   ├── index.js            # App entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
├── DEPLOYMENT_GUIDE.md     # Detailed deployment guide
└── README.md               # This file
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure AWS Cognito
Edit `src/config/awsConfig.js` with your Cognito settings:
```javascript
const awsConfig = {
  Auth: {
    region: 'YOUR_AWS_REGION',           // e.g., 'us-east-1'
    userPoolId: 'YOUR_USER_POOL_ID',     // e.g., 'us-east-1_xxxxxxxxx'
    userPoolWebClientId: 'YOUR_CLIENT_ID' // Your app client ID
  }
};
```

### 3. Start Development Server
```bash
npm start
```

Visit `http://localhost:3000` to see the app.

### 4. Build for Production
```bash
npm run build
```

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build production version
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 📋 AWS Cognito Setup

1. **Create User Pool**:
   - Go to AWS Console → Amazon Cognito
   - Click "Create user pool"
   - Choose "Email" as sign-in option
   - Configure as needed

2. **Configure App Client**:
   - Create an app client in your user pool
   - Note the App Client ID
   - Configure callback URLs

3. **Update Configuration**:
   - Update `src/config/awsConfig.js` with your details

## 🚀 Deployment

For detailed deployment instructions to AWS EC2, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

### Quick EC2 Deployment:
1. Build the app: `npm run build`
2. Upload `build` folder to EC2
3. Install and configure web server
4. Update security groups
5. Test the application

## 🎯 Component Overview

### Login Component (`src/components/Login.js`)
- Simple login form with username/email and password
- Error handling and loading states
- Switch to registration option

### Register Component (`src/components/Register.js`)
- User registration with email verification
- Password confirmation validation
- Email verification code input

### Dashboard Component (`src/components/Dashboard.js`)
- Protected page for authenticated users
- Display user information
- Logout functionality
- Feature overview

### Auth Service (`src/services/authService.js`)
- Wrapper for AWS Cognito operations
- Handles sign up, sign in, sign out
- User verification and status checking

## 🎨 Styling

- Clean, modern design with gradient backgrounds
- Responsive layout works on mobile and desktop
- Easy to customize CSS variables
- Loading states and animations included

## 🔒 Security Features

- AWS Cognito handles password security
- Email verification required
- Secure token-based authentication
- HTTPS ready for production

## 🚨 Troubleshooting

### Common Issues:

1. **Authentication errors**: Check AWS Cognito configuration
2. **CORS issues**: Verify callback URLs in Cognito console
3. **Build failures**: Ensure all dependencies are installed
4. **Deployment issues**: Check security groups and network settings

### Getting Help:

1. Check browser console for errors
2. Review AWS CloudWatch logs
3. Verify Cognito user pool settings
4. Test network connectivity

## 📚 Learning Resources

Perfect for learning:
- React development
- AWS Cognito authentication
- EC2 deployment
- DevOps practices

## 🤝 Contributing

This project is designed for learning. Feel free to:
- Modify the styling
- Add new features
- Improve the deployment process
- Share your improvements

## 📄 License

MIT License - Feel free to use this project for learning and development.

---

**Happy Learning!** 🎉

This project provides a solid foundation for understanding React authentication with AWS Cognito and EC2 deployment.
