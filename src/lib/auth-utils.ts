import { supabase } from './supabase'

/**
 * Utility functions for authentication
 */

/**
 * Manually confirm a user's email (for admin use)
 * This requires service role key and should only be used server-side
 */
export const confirmUserEmail = async (userId: string) => {
  try {
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      email_confirm: true
    })
    
    if (error) {
      console.error('Error confirming user email:', error.message)
      return { success: false, error: error.message }
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error in confirmUserEmail:', error)
    return { success: false, error: 'Failed to confirm user email' }
  }
}

/**
 * Check if a user's email is confirmed
 */
export const isUserEmailConfirmed = (user: any) => {
  return user?.email_confirmed_at !== null
}

/**
 * Get user confirmation status
 */
export const getUserConfirmationStatus = (user: any) => {
  return {
    isConfirmed: isUserEmailConfirmed(user),
    confirmedAt: user?.email_confirmed_at,
    needsConfirmation: !isUserEmailConfirmed(user)
  }
}
