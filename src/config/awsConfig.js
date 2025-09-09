// AWS Cognito Configuration
// Replace these values with your actual AWS Cognito settings

const awsConfig = {
  Auth: {
    // Replace with your AWS region (e.g., 'us-east-1', 'us-west-2')
    region: 'ap-south-1',
    
    // Replace with your Cognito User Pool ID
    userPoolId: 'ap-south-1_5yFzLODcX',
    
    // Replace with your Cognito User Pool Web Client ID
    userPoolWebClientId: 'bibaiu32h3624gq6nmjsr9m6f',
    
    // OAuth configuration for social sign-in
    oauth: {
      domain: 'REPLACE-WITH-YOUR-DOMAIN.auth.ap-south-1.amazoncognito.com', // Replace with your actual Cognito domain
      scope: ['email', 'profile', 'openid'],
      redirectSignIn: 'http://localhost:3000/',
      redirectSignOut: 'http://localhost:3000/',
      responseType: 'code'
    }
  }
};

export default awsConfig;
