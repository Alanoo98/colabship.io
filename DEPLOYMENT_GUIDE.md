# 🚀 Colabship Deployment Guide

This guide will help you deploy Colabship to production with all the necessary configurations.

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database (production)
- Vercel account (for frontend)
- Railway account (for backend)
- Domain name (optional)

## 🎯 Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Vercel)      │◄──►│   (Railway)     │◄──►│   (Railway)     │
│   colabship.io  │    │   api.colabship │    │   PostgreSQL    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🗄️ Database Setup

### Option 1: Railway PostgreSQL (Recommended)

1. **Create Railway account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create new project**
   - Click "New Project"
   - Select "Provision PostgreSQL"

3. **Get connection string**
   - Go to your PostgreSQL service
   - Copy the connection string from "Connect" tab

### Option 2: Supabase PostgreSQL

1. **Create Supabase project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project

2. **Get connection string**
   - Go to Settings > Database
   - Copy the connection string

## 🔧 Backend Deployment (Railway)

### 1. Prepare Backend

```bash
cd backend

# Install dependencies
npm install

# Build the project
npm run build
```

### 2. Deploy to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize Railway project
railway init

# Set environment variables
railway variables set DATABASE_URL="your-postgresql-connection-string"
railway variables set JWT_SECRET="your-super-secret-jwt-key"
railway variables set NODE_ENV="production"
railway variables set FRONTEND_URL="https://colabship.io"

# Deploy
railway up
```

### 3. Run Database Migrations

```bash
# Run migrations
railway run npm run db:migrate

# Seed the database
railway run npm run db:init
```

### 4. Get Backend URL

After deployment, Railway will provide a URL like:
```
https://your-project-name.railway.app
```

## 🎨 Frontend Deployment (Vercel)

### 1. Prepare Frontend

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

### 2. Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 3. Set Environment Variables

In Vercel dashboard:
1. Go to your project
2. Go to Settings > Environment Variables
3. Add:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```

### 4. Custom Domain (Optional)

1. Go to Vercel dashboard
2. Go to Settings > Domains
3. Add your custom domain
4. Update DNS records as instructed

## 🔐 Environment Variables

### Backend (Railway)
```env
DATABASE_URL="postgresql://username:password@host:port/database"
JWT_SECRET="your-super-secret-jwt-key-here"
NODE_ENV="production"
FRONTEND_URL="https://colabship.io"
PORT="3001"
```

### Frontend (Vercel)
```env
VITE_API_URL="https://your-backend-url.railway.app/api"
VITE_ANALYTICS_ID="your-analytics-id" # Optional
```

## 🚀 Quick Deployment Script

Create a `deploy.sh` script:

```bash
#!/bin/bash

echo "🚀 Deploying Colabship to Production..."

# Deploy backend
echo "📦 Deploying backend..."
cd backend
railway up
railway run npm run db:migrate
railway run npm run db:init
cd ..

# Deploy frontend
echo "🎨 Deploying frontend..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Frontend: https://colabship.io"
echo "🔧 Backend: https://your-backend-url.railway.app"
```

Make it executable:
```bash
chmod +x deploy.sh
./deploy.sh
```

## 🔍 Post-Deployment Checklist

### Backend Health Check
- [ ] API responds at `/health`
- [ ] Database connection works
- [ ] Authentication endpoints work
- [ ] CORS is configured correctly

### Frontend Health Check
- [ ] Site loads without errors
- [ ] Authentication flow works
- [ ] API calls are successful
- [ ] All pages are accessible

### Database Health Check
- [ ] Tables are created
- [ ] Skills are seeded
- [ ] Badges are seeded
- [ ] User registration works

## 🛠️ Monitoring & Maintenance

### Railway Monitoring
- Check Railway dashboard for backend logs
- Monitor database performance
- Set up alerts for errors

### Vercel Monitoring
- Check Vercel dashboard for frontend analytics
- Monitor build times
- Set up error tracking

### Database Maintenance
```bash
# Connect to production database
railway connect

# Run maintenance queries
# Check table sizes, indexes, etc.
```

## 🔄 Updates & Rollbacks

### Updating Backend
```bash
cd backend
git pull origin main
railway up
railway run npm run db:migrate  # If schema changes
```

### Updating Frontend
```bash
git pull origin main
vercel --prod
```

### Rollback Backend
```bash
# In Railway dashboard, go to Deployments
# Click on previous deployment to rollback
```

### Rollback Frontend
```bash
# In Vercel dashboard, go to Deployments
# Click on previous deployment to rollback
```

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check `FRONTEND_URL` in backend environment
   - Ensure frontend URL is correct

2. **Database Connection Issues**
   - Verify `DATABASE_URL` is correct
   - Check if database is accessible

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed

4. **Authentication Issues**
   - Verify `JWT_SECRET` is set
   - Check token expiration settings

### Debug Commands

```bash
# Check backend logs
railway logs

# Check frontend build logs
vercel logs

# Test database connection
railway run npx prisma db pull
```

## 📊 Performance Optimization

### Backend Optimization
- Enable compression
- Set up caching headers
- Optimize database queries
- Use connection pooling

### Frontend Optimization
- Enable Vercel's edge functions
- Optimize images
- Use CDN for static assets
- Implement lazy loading

## 🔒 Security Considerations

### Backend Security
- Use strong JWT secrets
- Enable HTTPS only
- Set up rate limiting
- Validate all inputs

### Frontend Security
- Use HTTPS
- Implement CSP headers
- Sanitize user inputs
- Use secure cookies

## 📈 Scaling

### Database Scaling
- Monitor query performance
- Add database indexes
- Consider read replicas
- Implement connection pooling

### Application Scaling
- Monitor CPU and memory usage
- Scale Railway services as needed
- Use Vercel's edge functions
- Implement caching strategies

## 🎉 Success!

Your Colabship platform is now live and ready for users! 

- **Frontend**: https://colabship.io
- **Backend**: https://your-backend-url.railway.app
- **Database**: Connected and seeded

Users can now:
- ✅ Sign up and create profiles
- ✅ Complete onboarding
- ✅ Browse and match with collaborators
- ✅ Connect and start collaborating

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Review Railway and Vercel logs
3. Check the GitHub issues
4. Join our Discord community

Happy collaborating! 🚀