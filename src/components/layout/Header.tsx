'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingCart, Menu, X, User, LogOut, UserCheck, UserCircle, Package } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useAuth } from '@/contexts/AuthContext'
import CartSidebar from '@/components/cart/CartSidebar'
import Logo from '@/components/ui/Logo'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { toggleCart, getTotalItems } = useCartStore()
  const { user, signOut } = useAuth()
  
  const totalItems = getTotalItems()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  // Add Orders to navigation if user is signed in
  const fullNavigation = user 
    ? [...navigation, { name: 'Orders', href: '/orders' }]
    : navigation

  return (
    <>
      <header className={`sticky top-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white shadow-lg border-b border-gray-200' 
          : 'bg-white shadow-md'
      }`}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo with animation */}
            <div className="flex-shrink-0 mr-4 sm:mr-8 lg:mr-16 group">
              <div className="transform transition-all duration-500 group-hover:scale-105 group-hover:-rotate-1">
                <Logo showText={true} />
              </div>
            </div>

            {/* Desktop Navigation with blood orange hover */}
            <nav className="hidden md:flex space-x-4 lg:space-x-6 xl:space-x-10 ml-4 lg:ml-8">
              {fullNavigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-gray-700 hover:text-white px-4 py-3 text-sm font-medium transition-all duration-500 ease-in-out rounded-lg group overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10 transition-all duration-500 group-hover:scale-105">
                    {item.name}
                  </span>
                  {/* Blood orange background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform scale-0 group-hover:scale-100 rounded-lg"></div>
                  {/* Smooth glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out rounded-lg blur-sm"></div>
                </Link>
              ))}
            </nav>

            {/* Right side icons - Clean Design */}
            <div className="flex items-center space-x-4 lg:space-x-6">
              {user ? (
                <div className="flex items-center space-x-4">
                  {/* User Profile - Clean Design */}
                  <div className="relative group">
                    <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 group">
                      {/* User Avatar */}
                      <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                        {(user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase()}
                      </div>
                      
                      {/* User Name - Hidden on small screens */}
                      <div className="hidden lg:block">
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                          {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                        </span>
                      </div>
                      
                      {/* Dropdown Arrow */}
                      <div className="hidden lg:block">
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    
                    {/* User dropdown - Clean Design */}
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {/* User Info Header */}
                      <div className="p-4 border-b border-gray-100 bg-gray-50 rounded-t-xl">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {(user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {user.user_metadata?.full_name || 'User'}
                            </p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="p-2">
                        <Link
                          href="/profile"
                          className="w-full flex items-center px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        >
                          <UserCircle className="w-4 h-4 mr-3 text-gray-400" />
                          Profile Settings
                        </Link>
                        <Link
                          href="/orders"
                          className="w-full flex items-center px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        >
                          <Package className="w-4 h-4 mr-3 text-gray-400" />
                          My Orders
                        </Link>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          onClick={signOut}
                          className="w-full flex items-center px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="relative p-2 sm:p-3 text-gray-700 hover:text-primary-600 transition-all duration-300 rounded-md hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 group overflow-hidden"
                >
                  <User className="h-5 w-5 sm:h-6 sm:w-6 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12" />
                  {/* Pulse effect on hover */}
                  <div className="absolute inset-0 rounded-md bg-blue-200/20 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping"></div>
                </Link>
              )}

              {/* Cart Icon - Clean Design */}
              <div className="relative">
                <button
                  onClick={toggleCart}
                  className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                >
                  <ShoppingCart className="h-5 w-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
                  
                  {/* Cart Badge */}
                  {mounted && totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                      {totalItems > 9 ? '9+' : totalItems}
                    </span>
                  )}
                </button>
              </div>

              {/* Mobile menu button - Clean Design */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-gray-600" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation with blood orange hover */}
          <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200/50">
              {fullNavigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-white rounded-lg transition-all duration-500 ease-in-out group relative overflow-hidden"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="flex items-center relative z-10 transition-all duration-500 group-hover:scale-105">
                    <span className="w-2 h-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
                    {item.name}
                  </span>
                  {/* Blood orange background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform scale-0 group-hover:scale-100 rounded-lg"></div>
                </Link>
              ))}
              
              {/* Mobile Auth Links - Clean Design */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                {user ? (
                  <div className="px-3 py-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {(user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {user.user_metadata?.full_name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Link
                        href="/profile"
                        className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-white rounded-md transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <UserCircle className="w-4 h-4 mr-3 text-gray-400" />
                        Profile Settings
                      </Link>
                      <Link
                        href="/orders"
                        className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-white rounded-md transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Package className="w-4 h-4 mr-3 text-gray-400" />
                        My Orders
                      </Link>
                      <button
                        onClick={() => {
                          signOut()
                          setIsMenuOpen(false)
                        }}
                        className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Link
                      href="/login"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-white rounded-lg transition-all duration-500 ease-in-out group relative overflow-hidden"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="relative z-10 transition-all duration-500 group-hover:scale-105">Sign In</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform scale-0 group-hover:scale-100 rounded-lg"></div>
                    </Link>
                    <Link
                      href="/signup"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-white rounded-lg transition-all duration-500 ease-in-out group relative overflow-hidden"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="relative z-10 transition-all duration-500 group-hover:scale-105">Create Account</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform scale-0 group-hover:scale-100 rounded-lg"></div>
                    </Link>
                  </div>
                )}
              </div>


            </div>
          </div>
        </div>
      </header>
      
      <CartSidebar />
    </>
  )
}

export default Header
