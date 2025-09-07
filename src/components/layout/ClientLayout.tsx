'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import LoginModal from '@/components/auth/LoginModal'

interface ClientLayoutProps {
  children: React.ReactNode
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const { user, error } = useAuth()

  useEffect(() => {
    // Show login popup on site load if user is not authenticated
    // Add a small delay to ensure smooth page load
    const timer = setTimeout(() => {
      if (!user) {
        setShowLoginPopup(true)
      }
    }, 1000) // 1 second delay after page load

    return () => clearTimeout(timer)
  }, [user])

  // Hide popup when user logs in
  useEffect(() => {
    if (user) {
      setShowLoginPopup(false)
    }
  }, [user])

  return (
    <>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Authentication Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {children}
      <LoginModal 
        isOpen={showLoginPopup} 
        onClose={() => setShowLoginPopup(false)} 
      />
    </>
  )
}

export default ClientLayout
