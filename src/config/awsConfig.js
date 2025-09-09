// AWS Cognito Configuration
// Configuration now reads from environment variables
// Make sure to set up your .env file with the required variables

const awsConfig = {
  Auth: {
    // AWS region from environment variable
    region: process.env.REACT_APP_AWS_REGION,
    
    // Cognito User Pool ID from environment variable
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    
    // Cognito User Pool Web Client ID from environment variable
    userPoolWebClientId: process.env.REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID,
    
    // OAuth configuration for social sign-in
    oauth: {
      domain: process.env.REACT_APP_COGNITO_DOMAIN, // Cognito domain from environment variable
      scope: ['email', 'profile', 'openid'],
      redirectSignIn: process.env.REACT_APP_REDIRECT_SIGN_IN,
      redirectSignOut: process.env.REACT_APP_REDIRECT_SIGN_OUT,
      responseType: 'code'
    }
  }
};

export default awsConfig;
