# Authentication Setup Guide

This guide will help you set up authentication for Colabship.io using Supabase with Google, GitHub, and Email providers.

## 1. Supabase Project Setup

### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and anon key from the API settings

### Environment Variables
Create a `.env` file in your project root with:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 2. Database Schema

Run the following SQL in your Supabase SQL editor:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  timezone TEXT,
  skills TEXT[],
  experience_level TEXT CHECK (experience_level IN ('junior', 'mid', 'senior', 'expert')),
  years_of_experience INTEGER,
  portfolio TEXT[],
  collaboration_style TEXT CHECK (collaboration_style IN ('async', 'sync', 'hybrid')),
  compensation_preferences JSONB DEFAULT '{"equity": false, "revenue_sharing": false, "paid": false}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

## 3. OAuth Provider Setup

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Set Application Type to "Web application"
6. Add authorized redirect URIs:
   - `https://your-project.supabase.co/auth/v1/callback`
   - `http://localhost:5173/auth/callback` (for development)
7. Copy Client ID and Client Secret
8. In Supabase Dashboard → Authentication → Providers → Google:
   - Enable Google provider
   - Add Client ID and Client Secret

### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the form:
   - Application name: Colabship.io
   - Homepage URL: `https://your-domain.com`
   - Authorization callback URL: `https://your-project.supabase.co/auth/v1/callback`
4. Copy Client ID and Client Secret
5. In Supabase Dashboard → Authentication → Providers → GitHub:
   - Enable GitHub provider
   - Add Client ID and Client Secret

## 4. Email Authentication

### Email Templates
In Supabase Dashboard → Authentication → Email Templates, customize:
- Confirm signup
- Reset password
- Magic link

### Email Settings
Configure your email provider in Supabase Dashboard → Authentication → Settings

## 5. Authentication Flow

### Sign Up Flow
1. User clicks "Sign Up" in AuthModal
2. User enters email/password or chooses OAuth provider
3. For email signup: verification email sent
4. For OAuth: redirect to provider, then back to callback
5. User profile created automatically via trigger
6. User redirected to dashboard

### Sign In Flow
1. User clicks "Sign In" in AuthModal
2. User enters credentials or chooses OAuth provider
3. Authentication handled by Supabase
4. User redirected to dashboard

### Password Reset Flow
1. User clicks "Forgot password"
2. User enters email
3. Reset email sent
4. User clicks link in email
5. User sets new password

## 6. Integration with App

### AuthProvider
The `AuthProvider` wraps your app and provides:
- User state management
- Session persistence
- Profile management
- Authentication methods

### Protected Routes
Use the `useAuth` hook to protect routes:

```tsx
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()
  
  if (loading) return <LoadingSpinner />
  if (!user) return <Navigate to="/access" />
  
  return <>{children}</>
}
```

### AuthModal
The `AuthModal` component provides:
- Email/password authentication
- Google OAuth
- GitHub OAuth
- Form validation
- Error handling
- Loading states

## 7. Security Considerations

### Row Level Security (RLS)
- All database operations are protected by RLS policies
- Users can only access their own data
- Admin operations require elevated privileges

### Environment Variables
- Never commit `.env` files to version control
- Use different keys for development and production
- Rotate keys regularly

### OAuth Scopes
- Request minimal scopes from OAuth providers
- Only ask for permissions you actually need
- Document what data you collect

## 8. Testing

### Development Testing
1. Start your development server
2. Test email signup/signin
3. Test OAuth flows
4. Test password reset
5. Test profile updates

### Production Testing
1. Deploy to staging environment
2. Test all authentication flows
3. Verify email delivery
4. Test OAuth redirects
5. Monitor authentication logs

## 9. Troubleshooting

### Common Issues
- **OAuth redirect errors**: Check redirect URIs in provider settings
- **Email not sending**: Verify email provider configuration
- **Profile not created**: Check database trigger and policies
- **Session not persisting**: Verify Supabase client configuration

### Debug Mode
Enable debug mode in development:
```tsx
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  }
})
```

## 10. Next Steps

After setting up authentication:
1. Integrate with your existing access control system
2. Add user profile management
3. Implement role-based permissions
4. Add audit logging
5. Set up monitoring and alerts 