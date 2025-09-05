# Deployment Guide

This guide will help you deploy Colabship to production using Railway for the backend and Vercel for the frontend.

## Architecture

- **Frontend**: React + Vite deployed on Vercel
- **Backend**: Node.js + Express + PostgreSQL deployed on Railway
- **Database**: PostgreSQL hosted on Railway

## Prerequisites

1. [Railway](https://railway.app) account
2. [Vercel](https://vercel.com) account
3. [GitHub](https://github.com) repository

## Backend Deployment (Railway)

### 1. Set up Railway Project

1. Go to [Railway](https://railway.app) and sign in
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your Colabship repository
4. Railway will automatically detect the backend folder

### 2. Configure Environment Variables

In your Railway project dashboard, go to Variables and add:

```bash
# Database (Railway will provide this automatically)
DATABASE_URL=postgresql://username:password@host:port/database

# JWT Secret (generate a strong secret)
JWT_SECRET=your-super-secret-jwt-key-here

# Server Configuration
PORT=3001
NODE_ENV=production

# Frontend URL (update after Vercel deployment)
FRONTEND_URL=https://your-domain.vercel.app
```

### 3. Deploy Backend

Railway will automatically:
1. Install dependencies (`npm install`)
2. Run database migrations (`npx prisma migrate deploy`)
3. Generate Prisma client (`npx prisma generate`)
4. Start the server (`npm start`)

### 4. Set up Database

1. In Railway dashboard, go to your PostgreSQL service
2. Click "Query" to open the database console
3. Run the schema from `database/schema.sql` or use Prisma migrations

## Frontend Deployment (Vercel)

### 1. Set up Vercel Project

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "New Project" → "Import Git Repository"
3. Select your Colabship repository
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 2. Configure Environment Variables

In Vercel dashboard, go to Settings → Environment Variables and add:

```bash
# Backend API URL (from Railway deployment)
VITE_API_URL=https://your-railway-backend.railway.app/api

# Optional: Analytics, etc.
VITE_APP_NAME=Colabship
```

### 3. Update vercel.json

Update the `vercel.json` file with your actual Railway backend URL:

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://your-actual-railway-url.railway.app/api/$1"
    }
  ]
}
```

### 4. Deploy Frontend

1. Push your changes to GitHub
2. Vercel will automatically deploy
3. Your app will be available at `https://your-project.vercel.app`

## Custom Domain Setup

### 1. Add Domain to Vercel

1. In Vercel dashboard, go to your project
2. Click "Domains" → "Add Domain"
3. Enter your domain name
4. Follow DNS configuration instructions

### 2. Update CORS Settings

Update your Railway backend environment variables:

```bash
FRONTEND_URL=https://yourdomain.com
```

## Database Management

### Prisma Commands

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database
npm run db:seed

# Open Prisma Studio (for development)
npx prisma studio
```

### Railway Database Access

1. Go to Railway dashboard
2. Click on your PostgreSQL service
3. Use the "Query" tab for SQL commands
4. Use the "Connect" tab for connection details

## Monitoring and Logs

### Railway Logs

1. Go to Railway dashboard
2. Click on your backend service
3. View logs in real-time
4. Set up alerts for errors

### Vercel Analytics

1. Enable Vercel Analytics in your project
2. Monitor performance and errors
3. Set up alerts for critical issues

## Security Checklist

- [ ] Strong JWT secret configured
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] HTTPS enforced
- [ ] Environment variables secured
- [ ] Database credentials protected
- [ ] API endpoints protected with authentication

## Troubleshooting

### Common Issues

1. **CORS Errors**: Check `FRONTEND_URL` in Railway environment variables
2. **Database Connection**: Verify `DATABASE_URL` is correct
3. **Build Failures**: Check build logs in Railway/Vercel
4. **Authentication Issues**: Verify JWT secret is set

### Debug Commands

```bash
# Check Railway logs
railway logs

# Test database connection
railway run npx prisma db pull

# Test API endpoints
curl https://your-railway-backend.railway.app/health
```

## Scaling

### Railway Scaling

- Railway automatically scales based on traffic
- Upgrade plan for higher limits
- Use Railway's built-in monitoring

### Vercel Scaling

- Vercel automatically handles scaling
- Edge functions for global performance
- CDN for static assets

## Backup Strategy

### Database Backups

1. Railway provides automatic backups
2. Export data regularly: `pg_dump` or Prisma
3. Store backups in secure location

### Code Backups

1. GitHub provides version control
2. Regular commits and tags
3. Branch protection rules

## Cost Optimization

### Railway

- Start with Hobby plan (free tier)
- Monitor usage and upgrade as needed
- Use Railway's cost calculator

### Vercel

- Hobby plan for personal projects
- Pro plan for production
- Monitor bandwidth usage

## Support

- [Railway Documentation](https://docs.railway.app)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Documentation](https://react.dev)

## Next Steps

1. Set up monitoring and alerts
2. Implement CI/CD pipelines
3. Add automated testing
4. Set up staging environment
5. Implement backup strategies
6. Add performance monitoring
