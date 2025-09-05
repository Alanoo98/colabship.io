# Railway Deployment Fix

## Issue
Railway was trying to install frontend dependencies from the root `package.json` instead of focusing on the backend.

## Solution
I've created the following files to fix the deployment:

### 1. `.nixpacksignore`
This tells Railway to ignore frontend files and only focus on the backend.

### 2. `nixpacks.toml`
This explicitly configures the build process to:
- Install dependencies in the backend directory
- Build the TypeScript backend
- Start the backend server

### 3. Simplified `railway.json`
Removed conflicting build commands and let nixpacks.toml handle the build process.

## Environment Variables Needed
Make sure to set these in your Railway project:

```bash
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-secret-key-here
NODE_ENV=production
PORT=3000
```

## Next Steps
1. Commit these changes to your repository
2. Push to your main branch
3. Railway should automatically redeploy with the correct configuration
4. The build should now focus only on the backend directory

## Expected Build Process
1. Railway detects Node.js project
2. Reads `.nixpacksignore` and skips frontend files
3. Follows `nixpacks.toml` configuration:
   - `cd backend && npm install`
   - `cd backend && npm run build`
   - `cd backend && npm run start`
4. Backend starts on the configured port
5. Health check available at `/api/health`
