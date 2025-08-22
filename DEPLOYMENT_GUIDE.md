# Colabship.io Beta Deployment Guide

## 🚀 **Deploy to Vercel (Recommended)**

### **Step 1: Prepare for Deployment**
```bash
# Build the project
npm run build

# Test the build locally
npm run preview
```

### **Step 2: Deploy to Vercel**
1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings:**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables (Optional):**
   ```env
   VITE_APP_NAME=Colabship
   VITE_APP_VERSION=beta
   ```

4. **Deploy:**
   - Click "Deploy"
   - Your app will be live at `https://your-project.vercel.app`

## 🗄️ **Free Database Alternatives to Supabase**

### **Option 1: PlanetScale (Recommended)**
- **Free Tier:** 1 database, 1 billion reads/month, 10 million writes/month
- **Pros:** MySQL compatible, great performance, generous free tier
- **Setup:** [planetscale.com](https://planetscale.com)

### **Option 2: Neon (PostgreSQL)**
- **Free Tier:** 3 projects, 0.5GB storage, shared compute
- **Pros:** PostgreSQL, serverless, branching
- **Setup:** [neon.tech](https://neon.tech)

### **Option 3: Railway**
- **Free Tier:** $5 credit monthly, PostgreSQL/MySQL
- **Pros:** Easy setup, good documentation
- **Setup:** [railway.app](https://railway.app)

### **Option 4: Turso (SQLite)**
- **Free Tier:** 1 database, 1GB storage, 1 billion reads/month
- **Pros:** SQLite, edge deployment, very fast
- **Setup:** [turso.tech](https://turso.tech)

## 🔐 **Beta Access System**

### **Current Setup:**
- **10 Invite Codes:** Hardcoded in the app
- **Access Control:** localStorage-based
- **Protected Routes:** All main pages require beta access

### **Invite Codes:**
```
BETA2025
84739201
15673948
29384756
48573926
73948561
38475629
75629384
29384765
84739265
```

### **Beta Access Flow:**
1. User visits `/beta`
2. Enters invite code
3. Code is validated
4. Access granted and stored in localStorage
5. Redirected to main app

## 📊 **Database Schema (When Ready)**

### **Users Table:**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  beta_code VARCHAR(10),
  is_member BOOLEAN DEFAULT false,
  project_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **Projects Table:**
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  creator_id UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **Beta Codes Table:**
```sql
CREATE TABLE beta_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(10) UNIQUE NOT NULL,
  is_used BOOLEAN DEFAULT false,
  used_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔧 **Next Steps for Full Beta**

### **Phase 1: Basic Database Integration**
1. Choose a database provider
2. Set up database connection
3. Move beta codes to database
4. Add user registration

### **Phase 2: Core Features**
1. Project creation/management
2. User profiles
3. Basic collaboration tools

### **Phase 3: Payment Integration**
1. Stripe integration for €9/month
2. Membership management
3. Usage tracking

## 🌐 **Custom Domain Setup**

### **Vercel Domain Configuration:**
1. Go to your Vercel project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `colabship.io`)
4. Update DNS records as instructed

### **DNS Records:**
```
Type: A
Name: @
Value: 76.76.19.36

Type: CNAME
Name: www
Value: your-project.vercel.app
```

## 📈 **Analytics & Monitoring**

### **Free Analytics:**
- **Vercel Analytics:** Built-in with Vercel
- **Google Analytics:** Free tier
- **Plausible:** Privacy-focused, $9/month

### **Error Monitoring:**
- **Sentry:** Free tier available
- **Vercel Error Tracking:** Built-in

## 🔒 **Security Considerations**

### **Current Security:**
- ✅ Client-side beta access (simple but effective for MVP)
- ✅ Protected routes
- ✅ Input validation

### **Future Security:**
- 🔄 Server-side authentication
- 🔄 JWT tokens
- 🔄 Rate limiting
- 🔄 Input sanitization

## 📱 **Mobile Optimization**

### **Current Status:**
- ✅ Responsive design
- ✅ Touch-friendly interfaces
- ✅ Mobile-first approach

### **Testing:**
- Test on various devices
- Check mobile performance
- Verify touch interactions

## 🎯 **Beta Launch Checklist**

- [ ] Deploy to Vercel
- [ ] Test all invite codes
- [ ] Verify protected routes work
- [ ] Test mobile responsiveness
- [ ] Set up custom domain
- [ ] Configure analytics
- [ ] Prepare beta user onboarding
- [ ] Create feedback collection system

## 📞 **Support & Feedback**

### **Beta User Communication:**
- Email list for beta users
- Discord/Slack community
- Feedback form in the app
- Regular updates and announcements

### **Monitoring:**
- Track beta code usage
- Monitor user engagement
- Collect feedback systematically
- Iterate based on user input 