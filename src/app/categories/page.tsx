'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Package, Filter, Grid, List, ArrowRight, ChevronRight, Heart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { Product } from '@/lib/supabase'

// Import the same product data from products page
const mockProducts: Product[] = [
  // 5 Sweets
  {
    id: 'sweet-1',
    name: 'Dry Fruit Laddu',
    description: 'Dry fruit laddu is a traditional Indian sweet made with a mixture of dry fruits, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.',
    price: 14.99,
    image_url: '/product-images/DRYFRUIT%20LADOO.jpg',
    category_id: 'sweets',
    stock_quantity: 50,
    is_featured: true,
    is_available: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'sweet-2',
    name: 'Methi Laddu',
    description: 'Methi laddu is a traditional Indian sweet made with a mixture of methi seeds, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.',
    price: 14.99,
    image_url: '/product-images/METHI%20LADOO.jpg',
    category_id: 'sweets',
    stock_quantity: 45,
    is_featured: false,
    is_available: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'sweet-3',
    name: 'Dink Laddu',
    description: 'Dink laddu is a traditional Indian sweet made with a mixture of dink seeds, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.',
    price: 14.99,
    image_url: '/product-images/Dink%20Laddu.jpg',
    category_id: 'sweets',
    stock_quantity: 60,
    is_featured: false,
    is_available: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'sweet-4',
    name: 'Nachani Laddu',
    description: 'Nachani laddu is a traditional Indian sweet made with a mixture of nachani seeds, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.',
    price: 14.99,
    image_url: '/product-images/NACHANI%20LADOO.jpg',
    category_id: 'sweets',
    stock_quantity: 40,
    is_featured: true,
    is_available: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'sweet-5',
    name: 'Besan Laddu',
    description: 'Besan laddu is a traditional Indian sweet made with a mixture of besan, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.',
    price: 14.99,
    image_url: '/product-images/BESAN%20LADDU.jpg',
    category_id: 'sweets',
    stock_quantity: 55,
    is_featured: false,
    is_available: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'sweet-6',
    name: 'Khaajoor Laddu',
    description: 'Khaajoor laddu is a traditional Indian sweet made with a mixture of khaajoor, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.',
    price: 14.99,
    image_url: '/product-images/KHAJUR%20LADDU.jpg',
    category_id: 'sweets',
    stock_quantity: 55,
    is_featured: false,
    is_available: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  
  // 4 Snacks
  {
    id: 'snack-1',
    name: 'Yellow Poha Chiwda',
    description: 'Yellow poha chiwda is a traditional Indian snack made with a mixture of yellow poha, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.',
    price: 14.99,
    image_url: '/product-images/Yellow%20Poha%20Chiwda.jpg',
    category_id: 'snacks',
    stock_quantity: 70,
    is_featured: true,
    is_available: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'snack-2',
    name: 'Sweet Shankarpale',
    description: 'Sweet shankarpale is a traditional Indian snack made with a mixture of sweet shankarpale, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.',
    price: 14.99,
    image_url: '/product-images/SHANKARAPALLE.jpg',
    category_id: 'snacks',
    stock_quantity: 65,
    is_featured: false,
    is_available: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'snack-3',
    name: 'Bhaajani Chakli',
    description: 'Bhaajani chakli is a traditional Indian snack made with a mixture of bhaajani chakli, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.',
    price: 14.99,
    image_url: '/product-images/CHAKLI.jpg',
    category_id: 'snacks',
    stock_quantity: 80,
    is_featured: false,
    is_available: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'snack-4',
    name: 'Teekha Sev',
    description: 'Teekha sev is a traditional Indian snack made with a mixture of teekha sev, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.',
    price: 14.99,
    image_url: '/product-images/TheekaSev.jpg',
    category_id: 'snacks',
    stock_quantity: 55,
    is_featured: true,
    is_available: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  }
]

const CategoriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('sweets')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<string>('name')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const { addItem, items: cartItems, updateQuantity } = useCartStore()

  const categories = [
    { 
      id: 'sweets', 
      name: 'Sweets', 
      description: 'Traditional Indian mithai and desserts',
      icon: '🍬',
      color: 'from-pink-500 to-rose-500'
    },
    { 
      id: 'snacks', 
      name: 'Snacks', 
      description: 'Crunchy namkeen and savory treats',
      icon: '🥨',
      color: 'from-orange-500 to-amber-500'
    }
  ]

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'featured', label: 'Featured First' }
  ]

  const filteredProducts = mockProducts.filter(product => {
    if (product.category_id !== selectedCategory) return false
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'featured':
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0)
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const handleAddToCart = (product: Product) => {
    addItem(product, 1)
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full mb-8 shadow-lg border border-gray-200">
            <span className="text-2xl">🍬</span>
            <span className="text-primary-600 font-bold text-lg">Categories</span>
            <span className="text-2xl">🥨</span>
          </div>
          <h1 className="text-6xl font-black text-gray-900 mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Shop by Category
          </h1>
          <p className="text-xl text-gray-700 font-medium max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated categories of authentic Indian sweets and snacks, each offering unique flavors and traditional experiences.
          </p>
        </div>

        {/* Category Cards */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`group cursor-pointer bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border-4 ${
                selectedCategory === category.id
                  ? 'border-primary-500 shadow-2xl'
                  : 'border-transparent hover:border-gray-200'
              }`}
            >
              <div className={`h-32 bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                <span className="text-6xl">{category.icon}</span>
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{category.description}</p>
                <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary-100 text-primary-800'
                    : 'bg-gray-100 text-gray-700 group-hover:bg-primary-50 group-hover:text-primary-700'
                }`}>
                  <span>Explore</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filters */}
              <div className="lg:w-64 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                  <button
                    onClick={() => {
                      setPriceRange([0, 100])
                      setSortBy('name')
                    }}
                    className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    Reset
                  </button>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg text-gray-900 font-bold">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex space-x-3">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-24 px-3 py-2 border-2 border-gray-200 rounded-lg text-base font-medium focus:border-primary-500 focus:outline-none"
                        placeholder="Min"
                      />
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-24 px-3 py-2 border-2 border-gray-200 rounded-lg text-base font-medium focus:border-primary-500 focus:outline-none"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {/* Controls */}
                <div className="bg-gray-50 p-6 rounded-2xl mb-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-black text-gray-900">
                          {sortedProducts.length}
                        </span>
                        <span className="text-lg text-gray-600 font-medium">
                          {sortedProducts.length === 1 ? 'Product' : 'Products'} Found
                        </span>
                      </div>
                      
                      <div className="h-8 w-px bg-gray-300"></div>
                      
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-6 py-3 border-2 border-gray-200 rounded-xl text-lg font-bold text-gray-900 bg-white focus:border-primary-500 focus:outline-none cursor-pointer"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">View:</span>
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-3 rounded-xl transition-all duration-300 ${
                          viewMode === 'grid'
                            ? 'bg-primary-100 text-primary-800 shadow-lg'
                            : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                        }`}
                      >
                        <Grid className="h-6 w-6" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-3 rounded-xl transition-all duration-300 ${
                          viewMode === 'list'
                            ? 'bg-primary-100 text-primary-800 shadow-lg'
                            : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                        }`}
                      >
                        <List className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Products Grid */}
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedProducts.map((product) => (
                      <div key={product.id} className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border overflow-hidden transform hover:-translate-y-2 ${
                        product.category_id === 'sweets' 
                          ? 'border-pink-200 hover:border-pink-300' 
                          : 'border-orange-200 hover:border-orange-300'
                      }`}>
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <Image
                            src={product.image_url || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            unoptimized
                          />
                          {product.is_featured && (
                            <div className={`absolute top-4 left-4 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg ${
                              product.category_id === 'sweets'
                                ? 'bg-gradient-to-r from-pink-500 to-rose-500'
                                : 'bg-gradient-to-r from-orange-500 to-amber-500'
                            }`}>
                              ⭐ Featured
                            </div>
                          )}
                          <div className="absolute top-4 right-4">
                            <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                              <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide ${
                              product.category_id === 'sweets'
                                ? 'text-pink-600 bg-pink-50 border border-pink-200'
                                : 'text-orange-600 bg-orange-50 border border-orange-200'
                            }`}>
                              {product.category_id === 'sweets' ? '🍬 Sweet' : '🥨 Snack'}
                            </span>
                            <span className="text-sm text-gray-500 font-medium">
                              {product.stock_quantity} in stock
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                          
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <span className={`text-3xl font-bold ${
                                product.category_id === 'sweets' ? 'text-pink-600' : 'text-orange-600'
                              }`}>
                                ${product.price}
                              </span>
                              <span className="text-sm text-gray-500 ml-2">USD</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Package key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                              <span className="text-sm text-gray-500 ml-1">(4.8)</span>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            {/* Show quantity controls only if item is in cart */}
                            {cartItems.find(item => item.product.id === product.id) ? (
                              <div className="flex items-center justify-center space-x-3 mb-3">
                                <button 
                                  onClick={() => {
                                    const currentQty = cartItems.find(item => item.product.id === product.id)?.quantity || 0;
                                    if (currentQty > 0) {
                                      updateQuantity(product.id, currentQty - 1);
                                    }
                                  }}
                                  className={`w-10 h-10 rounded-lg border-2 transition-colors flex items-center justify-center font-bold text-lg ${
                                    product.category_id === 'sweets'
                                      ? 'border-pink-200 hover:border-pink-500 text-pink-600 hover:text-pink-700'
                                      : 'border-orange-200 hover:border-orange-500 text-orange-600 hover:text-orange-700'
                                  }`}
                                >
                                  -
                                </button>
                                <span className={`w-16 h-10 rounded-lg border-2 flex items-center justify-center font-bold text-gray-900 ${
                                  product.category_id === 'sweets'
                                    ? 'bg-pink-50 border-pink-200'
                                    : 'bg-orange-50 border-orange-200'
                                }`}>
                                  {cartItems.find(item => item.product.id === product.id)?.quantity || 0}
                                </span>
                                <button 
                                  onClick={() => {
                                    const currentQty = cartItems.find(item => item.product.id === product.id)?.quantity || 0;
                                    updateQuantity(product.id, currentQty + 1);
                                  }}
                                  className={`w-10 h-10 rounded-lg border-2 transition-colors flex items-center justify-center font-bold text-lg ${
                                    product.category_id === 'sweets'
                                      ? 'border-pink-200 hover:border-pink-500 text-pink-600 hover:text-pink-700'
                                      : 'border-orange-200 hover:border-orange-500 text-orange-600 hover:text-orange-700'
                                  }`}
                                >
                                  +
                                </button>
                              </div>
                            ) : null}
                            
                            <button
                              onClick={() => handleAddToCart(product)}
                              className={`w-full text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 ${
                                product.category_id === 'sweets'
                                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600'
                                  : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
                              }`}
                            >
                              <ShoppingCart className="h-6 w-6" />
                              <span>Add to Cart</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {sortedProducts.map((product) => (
                      <div key={product.id} className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border overflow-hidden group ${
                        product.category_id === 'sweets' 
                          ? 'border-pink-200 hover:border-pink-300' 
                          : 'border-orange-200 hover:border-orange-300'
                      }`}>
                        <div className="flex">
                          <div className="w-80 h-56 relative overflow-hidden">
                            <Image
                              src={product.image_url || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                              sizes="256px"
                            />
                            {product.is_featured && (
                              <div className={`absolute top-3 left-3 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg ${
                                product.category_id === 'sweets'
                                  ? 'bg-gradient-to-r from-pink-500 to-rose-500'
                                  : 'bg-gradient-to-r from-orange-500 to-amber-500'
                              }`}>
                                ⭐ Featured
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 p-8">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex-1">
                                <div className="flex items-center space-x-4 mb-3">
                                  <span className={`text-sm font-semibold px-4 py-2 rounded-full uppercase tracking-wide ${
                                    product.category_id === 'sweets'
                                      ? 'text-pink-600 bg-pink-50 border border-pink-200'
                                      : 'text-orange-600 bg-orange-50 border border-orange-200'
                                  }`}>
                                    {product.category_id === 'sweets' ? '🍬 Sweet' : '🥨 Snack'}
                                  </span>
                                  <span className="text-sm text-gray-500 font-medium">
                                    {product.stock_quantity} in stock
                                  </span>
                                </div>
                                
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                                  {product.name}
                                </h3>
                                <p className="text-gray-600 text-base mb-4 leading-relaxed max-w-2xl">
                                  {product.description}
                                </p>
                              </div>
                              
                              <div className="text-right">
                                <span className={`text-4xl font-bold ${
                                  product.category_id === 'sweets' ? 'text-pink-600' : 'text-orange-600'
                                }`}>
                                  ${product.price}
                                </span>
                                <span className="text-sm text-gray-500 ml-2">USD</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              {/* Show quantity controls only if item is in cart */}
                              {cartItems.find(item => item.product.id === product.id) ? (
                                <div className="flex items-center space-x-3">
                                  <button 
                                    onClick={() => {
                                      const currentQty = cartItems.find(item => item.product.id === product.id)?.quantity || 0;
                                      if (currentQty > 0) {
                                        updateQuantity(product.id, currentQty - 1);
                                      }
                                    }}
                                    className={`w-12 h-12 rounded-xl border-2 transition-colors flex items-center justify-center font-bold text-xl ${
                                      product.category_id === 'sweets'
                                        ? 'border-pink-200 hover:border-pink-500 text-pink-600 hover:text-pink-700'
                                        : 'border-orange-200 hover:border-orange-500 text-orange-600 hover:text-orange-700'
                                    }`}
                                  >
                                    -
                                  </button>
                                  <span className={`w-20 h-12 rounded-xl border-2 flex items-center justify-center font-bold text-gray-900 text-lg ${
                                    product.category_id === 'sweets'
                                      ? 'bg-pink-50 border-pink-200'
                                      : 'bg-orange-50 border-orange-200'
                                  }`}>
                                    {cartItems.find(item => item.product.id === product.id)?.quantity || 0}
                                  </span>
                                  <button 
                                    onClick={() => {
                                      const currentQty = cartItems.find(item => item.product.id === product.id)?.quantity || 0;
                                      updateQuantity(product.id, currentQty + 1);
                                    }}
                                    className={`w-12 h-12 rounded-xl border-2 transition-colors flex items-center justify-center font-bold text-xl ${
                                      product.category_id === 'sweets'
                                        ? 'border-pink-200 hover:border-pink-500 text-pink-600 hover:text-pink-700'
                                        : 'border-orange-200 hover:border-orange-500 text-orange-600 hover:text-orange-700'
                                    }`}
                                  >
                                    +
                                  </button>
                                </div>
                              ) : null}
                              
                              <button
                                onClick={() => handleAddToCart(product)}
                                className={`py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3 text-white ${
                                  product.category_id === 'sweets'
                                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600'
                                    : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
                                }`}
                              >
                                <ShoppingCart className="h-6 w-6" />
                                <span>Add to Cart</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {sortedProducts.length === 0 && (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">😔</div>
                    <p className="text-2xl text-gray-600 font-medium mb-4">No products found</p>
                    <p className="text-gray-500 mb-8">Try adjusting your filters or browse all categories</p>
                    <button
                      onClick={() => setSelectedCategory('sweets')}
                      className="bg-primary-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition-colors"
                    >
                      Browse Sweets
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-black mb-4">Ready to Explore More?</h2>
            <p className="text-xl mb-8 opacity-90">
              Discover our complete collection of authentic Indian sweets and snacks
            </p>
            <Link
              href="/products"
              className="inline-flex items-center space-x-3 bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors"
            >
              <span>View All Products</span>
              <ChevronRight className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoriesPage
