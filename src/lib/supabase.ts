import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// For development without Supabase, we'll use localStorage
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : null

// Auth helper functions with localStorage fallback
export const auth = {
  // Sign up with email
  signUp: async (email: string, password: string) => {
    if (supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      return { data, error }
    } else {
      // Mock implementation for development
      const mockUser = {
        id: Date.now().toString(),
        email,
        created_at: new Date().toISOString()
      }
      localStorage.setItem('mockUser', JSON.stringify(mockUser))
      return { data: { user: mockUser }, error: null }
    }
  },

  // Sign in with email
  signIn: async (email: string, password: string) => {
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { data, error }
    } else {
      // Mock implementation for development
      const mockUser = {
        id: Date.now().toString(),
        email,
        created_at: new Date().toISOString()
      }
      localStorage.setItem('mockUser', JSON.stringify(mockUser))
      return { data: { user: mockUser }, error: null }
    }
  },

  // Sign in with Google
  signInWithGoogle: async () => {
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      return { data, error }
    } else {
      // Mock implementation for development
      const mockUser = {
        id: Date.now().toString(),
        email: 'mock@google.com',
        created_at: new Date().toISOString()
      }
      localStorage.setItem('mockUser', JSON.stringify(mockUser))
      return { data: { user: mockUser }, error: null }
    }
  },

  // Sign in with GitHub
  signInWithGitHub: async () => {
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      return { data, error }
    } else {
      // Mock implementation for development
      const mockUser = {
        id: Date.now().toString(),
        email: 'mock@github.com',
        created_at: new Date().toISOString()
      }
      localStorage.setItem('mockUser', JSON.stringify(mockUser))
      return { data: { user: mockUser }, error: null }
    }
  },

  // Sign out
  signOut: async () => {
    if (supabase) {
      const { error } = await supabase.auth.signOut()
      return { error }
    } else {
      // Mock implementation for development
      localStorage.removeItem('mockUser')
      return { error: null }
    }
  },

  // Get current user
  getCurrentUser: async () => {
    if (supabase) {
      const { data: { user }, error } = await supabase.auth.getUser()
      return { user, error }
    } else {
      // Mock implementation for development
      const mockUser = localStorage.getItem('mockUser')
      return { user: mockUser ? JSON.parse(mockUser) : null, error: null }
    }
  },

  // Get current session
  getCurrentSession: async () => {
    if (supabase) {
      const { data: { session }, error } = await supabase.auth.getSession()
      return { session, error }
    } else {
      // Mock implementation for development
      const mockUser = localStorage.getItem('mockUser')
      const session = mockUser ? { user: JSON.parse(mockUser) } : null
      return { session, error: null }
    }
  },

  // Reset password
  resetPassword: async (email: string) => {
    if (supabase) {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      })
      return { data, error }
    } else {
      // Mock implementation for development
      return { data: { message: 'Password reset email sent' }, error: null }
    }
  },

  // Update password
  updatePassword: async (password: string) => {
    if (supabase) {
      const { data, error } = await supabase.auth.updateUser({
        password: password
      })
      return { data, error }
    } else {
      // Mock implementation for development
      return { data: { message: 'Password updated' }, error: null }
    }
  },

  // Update user profile
  updateProfile: async (updates: { email?: string; data?: any }) => {
    if (supabase) {
      const { data, error } = await supabase.auth.updateUser(updates)
      return { data, error }
    } else {
      // Mock implementation for development
      return { data: { message: 'Profile updated' }, error: null }
    }
  }
}

// Database helper functions with localStorage fallback
export const db = {
  // Get user profile
  getUserProfile: async (userId: string) => {
    if (supabase) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      return { data, error }
    } else {
      // Mock implementation for development
      const mockProfile = localStorage.getItem(`profile_${userId}`)
      return { 
        data: mockProfile ? JSON.parse(mockProfile) : null, 
        error: null 
      }
    }
  },

  // Update user profile
  updateUserProfile: async (userId: string, updates: any) => {
    if (supabase) {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
      return { data, error }
    } else {
      // Mock implementation for development
      const existingProfile = localStorage.getItem(`profile_${userId}`)
      const updatedProfile = existingProfile 
        ? { ...JSON.parse(existingProfile), ...updates }
        : { id: userId, ...updates }
      localStorage.setItem(`profile_${userId}`, JSON.stringify(updatedProfile))
      return { data: updatedProfile, error: null }
    }
  },

  // Create user profile
  createUserProfile: async (profile: any) => {
    if (supabase) {
      const { data, error } = await supabase
        .from('profiles')
        .insert(profile)
      return { data, error }
    } else {
      // Mock implementation for development
      const mockProfile = { ...profile, id: profile.id || Date.now().toString() }
      localStorage.setItem(`profile_${mockProfile.id}`, JSON.stringify(mockProfile))
      return { data: [mockProfile], error: null }
    }
  }
} 