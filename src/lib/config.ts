export const config = {
  // Supabase Configuration
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  },
  

  
  // Email Configuration
  email: {
    service: process.env.EMAIL_SERVICE || 'smtp',
    smtp: {
      host: process.env.SMTP_HOST!,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
    fromEmail: process.env.FROM_EMAIL || process.env.SMTP_FROM || 'info@indkanworldwideexim.com',
    fromName: process.env.FROM_NAME || 'INDKAN Sweet n Snacks',
  },

  // Stripe Configuration
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY!,
    secretKey: process.env.STRIPE_SECRET_KEY!,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
  },
  
  // Site Configuration
  site: {
    name: process.env.NEXT_PUBLIC_SITE_NAME || 'INDKAN',
    subtitle: process.env.NEXT_PUBLIC_SITE_SUBTITLE || 'Sweets N Snacks',
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Authentic Indian Sweets N Snacks Online',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    logoUrl: process.env.NEXT_PUBLIC_COMPANY_LOGO_URL || process.env.NEXT_PUBLIC_WEBSITE_LOGO_URL || '',
  },
  
  // Default Images (can be overridden with environment variables)
  images: {
    hero: process.env.NEXT_PUBLIC_DEFAULT_HERO_IMAGE || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    product: process.env.NEXT_PUBLIC_DEFAULT_PRODUCT_IMAGE || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_IMAGE || 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  
  // App Configuration
  app: {
    maxProductsPerPage: 24,
    maxCartItems: 50,
    currency: 'USD',
    defaultLanguage: 'en',
  }
}

// Validate required environment variables
export const validateEnv = () => {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SMTP_HOST',
    'SMTP_USER',
    'SMTP_PASS'
  ]
  
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
  
  // Warn about optional but recommended variables
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('⚠️ SUPABASE_SERVICE_ROLE_KEY not set - order status updates will not work')
  }
}
