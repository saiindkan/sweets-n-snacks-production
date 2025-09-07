'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

const ProtectedRoute = ({ children, redirectTo = '/login' }: ProtectedRouteProps) => {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [timeoutReached, setTimeoutReached] = useState(false)

  // Debug logging
  console.log('🔍 ProtectedRoute state:', { user: !!user, loading, userEmail: user?.email, timeoutReached })

  // Set a timeout to prevent infinite loading
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        console.log('⏰ Auth loading timeout reached')
        setTimeoutReached(true)
      }, 5000) // 5 second timeout

      return () => clearTimeout(timer)
    } else {
      setTimeoutReached(false)
    }
  }, [loading])

  // Show loading spinner while checking authentication (with timeout)
  if (loading && !timeoutReached) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
          <p className="text-sm text-gray-500 mt-2">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Show sign-in prompt if not authenticated or if timeout reached
  if (!user || timeoutReached) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-10 w-10 text-orange-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6">
              {timeoutReached 
                ? "Authentication is taking longer than expected. Please sign in to continue."
                : "You need to be signed in to access this page. Please sign in to continue."
              }
            </p>
            <div className="space-y-3">
              <a
                href="/login"
                className="block w-full bg-gradient-to-r from-amber-500 to-orange-500 text-orange-100 px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="block w-full border-2 border-amber-500 text-amber-700 px-6 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-all duration-300"
              >
                Create Account
              </a>
              <a
                href="/"
                className="block w-full text-gray-500 hover:text-gray-700 transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render protected content
  return <>{children}</>
}

export default ProtectedRoute
