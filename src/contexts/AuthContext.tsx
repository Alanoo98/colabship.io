import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, auth, db } from '@/lib/supabase'

interface UserProfile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  bio?: string
  location?: string
  timezone?: string
  skills?: string[]
  experience_level?: 'junior' | 'mid' | 'senior' | 'expert'
  years_of_experience?: number
  portfolio?: string[]
  collaboration_style?: 'async' | 'sync' | 'hybrid'
  compensation_preferences?: {
    equity: boolean
    revenue_sharing: boolean
    paid: boolean
  }
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<{ data: any; error: any }>
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>
  signInWithGoogle: () => Promise<{ data: any; error: any }>
  signInWithGitHub: () => Promise<{ data: any; error: any }>
  signOut: () => Promise<{ error: any }>
  resetPassword: (email: string) => Promise<{ data: any; error: any }>
  updatePassword: (password: string) => Promise<{ data: any; error: any }>
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ data: any; error: any }>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { session } = await auth.getCurrentSession()
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await loadUserProfile(session.user.id)
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes (only if Supabase is configured)
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setSession(session)
          setUser(session?.user ?? null)
          
          if (session?.user) {
            await loadUserProfile(session.user.id)
          } else {
            setProfile(null)
          }
          
          setLoading(false)
        }
      )

      return () => subscription.unsubscribe()
    }
  }, [])

  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await db.getUserProfile(userId)
      if (error) {
        console.error('Error loading user profile:', error)
        // If profile doesn't exist, create a basic one
        if (error.code === 'PGRST116') {
          await createBasicProfile(userId)
        }
      } else {
        setProfile(data)
      }
    } catch (error) {
      console.error('Error loading user profile:', error)
    }
  }

  const createBasicProfile = async (userId: string) => {
    const basicProfile: Partial<UserProfile> = {
      id: userId,
      email: user?.email || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    try {
      const { data, error } = await db.createUserProfile(basicProfile)
      if (!error && data) {
        setProfile(data[0] as UserProfile)
      }
    } catch (error) {
      console.error('Error creating basic profile:', error)
    }
  }

  const refreshProfile = async () => {
    if (user) {
      await loadUserProfile(user.id)
    }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { data: null, error: new Error('No user logged in') }

    try {
      const { data, error } = await db.updateUserProfile(user.id, {
        ...updates,
        updated_at: new Date().toISOString()
      })
      
      if (!error && data) {
        setProfile(prev => prev ? { ...prev, ...updates } : null)
      }
      
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 AuthContext.signIn called with:', { email, password });
      
      // Handle demo admin login
      if (email === 'admin@example.com' && password === 'admin123') {
        console.log('🎯 Demo login detected, creating mock session...');
        
        // Create a mock user session for demo
        const mockUser = {
          id: 'demo-user-id',
          email: 'admin@example.com',
          user_metadata: {
            full_name: 'Demo Admin'
          }
        } as User;
        
        const mockSession = {
          user: mockUser,
          access_token: 'demo-token',
          refresh_token: 'demo-refresh',
          expires_at: Date.now() + 3600000 // 1 hour
        } as Session;
        
        console.log('👤 Setting mock user and session...');
        setSession(mockSession);
        setUser(mockUser);
        
        // Create or load demo profile
        const demoProfile: UserProfile = {
          id: 'demo-user-id',
          email: 'admin@example.com',
          full_name: 'Demo Admin',
          avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          bio: 'Full-stack developer passionate about building scalable web applications. Love working with React, Node.js, and cloud technologies.',
          location: 'San Francisco, CA',
          timezone: 'America/Los_Angeles',
          skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
          experience_level: 'senior',
          years_of_experience: 5,
          portfolio: ['TaskFlow SaaS', 'DataViz Analytics'],
          collaboration_style: 'async',
          compensation_preferences: {
            equity: true,
            revenue_sharing: true,
            paid: true
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        console.log('📝 Setting demo profile...');
        setProfile(demoProfile);
        
        console.log('✅ Demo login completed successfully');
        return { data: mockSession, error: null };
      }
      
      // Regular Supabase authentication
      if (supabase) {
        const { data, error } = await auth.signInWithPassword({
          email,
          password,
        })
        
        if (error) throw error
        
        return { data, error: null }
      } else {
        // Mock authentication for development
        const { data, error } = await auth.signIn(email, password)
        return { data, error }
      }
    } catch (error) {
      return { data: null, error }
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      if (supabase) {
        const { data, error } = await auth.signUp({
          email,
          password,
        })
        
        if (error) throw error
        
        return { data, error: null }
      } else {
        // Mock signup for development
        const { data, error } = await auth.signUp(email, password)
        return { data, error }
      }
    } catch (error) {
      return { data: null, error }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await auth.signOut()
      setUser(null)
      setProfile(null)
      setSession(null)
      return { error }
    } catch (error) {
      return { error }
    }
  }

  const value: AuthContextType = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle: auth.signInWithGoogle,
    signInWithGitHub: auth.signInWithGitHub,
    signOut,
    resetPassword: auth.resetPassword,
    updatePassword: auth.updatePassword,
    updateProfile,
    refreshProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 