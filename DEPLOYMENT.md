# Deployment Guide

This guide covers multiple deployment options for the HD Poker Runs NC application.

## Prerequisites

Before deploying, ensure you have:
1. Code pushed to a GitHub repository
2. A MongoDB database (MongoDB Atlas recommended)
3. Environment variables configured

## Deployment Options

### 1. Heroku (Recommended for beginners)

**Cost**: Free tier available, paid plans start at $7/month
**Difficulty**: Easy
**Time to deploy**: 10-15 minutes

#### Steps:
1. **Install Heroku CLI**:
   ```bash
   brew install heroku/brew/heroku
   ```

2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create Heroku app**:
   ```bash
   heroku create your-app-name
   ```

4. **Add MongoDB Atlas add-on** (or use external MongoDB):
   ```bash
   heroku addons:create mongolab:sandbox
   ```

5. **Set environment variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=$(openssl rand -base64 32)
   heroku config:set FRONTEND_URL=https://your-app-name.herokuapp.com
   ```

6. **Deploy**:
   ```bash
   git push heroku main
   ```

**One-Click Deploy Button** (add to README.md):
```markdown
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/your-username/hd-poker-runs-nc)
```

### 2. Railway (Modern and fast)

**Cost**: Free $5 credit monthly, pay-as-you-use
**Difficulty**: Easy
**Time to deploy**: 5-10 minutes

#### Steps:
1. **Visit** [railway.app](https://railway.app)
2. **Connect GitHub** account
3. **Select repository** "hd-poker-runs-nc"
4. **Add MongoDB database** from Railway's database tab
5. **Set environment variables**:
   - `NODE_ENV=production`
   - `JWT_SECRET=your-secret-key`
   - `FRONTEND_URL=your-railway-domain`
6. **Deploy automatically** (Railway detects configuration)

### 3. Vercel (Best for frontend performance)

**Cost**: Free tier generous, Pro at $20/month
**Difficulty**: Medium
**Time to deploy**: 10 minutes

⚠️ **Note**: Vercel is serverless, so you'll need external MongoDB (like MongoDB Atlas)

#### Steps:
1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login and deploy**:
   ```bash
   vercel
   ```

3. **Set environment variables** in Vercel dashboard:
   - `NODE_ENV=production`
   - `MONGODB_URI=your-mongodb-atlas-uri`
   - `JWT_SECRET=your-secret-key`

### 4. DigitalOcean App Platform

**Cost**: $12/month minimum
**Difficulty**: Medium
**Time to deploy**: 15 minutes

#### Steps:
1. **Visit** [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. **Create app** from GitHub repository
3. **Configure** using `.do/app.yaml` specification
4. **Add MongoDB database** cluster
5. **Set environment variables** in DO dashboard
6. **Deploy**

### 5. Docker + VPS (Full control)

**Cost**: VPS from $5/month (DigitalOcean Droplet, Linode, etc.)
**Difficulty**: Advanced
**Time to deploy**: 30+ minutes

#### Steps:
1. **Get VPS** (DigitalOcean, Linode, AWS EC2, etc.)
2. **Install Docker and Docker Compose**:
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   sudo apt install docker-compose
   ```

3. **Clone repository** on VPS:
   ```bash
   git clone https://github.com/your-username/hd-poker-runs-nc.git
   cd hd-poker-runs-nc
   ```

4. **Set environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with production values
   ```

5. **Deploy with Docker**:
   ```bash
   docker-compose up -d
   ```

6. **Set up reverse proxy** (Nginx) for domain/SSL

## Database Setup

### MongoDB Atlas (Recommended)

1. **Create account** at [mongodb.com/atlas](https://mongodb.com/atlas)
2. **Create cluster** (free M0 tier available)
3. **Create database user**
4. **Whitelist IP addresses** (0.0.0.0/0 for all IPs)
5. **Get connection string**: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`

## Environment Variables

Set these variables in your deployment platform:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secure-jwt-secret
FRONTEND_URL=your-deployed-app-url
```

Optional email variables:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Post-Deployment Checklist

- [ ] Test user registration and login
- [ ] Verify event creation and registration
- [ ] Check mobile responsiveness
- [ ] Test file uploads (if implemented)
- [ ] Verify email notifications (if configured)
- [ ] Set up monitoring/error tracking
- [ ] Configure backup strategy for database

## Monitoring and Maintenance

### Recommended Tools:
- **Error Tracking**: Sentry (free tier available)
- **Uptime Monitoring**: UptimeRobot (free)
- **Performance**: Google PageSpeed Insights
- **Analytics**: Google Analytics

### Database Backups:
- MongoDB Atlas: Automatic backups included
- Self-hosted: Set up automated backup scripts

## Domain and SSL

### Custom Domain:
1. **Purchase domain** (Namecheap, GoDaddy, etc.)
2. **Configure DNS** to point to your deployment platform
3. **SSL Certificate**: Most platforms provide free SSL (Let's Encrypt)

### DNS Configuration:
```
Type: A Record
Name: @
Value: [Your server IP]

Type: CNAME
Name: www
Value: your-app-domain.com
```

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are listed in package.json
   - Ensure build script runs locally

2. **Database Connection**:
   - Verify MongoDB URI format
   - Check network access/firewall settings
   - Confirm database user permissions

3. **Environment Variables**:
   - Double-check variable names and values
   - Ensure JWT_SECRET is set and secure
   - Verify FRONTEND_URL matches deployment URL

4. **File Upload Issues**:
   - Configure storage for production (AWS S3, Cloudinary)
   - Check file size limits

## Cost Comparison

| Platform | Free Tier | Paid Plan | Database | SSL | Custom Domain |
|----------|-----------|-----------|----------|-----|---------------|
| Heroku | ✅ (sleep mode) | $7/month | +$9/month | ✅ | ✅ |
| Railway | $5 credit | Pay-as-use | +$5/month | ✅ | ✅ |
| Vercel | ✅ Generous | $20/month | External required | ✅ | ✅ |
| DigitalOcean | ❌ | $12/month | +$15/month | ✅ | ✅ |
| VPS + Docker | ❌ | $5/month | Self-hosted | Setup required | Setup required |

## Recommended Setup for Different Users

- **Hobby/Learning**: Heroku free tier + MongoDB Atlas free
- **Small Business**: Railway or Vercel + MongoDB Atlas
- **Growing Business**: DigitalOcean App Platform + managed database  
- **Enterprise**: VPS with Docker + dedicated database cluster