'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { emailService } from '@/lib/email-service'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
  signUp: (email: string, password: string, fullName: string, phone?: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Error getting session:', error)
          setError(error.message)
        } else {
          setSession(session)
          setUser(session?.user ?? null)
        }
      } catch (err) {
        console.error('Error in getInitialSession:', err)
        setError('Failed to initialize authentication')
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        try {
          console.log('🔄 Auth State Change:', { 
            event, 
            hasUser: !!session?.user, 
            userEmail: session?.user?.email,
            userId: session?.user?.id 
          })
          setSession(session)
          setUser(session?.user ?? null)
          setError(null) // Clear any previous errors
        } catch (err) {
          console.error('Error in auth state change:', err)
          setError('Authentication error')
        } finally {
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, fullName: string, phone?: string) => {
    console.log('🚀 Starting signup process...', { email, fullName, phone, passwordLength: password.length })
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
        },
        emailRedirectTo: undefined, // Disable email confirmation
      },
    })
    
    if (error) {
      console.error('❌ Signup error:', error)
    } else {
      console.log('✅ Signup successful:', { 
        user: data.user?.id, 
        email: data.user?.email,
        emailConfirmed: data.user?.email_confirmed_at,
        session: data.session?.access_token ? 'Session created' : 'No session'
      })
      
      // Send welcome email
      if (data.user?.email) {
        try {
          await emailService.sendWelcomeEmail(data.user.email, fullName)
          console.log('✅ Welcome email sent successfully')
        } catch (emailError) {
          console.error('❌ Failed to send welcome email:', emailError)
          // Don't fail the signup if email fails
        }
      }
    }
    
    return { error }
  }

  const signIn = async (email: string, password: string) => {
    console.log('🔐 Attempting to sign in with:', { email, passwordLength: password.length })
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      console.error('❌ Sign in error:', error)
    } else {
      console.log('✅ Sign in successful:', { user: data.user?.id, email: data.user?.email })
      
      // Send login notification email
      if (data.user?.email && data.user?.user_metadata?.full_name) {
        try {
          const loginTime = new Date().toLocaleString('en-US', {
            timeZone: 'UTC',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
          })
          
          await emailService.sendLoginNotificationEmail(
            data.user.email, 
            data.user.user_metadata.full_name, 
            loginTime
          )
          console.log('✅ Login notification email sent successfully')
        } catch (emailError) {
          console.error('❌ Failed to send login notification email:', emailError)
          // Don't fail the login if email fails
        }
      }
    }
    
    return { error }
  }



  const signOut = async () => {
    await supabase.auth.signOut()
    // Redirect to homepage after sign out
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  }



  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { error }
  }

  const value = {
    user,
    session,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
