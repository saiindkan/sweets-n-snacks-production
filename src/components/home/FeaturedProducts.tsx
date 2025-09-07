'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Package } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { Product } from '@/lib/supabase'

// Mock data - replace with actual Supabase data
const mockProducts: Product[] = [
  {
    id: 'test-product-1',
    name: 'Test Sweet - $1 Special',
    description: 'A special test product for cart functionality testing. Perfect for testing checkout flow with no extra taxes or shipping fees.',
    price: 1.00,
    image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category_id: 'sweets',
    stock_quantity: 999,
    is_featured: true,
    is_available: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '1',
    name: 'Gulab Jamun Collection',
    description: 'Traditional Indian sweet balls soaked in rose-flavored sugar syrup',
    price: 18.99,
    image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category_id: 'sweets',
    stock_quantity: 50,
    is_featured: true,
    is_available: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '2',
    name: 'Masala Mixture',
    description: 'Spicy and crunchy Indian snack mix with nuts, spices, and crispy ingredients',
    price: 12.99,
    image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category_id: 'snacks',
    stock_quantity: 75,
    is_featured: true,
    is_available: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '3',
    name: 'Jalebi Delight',
    description: 'Crispy, spiral-shaped Indian sweet soaked in saffron-infused sugar syrup',
    price: 15.99,
    image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category_id: 'sweets',
    stock_quantity: 100,
    is_featured: true,
    is_available: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '4',
    name: 'Murukku Collection',
    description: 'Traditional South Indian rice and lentil snack, crispy and flavorful',
    price: 14.99,
    image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category_id: 'snacks',
    stock_quantity: 30,
    is_featured: true,
    is_available: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  }
]

const FeaturedProducts = () => {
  const [mounted, setMounted] = useState(false)
  const { addItem } = useCartStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Use mockProducts directly to avoid hydration mismatch
  const products = mockProducts
  console.log('Featured products:', products)
  console.log('Test product in featured:', products.find(p => p.id === 'test-product-1'))

  const handleAddToCart = (product: Product) => {
    addItem(product)
  }

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
      {/* Decorative background elements matching hero */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-red-200 to-pink-300 rounded-full translate-x-40 translate-y-40"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-yellow-200 to-amber-300 rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-sm font-medium rounded-full shadow-xl mb-6">
            <span className="mr-2">🌟</span>
            Premium Selection
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Featured Collection
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover our handpicked selection of premium Indian sweets and snacks, carefully curated for the most discerning palates. Each product tells a story of tradition and excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-amber-100 hover:border-amber-200 overflow-hidden transform hover:-translate-y-2"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image_url || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Quick Add to Cart */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="absolute bottom-3 left-3 right-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-2 px-4 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:from-amber-700 hover:to-orange-700 shadow-lg"
                >
                  <ShoppingCart className="h-4 w-4 inline mr-2" />
                  Add to Cart
                </button>
              </div>

              <div className="p-4">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Package key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">(4.8)</span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  <Link 
                    href={`/products/${product.id}`}
                    className="hover:text-amber-600 transition-colors duration-300"
                  >
                    {product.name}
                  </Link>
                </h3>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    ${product.price.toFixed(2)}
                  </span>
                  
                  {product.stock_quantity && product.stock_quantity < 10 && (
                    <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                      Only {product.stock_quantity} left
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-lg rounded-2xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-amber-500/25"
          >
            Explore Full Collection
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Decorative Elements matching hero */}
      <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-20 h-20 bg-gradient-to-br from-red-300 to-pink-400 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Indian-inspired decorative patterns */}
      <div className="absolute top-40 right-40 w-16 h-16 border-2 border-amber-400/30 rounded-full"></div>
      <div className="absolute bottom-40 left-40 w-12 h-12 border-2 border-orange-400/30 rounded-full"></div>
    </section>
  )
}

export default FeaturedProducts
