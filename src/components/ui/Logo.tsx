'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { config } from '@/lib/config'

interface LogoProps {
  className?: string
  showText?: boolean
}

const Logo = ({ className = '', showText = true }: LogoProps) => {
  const [imageError, setImageError] = useState(false)
  
  // Use logo directly from public folder
  const logoPath = '/brand-logos/LOGO_BG.png'
  
  // Show custom logo if no image error
  const shouldShowCustomLogo = !imageError
  
  return (
    <Link href="/" className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Image or Icon */}
      <div className="logo-container flex-shrink-0">
        {shouldShowCustomLogo ? (
          // Use logo directly from public folder
          <div className="w-12 h-12 relative image-container bg-transparent flex items-center justify-center">
            <Image
              src={logoPath}
              alt={`${config.site.name} Logo`}
              width={48}
              height={48}
              className="object-contain image-loaded"
              sizes="48px"
              priority
              quality={100}
              style={{ backgroundColor: 'transparent' }}
              onError={(e) => {
                console.error('Logo image failed to load:', logoPath, e)
                setImageError(true)
              }}
              onLoad={() => {
                console.log('Logo image loaded successfully:', logoPath)
                setImageError(false)
              }}
            />
          </div>
        ) : (
          // Fallback to default icon - always visible
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg logo-default shadow-lg flex items-center justify-center">
            {/* Sweet icon representation */}
            <div className="w-8 h-8 relative">
              {/* Main sweet shape */}
              <div className="w-8 h-8 bg-white rounded-full opacity-90 shadow-sm"></div>
              {/* Decorative elements */}
              <div className="absolute top-1 left-1 w-1 h-1 bg-amber-600 rounded-full"></div>
              <div className="absolute top-1 right-1 w-1 h-1 bg-amber-600 rounded-full"></div>
              <div className="absolute bottom-1 left-1 w-1 h-1 bg-orange-600 rounded-full"></div>
              <div className="absolute bottom-1 right-1 w-1 h-1 bg-amber-600 rounded-full"></div>
              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-amber-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            {/* Small accent */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full border-2 border-white shadow-sm"></div>
          </div>
        )}
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col justify-center">
          <span className="text-xl font-black text-blue-800 leading-tight tracking-tight uppercase">
            {config.site.name}
          </span>
          <span className="text-xs text-secondary-600 font-black leading-tight tracking-tight uppercase">
            {config.site.subtitle}
          </span>
        </div>
      )}
    </Link>
  )
}

export default Logo
