# AWS Cognito React App - Deployment Guide

This guide will help you deploy your React Cognito app to AWS EC2. Perfect for DevOps trainees!

## 📋 Prerequisites

Before deploying, you need:
1. AWS Account
2. AWS Cognito User Pool configured
3. EC2 instance running (Ubuntu/Amazon Linux recommended)
4. Node.js installed on EC2 instance
5. Domain name (optional, but recommended)

## 🏗️ Step 1: Configure AWS Cognito

### 1.1 Create Cognito User Pool
1. Go to AWS Console → Amazon Cognito
2. Click "Create user pool"
3. Choose "Email" as sign-in option
4. Configure password policy as needed
5. Enable "Email" as required attribute
6. Create the pool and note down:
   - **User Pool ID** (e.g., us-east-1_xxxxxxxxx)
   - **App Client ID** (from App Integration tab)

### 1.2 Update Configuration
Edit `src/config/awsConfig.js`:
```javascript
const awsConfig = {
  Auth: {
    region: 'ap-south-1',  // Your AWS region
    userPoolId: 'ap-south-1_aEoN8ugqE',  // Your User Pool ID
    userPoolWebClientId: '21pkhlvrg472tpdl1ap1pl2mul',  // Your App Client ID
  }
};
```

## 🚀 Step 2: Build the Application

### 2.1 Install Dependencies
```bash
npm install
```

### 2.2 Build Production Version
```bash
npm run build
```

This creates a `build` folder with optimized production files.

## 🖥️ Step 3: Deploy to EC2

### 3.1 Connect to Your EC2 Instance
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### 3.2 Install Node.js and npm (if not installed)
```bash
# For Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm -y

# For Amazon Linux
sudo yum update -y
sudo yum install nodejs npm -y
```

### 3.3 Install a Web Server
We'll use `serve` for simplicity:
```bash
sudo npm install -g serve
```

### 3.4 Upload Your Build Files
Option 1 - Using SCP:
```bash
# From your local machine
scp -i your-key.pem -r build/* ubuntu@your-ec2-ip:/home/ubuntu/react-app/
```

Option 2 - Using Git:
```bash
# On EC2 instance
git clone your-repo-url
cd your-repo-name
npm install
npm run build
```

### 3.5 Start the Application
```bash
# Navigate to your app directory
cd /home/ubuntu/react-app

# Start the server
serve -s build -p 3000
```

## 🌐 Step 4: Configure Production Settings

### 4.1 Use PM2 for Process Management
```bash
# Install PM2
sudo npm install -g pm2

# Create ecosystem file
cat > ecosystem.config.js << EOL
module.exports = {
  apps: [{
    name: 'cognito-react-app',
    script: 'serve',
    args: '-s build -p 3000',
    cwd: '/home/ubuntu/react-app',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
}
EOL

# Start with PM2
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

### 4.2 Configure Nginx (Optional but Recommended)
```bash
# Install Nginx
sudo apt install nginx -y

# Create Nginx config
sudo tee /etc/nginx/sites-available/cognito-app << EOL
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain or EC2 public IP
    
    root /home/ubuntu/react-app/build;
    index index.html;
    
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOL

# Enable the site
sudo ln -s /etc/nginx/sites-available/cognito-app /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Test and restart Nginx
sudo nginx -t
sudo systemctl restart nginx
```

## 🔒 Step 5: Security Configuration

### 5.1 EC2 Security Group Settings
Ensure your EC2 security group allows:
- Port 22 (SSH) from your IP
- Port 80 (HTTP) from anywhere (0.0.0.0/0)
- Port 443 (HTTPS) from anywhere (0.0.0.0/0) - if using SSL

### 5.2 Update Cognito Callback URLs
In AWS Cognito Console:
1. Go to your User Pool
2. Click "App integration" tab
3. Edit your App client
4. Add your EC2 domain to allowed callback URLs:
   - `http://your-ec2-ip/` or `http://your-domain.com/`

## 🔧 Step 6: Testing and Monitoring

### 6.1 Test the Application
1. Visit `http://your-ec2-ip` or `http://your-domain.com`
2. Try registering a new user
3. Check email for verification code
4. Test login functionality

### 6.2 Monitor with PM2
```bash
# Check status
pm2 status

# View logs
pm2 logs cognito-react-app

# Restart if needed
pm2 restart cognito-react-app
```

## 🚨 Troubleshooting

### Common Issues:

**1. CORS Errors**
- Check Cognito app client settings
- Ensure callback URLs match your domain

**2. Build Errors**
- Run `npm install` before `npm run build`
- Check Node.js version compatibility

**3. Authentication Not Working**
- Verify AWS region in config
- Check User Pool ID and App Client ID
- Ensure internet connectivity from EC2

**4. App Not Loading**
- Check security group settings
- Verify Nginx configuration
- Check PM2 process status

## 📊 Production Checklist

- [ ] AWS Cognito User Pool configured
- [ ] React app configuration updated
- [ ] App built successfully (`npm run build`)
- [ ] Files uploaded to EC2
- [ ] Web server configured (Nginx + PM2)
- [ ] Security groups configured
- [ ] Domain/SSL configured (optional)
- [ ] Monitoring setup
- [ ] Backup strategy in place

## 🎯 Next Steps for DevOps

Consider implementing:
1. **CI/CD Pipeline**: Use GitHub Actions or AWS CodePipeline
2. **Load Balancer**: AWS Application Load Balancer for high availability
3. **Auto Scaling**: EC2 Auto Scaling Groups
4. **SSL Certificate**: AWS Certificate Manager + Route 53
5. **Monitoring**: CloudWatch, AWS X-Ray
6. **Backup**: Regular snapshots of EC2 instances

## 📞 Support

If you encounter issues:
1. Check AWS CloudWatch logs
2. Review Cognito configuration
3. Verify network connectivity
4. Check EC2 instance health

---

**Congratulations!** 🎉 You've successfully deployed your React Cognito app to EC2!

Your app should now be accessible at `http://your-ec2-ip` or your custom domain.
