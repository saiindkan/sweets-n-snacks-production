'use client'

import { useCartStore } from '@/store/cartStore'
import { useAuth } from '@/contexts/AuthContext'
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, Heart, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const CartPage = () => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    getTotalPrice,
    getTotalItems 
  } = useCartStore()
  const { user } = useAuth()

  const [isRemoving, setIsRemoving] = useState<string | null>(null)

  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()
  const shipping = totalPrice > 50 ? 0 : 5.99
  const tax = totalPrice * 0.08 // 8% tax
  const finalTotal = totalPrice + shipping + tax

  const handleRemoveItem = async (productId: string) => {
    setIsRemoving(productId)
    // Add a small delay for better UX
    setTimeout(() => {
      removeItem(productId)
      setIsRemoving(null)
    }, 300)
  }

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Link 
              href="/"
              className="p-2 hover:bg-white/50 rounded-full transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>

          {/* Empty Cart State */}
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full flex items-center justify-center shadow-2xl">
                <ShoppingBag className="h-16 w-16 text-amber-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">0</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-800 mb-8 max-w-md font-medium">
              Looks like you haven't added any delicious sweets and snacks to your cart yet. 
              Let's fix that!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Browse Products
              </Link>
              <Link
                href="/categories"
                className="border-2 border-amber-500 text-amber-600 px-8 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-all duration-300"
              >
                View Categories
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="p-2 hover:bg-white/50 rounded-full transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-800 font-semibold">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>
            </div>
          </div>
          
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div 
                key={item.product.id} 
                className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 ${
                  isRemoving === item.product.id ? 'opacity-50 scale-95' : 'hover:shadow-xl'
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Product Image */}
                  <div className="relative w-full sm:w-32 h-48 sm:h-32 flex-shrink-0">
                    <Image
                      src={item.product.image_url || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-xl"
                      sizes="(max-width: 640px) 100vw, 128px"
                    />
                    <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-md border border-gray-200">
                      <Heart className="h-4 w-4 text-red-500 hover:text-red-600 transition-colors" />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-colors border border-red-300"
                        disabled={isRemoving === item.product.id}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {item.product.description && (
                      <p className="text-gray-800 text-sm mb-3 line-clamp-2 font-medium">
                        {item.product.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-amber-600">
                        ${item.product.price.toFixed(2)}
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-full transition-colors border border-amber-300"
                          disabled={isRemoving === item.product.id}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-lg font-bold px-4 py-2 bg-amber-500 text-white rounded-lg min-w-[3rem] text-center shadow-md">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-full transition-colors border border-amber-300"
                          disabled={isRemoving === item.product.id}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Item Total */}
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-800 font-semibold">Item Total:</span>
                        <span className="text-xl font-bold text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-800 font-semibold">Subtotal ({totalItems} items)</span>
                  <span className="font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-800 font-semibold">Shipping</span>
                  <span className="font-bold text-gray-900">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-800 font-semibold">Tax</span>
                  <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-amber-600">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Free Shipping Progress */}
              {totalPrice < 50 && (
                <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-amber-800">Free shipping on orders over $50</span>
                  </div>
                  <div className="w-full bg-amber-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((totalPrice / 50) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-amber-800 mt-1 font-semibold">
                    Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                {user ? (
                  <Link
                    href="/checkout"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center block"
                  >
                    Proceed to Checkout
                  </Link>
                ) : (
                  <div className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-semibold shadow-lg text-center block relative">
                    <div className="flex items-center justify-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Login Required for Checkout</span>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <Link
                        href="/login"
                        className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300"
                      >
                        Sign Up
                      </Link>
                    </div>
                  </div>
                )}
                
                <Link
                  href="/products"
                  className="w-full border-2 border-amber-500 text-amber-600 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-all duration-300 text-center block"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-gray-300">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-700 font-medium">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span>Secure checkout guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
