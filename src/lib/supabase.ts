import { createClient } from '@supabase/supabase-js'
import { config } from './config'

// Validate environment variables
if (!config.supabase.url || !config.supabase.anonKey) {
  console.error('Missing Supabase environment variables. Please check your .env.local file.')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY')
  // Don't throw error in client-side, just log it
  if (typeof window === 'undefined') {
    throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
  }
}

export const supabase = createClient(
  config.supabase.url || 'https://placeholder.supabase.co', 
  config.supabase.anonKey || 'placeholder-key'
)

// Service role client for server-side operations (bypasses RLS)
// Only create if service role key is available (server-side only)
export const supabaseAdmin = config.supabase.serviceRoleKey ? createClient(
  config.supabase.url, 
  config.supabase.serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
) : null

// Database Types - Simplified Schema
export interface Profile {
  id: string
  email: string
  full_name?: string
  phone?: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description?: string
  image_url?: string
  created_at: string
}

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  image_url?: string
  category_id: string
  stock_quantity?: number
  is_featured: boolean
  is_available: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  customer_email: string
  customer_name: string
  customer_phone?: string
  billing_address: any // JSONB
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: 'pending' | 'completed' | 'failed'
  payment_intent_id?: string
  payment_status?: string
  items: any // JSONB
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
}

export interface Payment {
  id: string
  order_id: string
  amount: number
  payment_method: string
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
  transaction_id?: string
  payment_date?: string
  created_at: string
  updated_at: string
}
