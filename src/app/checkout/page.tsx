'use client'

import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard, Shield, Truck, Lock, CheckCircle, AlertCircle, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder'
)

// Card validation utilities
const validateCardNumber = (cardNumber: string): { isValid: boolean; type: string } => {
  const cleaned = cardNumber.replace(/\s/g, '')
  
  // Luhn algorithm
  const luhnCheck = (num: string): boolean => {
    let sum = 0
    let isEven = false
    
    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num[i])
      
      if (isEven) {
        digit *= 2
        if (digit > 9) {
          digit -= 9
        }
      }
      
      sum += digit
      isEven = !isEven
    }
    
    return sum % 10 === 0
  }
  
  // Card type detection
  const getCardType = (num: string): string => {
    if (/^4/.test(num)) return 'visa'
    if (/^5[1-5]/.test(num)) return 'mastercard'
    if (/^3[47]/.test(num)) return 'amex'
    if (/^6/.test(num)) return 'discover'
    return 'unknown'
  }
  
  const isValid = cleaned.length >= 13 && cleaned.length <= 19 && luhnCheck(cleaned)
  const type = getCardType(cleaned)
  
  return { isValid, type }
}

const validateCVV = (cvv: string, cardType: string): boolean => {
  const cleaned = cvv.replace(/\s/g, '')
  if (cardType === 'amex') {
    return /^\d{4}$/.test(cleaned)
  }
  return /^\d{3}$/.test(cleaned)
}

const validateExpiry = (expiry: string): boolean => {
  const [month, year] = expiry.split('/')
  if (!month || !year) return false
  
  const monthNum = parseInt(month)
  const yearNum = parseInt('20' + year)
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1
  
  if (monthNum < 1 || monthNum > 12) return false
  if (yearNum < currentYear) return false
  if (yearNum === currentYear && monthNum < currentMonth) return false
  
  return true
}

const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\s/g, '')
  const groups = cleaned.match(/.{1,4}/g) || []
  return groups.join(' ')
}

// Payment Form Component
const PaymentForm = () => {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore()
  const { user } = useAuth()
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [redirectCountdown, setRedirectCountdown] = useState(5)
  const [autoRedirect, setAutoRedirect] = useState(true)
  
  // Auto-redirect to orders page after successful payment
  useEffect(() => {
    if (isSuccess && autoRedirect && redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (isSuccess && autoRedirect && redirectCountdown === 0) {
      router.push('/orders')
    }
  }, [isSuccess, autoRedirect, redirectCountdown, router])
  
  // Form state - pre-fill with user data if available
  const [formData, setFormData] = useState({
    cardholderName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  })
  
  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()
  const shipping = totalPrice > 50 ? 0 : 5.99
  const tax = totalPrice * 0.08
  const finalTotal = totalPrice + shipping + tax

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        cardholderName: user.user_metadata?.full_name || prev.cardholderName,
        email: user.email || prev.email
      }))
    }
  }, [user])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required'
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required'
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Valid phone number is required'
    }
    
    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'State is required'
    }
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!stripe || !elements) {
      return
    }
    
    if (!validateForm()) {
      return
    }
    
    setIsProcessing(true)
    
    try {
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items,
          customerInfo: formData
        }),
      })
      
      const { clientSecret, orderId } = await response.json()
      
      if (!clientSecret) {
        throw new Error('Failed to create payment intent')
      }
      
      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: formData.cardholderName,
            email: formData.email,
            phone: formData.phone,
            address: {
              line1: formData.address,
              city: formData.city,
              state: formData.state,
              postal_code: formData.zipCode,
              country: formData.country,
            },
          },
        },
      })
      
      if (error) {
        console.error('Payment failed:', error)
        setErrors({ payment: error.message || 'Payment failed' })
        setIsProcessing(false)
      } else if (paymentIntent.status === 'succeeded') {
        setIsProcessing(false)
        setIsSuccess(true)
        
        // Update order status immediately as fallback
        try {
          console.log('🔄 Attempting to update order status for orderId:', orderId)
          
          // Small delay to ensure order is fully created
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const updateResponse = await fetch('/api/update-order-status', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderId: orderId,
              status: 'completed',
              paymentIntentId: paymentIntent.id,
              paymentStatus: 'succeeded'
            }),
          })
          
          if (updateResponse.ok) {
            console.log('✅ Order status updated successfully')
            const result = await updateResponse.json()
            console.log('📋 Update response:', result)
          } else {
            console.error('❌ Failed to update order status')
            const errorText = await updateResponse.text()
            console.error('📋 Error response:', errorText)
          }
        } catch (error) {
          console.error('❌ Error updating order status:', error)
        }
        
        // Clear cart after successful payment
        setTimeout(() => {
          clearCart()
        }, 2000)
      }
    } catch (error) {
      console.error('Payment error:', error)
      setErrors({ payment: 'Payment processing failed. Please try again.' })
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some items to your cart before checking out.</p>
          <Link
            href="/products"
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-orange-100 px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-4">
            Thank you for your order! You will receive a confirmation email shortly.
          </p>
          {autoRedirect && (
            <p className="text-amber-600 font-semibold mb-4">
              Redirecting to your orders in {redirectCountdown} seconds...
            </p>
          )}
          {autoRedirect && (
            <button
              onClick={() => setAutoRedirect(false)}
              className="text-sm text-gray-500 hover:text-gray-700 underline mb-4"
            >
              Cancel auto-redirect
            </button>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/orders"
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-orange-100 px-8 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
            >
              View Your Orders Now
            </Link>
            <Link
              href="/"
              className="border-2 border-amber-500 text-amber-700 px-8 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link 
            href="/cart"
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Lock className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Payment Information</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Stripe Card Element */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Card Information *
                </label>
                <div className="p-4 border-2 border-gray-300 rounded-lg bg-white">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#374151',
                          fontFamily: 'system-ui, sans-serif',
                          '::placeholder': {
                            color: '#9CA3AF',
                          },
                        },
                        invalid: {
                          color: '#EF4444',
                        },
                      },
                    }}
                  />
                </div>
                {errors.payment && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.payment}
                  </p>
                )}
              </div>

              {/* Cardholder Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  value={formData.cardholderName}
                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 border-2 rounded-lg text-lg font-medium text-gray-900 bg-white ${
                    errors.cardholderName ? 'border-red-500' : 'border-gray-300 focus:border-amber-500'
                  } focus:outline-none`}
                />
                {errors.cardholderName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.cardholderName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 border-2 rounded-lg text-lg font-medium text-gray-900 bg-white ${
                    errors.email ? 'border-red-500' : 'border-gray-300 focus:border-amber-500'
                  } focus:outline-none`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className={`w-full px-4 py-3 border-2 rounded-lg text-lg font-medium text-gray-900 bg-white ${
                    errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-amber-500'
                  } focus:outline-none`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Billing Address */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Billing Address</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="123 Main Street"
                      className={`w-full px-4 py-3 border-2 rounded-lg text-lg font-medium text-gray-900 bg-white ${
                        errors.address ? 'border-red-500' : 'border-gray-300 focus:border-amber-500'
                      } focus:outline-none`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="New York"
                        className={`w-full px-4 py-3 border-2 rounded-lg text-lg font-medium text-gray-900 bg-white ${
                          errors.city ? 'border-red-500' : 'border-gray-300 focus:border-amber-500'
                        } focus:outline-none`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="NY"
                        className={`w-full px-4 py-3 border-2 rounded-lg text-lg font-medium text-gray-900 bg-white ${
                          errors.state ? 'border-red-500' : 'border-gray-300 focus:border-amber-500'
                        } focus:outline-none`}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.state}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      placeholder="10001"
                      className={`w-full px-4 py-3 border-2 rounded-lg text-lg font-medium text-gray-900 bg-white ${
                        errors.zipCode ? 'border-red-500' : 'border-gray-300 focus:border-amber-500'
                      } focus:outline-none`}
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.zipCode}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-orange-100 py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Payment...</span>
                  </div>
                ) : (
                  `Pay $${finalTotal.toFixed(2)}`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.product.image_url || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-lg"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-black font-semibold">Subtotal</span>
                  <span className="font-semibold text-green-600">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black font-semibold">Shipping</span>
                  <span className="font-semibold text-green-600">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black font-semibold">Tax</span>
                  <span className="font-semibold text-green-600">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t border-gray-200 pt-3">
                  <span className="text-black">Total</span>
                  <span className="text-green-600">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Security Features</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">256-bit SSL encryption</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Lock className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">PCI DSS compliant</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Secure payment processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Checkout Page Component
const CheckoutPage = () => {
  const { items } = useCartStore()
  const { user, loading } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    )
  }

  // Check if user is authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="h-10 w-10 text-orange-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to proceed with checkout. Please sign in to continue with your purchase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-orange-100 px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="border-2 border-amber-500 text-amber-700 px-6 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-all duration-300"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some items to your cart before checking out.</p>
          <Link
            href="/products"
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-orange-100 px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  // Check if Stripe is properly configured
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-10 w-10 text-orange-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Stripe Not Configured</h1>
          <p className="text-gray-600 mb-6">
            Please set up your Stripe environment variables to enable payment processing.
          </p>
          <Link
            href="/cart"
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-orange-100 px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    )
  }

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  )
}

export default CheckoutPage
