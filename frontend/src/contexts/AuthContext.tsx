import React, { createContext, useContext, useEffect, useState } from 'react'
import { apiClient } from '@/lib/api'

interface User {
  id: string
  email: string
  name?: string
  avatarUrl?: string
  bio?: string
  timezone?: string
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  availabilityHours?: number
  workStyle?: 'async' | 'sync' | 'hybrid'
  commsPref?: 'text' | 'video' | 'mixed'
  values?: string[]
  isOnboarded?: boolean
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

interface UserProfile extends User {
  offers?: Array<{
    skillId: number
    proficiency: number
    skill: {
      id: number
      name: string
      category: string
    }
  }>
  needs?: Array<{
    skillId: number
    mustHave: boolean
    priority: number
    skill: {
      id: number
      name: string
      category: string
    }
  }>
  matchPreferences?: any
  projectInterests?: any[]
  collaborationPrefs?: any
}

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  signUp: (email: string, password: string, name?: string) => Promise<{ data: any; error: any }>
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>
  signInWithGoogle: () => Promise<{ data: any; error: any }>
  signInWithGitHub: () => Promise<{ data: any; error: any }>
  signOut: () => Promise<{ error: any }>
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing token and verify it
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token')
      if (token) {
        try {
          const response = await apiClient.verifyToken()
          setUser(response.user)
          setProfile(response.user)
        } catch (error) {
          console.error('Token verification failed:', error)
          apiClient.clearToken()
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const loadUserProfile = async () => {
    try {
      const response = await apiClient.getUserProfile()
      setProfile(response.user)
    } catch (error) {
      console.error('Error loading user profile:', error)
    }
  }

  const refreshProfile = async () => {
    await loadUserProfile()
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { data: null, error: new Error('No user logged in') }

    try {
      const response = await apiClient.updateUserProfile(updates)
      setProfile(prev => prev ? { ...prev, ...updates } : null)
      return { data: response, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const response = await apiClient.signIn(email, password)
      setUser(response.user)
      setProfile(response.user)
      return { data: response, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      const response = await apiClient.signUp(email, password, name)
      setUser(response.user)
      setProfile(response.user)
      return { data: response, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const signOut = async () => {
    try {
      await apiClient.signOut()
      setUser(null)
      setProfile(null)
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signInWithGoogle = async () => {
    return { data: null, error: new Error('Google OAuth not implemented yet') }
  }

  const signInWithGitHub = async () => {
    return { data: null, error: new Error('GitHub OAuth not implemented yet') }
  }

  const value: AuthContextType = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithGitHub,
    signOut,
    updateProfile,
    refreshProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 