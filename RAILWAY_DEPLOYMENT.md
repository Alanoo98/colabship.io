# 🚀 Railway Deployment Guide

## **Option 1: Monorepo with Railway (Recommended)**

Yes, you can connect your entire repo to Railway! Here's how to do it properly:

### **Step 1: Connect Repository to Railway**

1. **Go to [Railway.app](https://railway.app)**
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your `colabship.io` repository**
6. **Railway will automatically detect it's a monorepo**

### **Step 2: Configure Backend Service**

Railway will create a service, but you need to configure it for the backend:

#### **Service Settings:**
- **Name**: `colabship-backend`
- **Root Directory**: `backend/` (set this in Railway dashboard)
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start`
- **Port**: `3001` (Railway will auto-detect)

#### **Environment Variables:**
Add these in Railway dashboard:
```env
NODE_ENV=production
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-here
DATABASE_URL=postgresql://username:password@host:port/database
```

### **Step 3: Add PostgreSQL Database**

1. **In your Railway project, click "New"**
2. **Select "Database" → "PostgreSQL"**
3. **Railway will create a PostgreSQL database**
4. **Copy the `DATABASE_URL` from the database service**
5. **Add it to your backend service environment variables**

### **Step 4: Deploy Database Schema**

After deployment, run the database migration:

```bash
# Connect to your Railway backend service
railway connect

# Run database migration
cd backend
npm run db:migrate-seed
```

## **Option 2: Separate Repositories (Alternative)**

If you prefer to separate frontend and backend:

### **Backend Repository:**
1. **Create new repo**: `colabship-backend`
2. **Copy only backend files**:
   ```
   colabship-backend/
   ├── src/
   ├── prisma/
   ├── package.json
   ├── tsconfig.json
   └── railway.json
   ```
3. **Deploy to Railway**

### **Frontend Repository:**
1. **Keep current repo** for frontend
2. **Deploy to Vercel** (better for React apps)

## **Recommended: Monorepo Approach**

**Why monorepo is better for your case:**

### **✅ Advantages:**
- **Single repository** to manage
- **Shared configuration** and documentation
- **Easier development** workflow
- **Simpler CI/CD** setup
- **Railway handles monorepos** well

### **✅ Railway Monorepo Features:**
- **Automatic detection** of multiple services
- **Root directory configuration** per service
- **Shared environment variables**
- **Integrated database** services

## **Deployment Steps (Monorepo)**

### **1. Prepare Your Repository**
Your repo is already ready with:
- ✅ `railway.json` configuration
- ✅ Backend health check endpoints
- ✅ Proper build scripts
- ✅ Environment variable setup

### **2. Connect to Railway**
1. **Go to Railway.app**
2. **New Project → Deploy from GitHub**
3. **Select your repository**
4. **Railway will auto-detect the backend**

### **3. Configure Service**
In Railway dashboard:
- **Root Directory**: `backend/`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start`

### **4. Add Database**
1. **New → Database → PostgreSQL**
2. **Copy DATABASE_URL**
3. **Add to backend service environment variables**

### **5. Deploy**
Railway will automatically:
- ✅ Install dependencies
- ✅ Build the TypeScript code
- ✅ Start the server
- ✅ Run health checks

## **Environment Variables Setup**

### **Required Variables:**
```env
NODE_ENV=production
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-here
DATABASE_URL=postgresql://username:password@host:port/database
```

### **Optional Variables:**
```env
CORS_ORIGIN=https://your-frontend-domain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## **Post-Deployment Steps**

### **1. Run Database Migration**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Connect to your project
railway login
railway link

# Run migration
railway run --service backend npm run db:migrate-seed
```

### **2. Test Your API**
```bash
# Test health check
curl https://your-railway-app.railway.app/api/health

# Test API endpoints
curl https://your-railway-app.railway.app/api/skills
```

### **3. Update Frontend API URL**
Update your frontend to use the Railway backend URL:
```typescript
// In src/lib/api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-railway-app.railway.app/api';
```

## **Railway vs Vercel for Frontend**

### **Railway (Backend) ✅**
- **Perfect for Node.js APIs**
- **Built-in PostgreSQL**
- **Environment variables**
- **Health checks**
- **Auto-scaling**

### **Vercel (Frontend) ✅**
- **Optimized for React/Next.js**
- **Edge functions**
- **CDN distribution**
- **Automatic deployments**
- **Better performance for static sites**

## **Recommended Architecture**

```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │
│   (Vercel)      │◄──►│   (Railway)     │
│   React App     │    │   Node.js API   │
└─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Database      │
                       │   (Railway      │
                       │   PostgreSQL)   │
                       └─────────────────┘
```

## **Cost Considerations**

### **Railway Pricing:**
- **Free tier**: $5 credit monthly
- **Pro plan**: $20/month
- **Database**: Included in plans

### **Vercel Pricing:**
- **Free tier**: Unlimited personal projects
- **Pro plan**: $20/month for teams

## **Quick Start Commands**

```bash
# 1. Deploy to Railway
# Go to railway.app → New Project → Deploy from GitHub

# 2. Add PostgreSQL database
# In Railway dashboard → New → Database → PostgreSQL

# 3. Set environment variables
# Add DATABASE_URL and JWT_SECRET

# 4. Run database migration
railway run --service backend npm run db:migrate-seed

# 5. Test deployment
curl https://your-app.railway.app/api/health
```

## **🎉 Result**

You'll have:
- ✅ **Backend API** running on Railway
- ✅ **PostgreSQL database** connected
- ✅ **Health checks** working
- ✅ **Environment variables** configured
- ✅ **Database seeded** with skills and demo users
- ✅ **Ready for frontend** connection

**Your backend will be live and ready to serve your frontend!** 🚀
