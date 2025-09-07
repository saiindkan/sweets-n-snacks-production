'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Check, X, Phone, Sparkles, Heart } from 'lucide-react'

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const { signUp } = useAuth()
  const router = useRouter()

  // Password strength checking
  const passwordChecks = useMemo(() => {
    const password = formData.password
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }
  }, [formData.password])

  const passwordStrength = useMemo(() => {
    const checks = passwordChecks
    const passedChecks = Object.values(checks).filter(Boolean).length
    const totalChecks = Object.keys(checks).length
    
    if (passedChecks === 0) return { score: 0, label: '', color: '' }
    if (passedChecks <= 2) return { score: 25, label: 'Weak', color: 'bg-red-500' }
    if (passedChecks <= 3) return { score: 50, label: 'Fair', color: 'bg-orange-500' }
    if (passedChecks <= 4) return { score: 75, label: 'Good', color: 'bg-yellow-500' }
    return { score: 100, label: 'Strong', color: 'bg-green-500' }
  }, [passwordChecks])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Clear any previous errors
    setError('')

    // Validation
    if (!formData.fullName.trim()) {
      setError('Full name is required')
      setLoading(false)
      return
    }

    if (!formData.email.trim()) {
      setError('Email is required')
      setLoading(false)
      return
    }

    if (!formData.phone.trim()) {
      setError('Phone number is required')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    // Check password strength
    const passedChecks = Object.values(passwordChecks).filter(Boolean).length
    if (passedChecks < 3) {
      setError('Password must meet at least 3 strength requirements')
      setLoading(false)
      return
    }

    try {
      console.log('🚀 Starting signup process...', {
        email: formData.email,
        fullName: formData.fullName,
        phone: formData.phone
      })
      
      const { error } = await signUp(formData.email, formData.password, formData.fullName, formData.phone)
      
      if (error) {
        console.error('❌ Signup error:', error)
        // Check if user already exists
        if (error.message.includes('already registered') || 
            error.message.includes('already exists') || 
            error.message.includes('User already registered') ||
            error.message.includes('duplicate key value') ||
            error.message.includes('email address is already in use')) {
          // Redirect to login page with error message
          router.push(`/login?error=${encodeURIComponent('User with this email already exists. Please try logging in instead.')}`)
          return
        }
        setError(error.message)
      } else {
        console.log('✅ Signup successful!')
        setSuccess(true)
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    } catch (err) {
      console.error('❌ Unexpected error:', err)
      setError('An unexpected error occurred')
    }

    setLoading(false)
  }



  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Created Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your account has been created! Please sign in with your email and password to start shopping for delicious Indian sweets and snacks.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Premium Background with Food Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50"></div>
      
      {/* Animated Food Icons Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Sweet Icons */}
        <div className="absolute top-20 left-10 w-16 h-16 text-amber-300/20 animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <circle cx="12" cy="12" r="8" fill="currentColor"/>
            <circle cx="12" cy="12" r="4" fill="white" opacity="0.3"/>
          </svg>
        </div>
        <div className="absolute top-32 right-20 w-12 h-12 text-orange-300/20 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <div className="absolute top-60 left-1/4 w-14 h-14 text-red-300/20 animate-bounce" style={{animationDelay: '2s', animationDuration: '3.5s'}}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute bottom-40 right-1/3 w-10 h-10 text-yellow-300/20 animate-bounce" style={{animationDelay: '0.5s', animationDuration: '4.5s'}}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none"/>
          </svg>
        </div>
        <div className="absolute bottom-60 left-1/3 w-18 h-18 text-amber-300/15 animate-bounce" style={{animationDelay: '1.5s', animationDuration: '3.8s'}}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-red-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Decorative Patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-amber-300 rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-orange-300 rounded-full"></div>
          <div className="absolute bottom-32 left-40 w-28 h-28 border border-red-300 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 border border-yellow-300 rounded-full"></div>
        </div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(251, 146, 60, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      


      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-all duration-300 hover:scale-105 group"
          >
            <div className="p-2 rounded-full bg-white/80 shadow-md group-hover:shadow-lg transition-all duration-300">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="ml-3 font-medium">Back to Home</span>
          </Link>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl mb-4 shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                Welcome to Sweet n Snacks
              </h1>
              <p className="text-gray-600">Create your account and start your sweet journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="group">
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors duration-200">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    minLength={2}
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500 hover:border-gray-300"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="group">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors duration-200">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500 hover:border-gray-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="group">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors duration-200">
                    <Phone className="w-5 h-5" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    minLength={10}
                    pattern="[0-9+\-\s\(\)]+"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500 hover:border-gray-300"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="group">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors duration-200">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-14 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500 hover:border-gray-300"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-4 p-4 bg-gray-50/50 rounded-xl border border-gray-200">
                    {/* Strength Bar */}
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${passwordStrength.color}`}
                          style={{ width: `${passwordStrength.score}%` }}
                        />
                      </div>
                      {passwordStrength.label && (
                        <span className={`text-sm font-bold ${
                          passwordStrength.score <= 25 ? 'text-red-600' :
                          passwordStrength.score <= 50 ? 'text-amber-600' :
                          passwordStrength.score <= 75 ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {passwordStrength.label}
                        </span>
                      )}
                    </div>
                    
                    {/* Password Requirements */}
                    <div className="grid grid-cols-1 gap-2">
                      <div className={`flex items-center space-x-2 text-sm ${passwordChecks.length ? 'text-green-600' : 'text-gray-600'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordChecks.length ? 'bg-green-100' : 'bg-gray-100'}`}>
                          {passwordChecks.length ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        </div>
                        <span>At least 8 characters</span>
                      </div>
                      <div className={`flex items-center space-x-2 text-sm ${passwordChecks.uppercase ? 'text-green-600' : 'text-gray-600'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordChecks.uppercase ? 'bg-green-100' : 'bg-gray-100'}`}>
                          {passwordChecks.uppercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        </div>
                        <span>One uppercase letter</span>
                      </div>
                      <div className={`flex items-center space-x-2 text-sm ${passwordChecks.lowercase ? 'text-green-600' : 'text-gray-600'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordChecks.lowercase ? 'bg-green-100' : 'bg-gray-100'}`}>
                          {passwordChecks.lowercase ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        </div>
                        <span>One lowercase letter</span>
                      </div>
                      <div className={`flex items-center space-x-2 text-sm ${passwordChecks.number ? 'text-green-600' : 'text-gray-600'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordChecks.number ? 'bg-green-100' : 'bg-gray-100'}`}>
                          {passwordChecks.number ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        </div>
                        <span>One number</span>
                      </div>
                      <div className={`flex items-center space-x-2 text-sm ${passwordChecks.special ? 'text-green-600' : 'text-gray-600'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordChecks.special ? 'bg-green-100' : 'bg-gray-100'}`}>
                          {passwordChecks.special ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        </div>
                        <span>One special character</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="group">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors duration-200">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-14 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500 hover:border-gray-300"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-red-800 text-sm font-medium">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    <span className="text-lg">Creating Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    <span className="text-lg">Create Account</span>
                  </div>
                )}
              </button>


            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Already have an account?</span>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  href="/login"
                  className="inline-flex items-center px-6 py-3 border-2 border-amber-500 text-amber-600 font-semibold rounded-xl hover:bg-amber-50 hover:border-amber-600 transition-all duration-300 transform hover:scale-105"
                >
                  <span>Sign in here</span>
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Link>
              </div>
              <p className="text-gray-600 text-sm mt-4 max-w-sm mx-auto">
                If you get an error saying the email already exists, you can use the link above to sign in.
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage