import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { AuthProvider } from '@/contexts/AuthContext'
import ClientLayout from '@/components/layout/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sweet n Snacks - Authentic Indian Sweets & Snacks Online',
  description: 'Discover the finest collection of authentic Indian sweets and snacks. From traditional mithai to savory namkeen, we have everything to satisfy your Indian food cravings.',
  keywords: 'indian sweets, indian snacks, mithai, namkeen, gulab jamun, jalebi, rasgulla, indian food, online store, traditional treats',
  authors: [{ name: 'Sweet n Snacks' }],
  creator: 'Sweet n Snacks',
  publisher: 'Sweet n Snacks',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sweet-n-snacks.vercel.app',
    title: 'Sweet n Snacks - Authentic Indian Sweets & Snacks Online',
    description: 'Discover the finest collection of authentic Indian sweets and snacks. From traditional mithai to savory namkeen, we have everything to satisfy your Indian food cravings.',
    siteName: 'Sweet n Snacks',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sweet n Snacks - Authentic Indian Sweets & Snacks Online',
    description: 'Discover the finest collection of authentic Indian sweets and snacks. From traditional mithai to savory namkeen, we have everything to satisfy your Indian food cravings.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload logo for immediate display */}
        <link
          rel="preload"
          as="image"
          href="/brand-logos/LOGO_BG.png"
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <AuthProvider>
          <ClientLayout>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
