'use client'

import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Filter, Grid, List } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { Product } from '@/lib/supabase'

// Mock data - replace with actual Supabase data
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
    updated_at: '2024-01-01',
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
    updated_at: '2024-01-01',
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
    updated_at: '2024-01-01',
  },
  {
    id: 'sweet-4',
    name: 'Nachani Laddu',
    description: 'Nachani laddu is a traditional Indian sweet made with a mixture of nachani seeds, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.',
    price: 14.99,
    image_url: '/product-images/NACHANI%20LADOO.jpg',
    category_id: 'sweets',
    stock_quantity: 55,
    is_featured: false,
    is_available: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: 'sweet-5',
    name: 'Besan Laddu',
    description: 'Besan laddu is a traditional Indian sweet made with a mixture of besan flour, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.',
    price: 14.99,
    image_url: '/product-images/BESAN%20LADDU.jpg',
    category_id: 'sweets',
    stock_quantity: 70,
    is_featured: true,
    is_available: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  // 5 Snacks
  {
    id: 'snack-1',
    name: 'Yellow Poha Chiwda',
    description: 'Yellow poha chiwda is a traditional Indian snack made with a mixture of yellow poha, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.',
    price: 14.99,
    image_url: '/product-images/Yellow%20Poha%20Chiwda.jpg',
    category_id: 'snacks',
    stock_quantity: 70,
    is_featured: false,
    is_available: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
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
    updated_at: '2024-01-01',
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
    updated_at: '2024-01-01',
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
    updated_at: '2024-01-01',
  },
  {
    id: 'snack-5',
    name: 'Khajur Laddu',
    description: 'Khajur laddu is a traditional Indian snack made with a mixture of khajur dates, sugar, and ghee. It is a popular festive treat and is often served during weddings and other special occasions.',
    price: 14.99,
    image_url: '/product-images/KHAJUR%20LADDU.jpg',
    category_id: 'snacks',
    stock_quantity: 40,
    is_featured: false,
    is_available: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  }
]

// Memoized Product Card Component for better performance
const ProductCard = memo(({ 
  product, 
  viewMode, 
  onAddToCart, 
  recentlyAdded, 
  index 
}: { 
  product: Product
  viewMode: 'grid' | 'list'
  onAddToCart: (product: Product) => void
  recentlyAdded: Set<string>
  index: number
}) => {
  const isRecentlyAdded = recentlyAdded.has(product.id)
  const isPriority = index < 6

  if (viewMode === 'grid') {
    return (
      <div 
        className={`group bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border overflow-hidden flex flex-col ${
          product.category_id === 'sweets' 
            ? 'border-pink-200 hover:border-pink-300' 
            : 'border-orange-200 hover:border-orange-300'
        }`}
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={product.image_url || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
            priority={isPriority}
            loading={isPriority ? 'eager' : 'lazy'}
            quality={75}
          />
          
          {product.is_featured && (
            <div className={`absolute top-3 left-3 text-white text-sm font-bold px-3 py-1 rounded-full ${
              product.category_id === 'sweets'
                ? 'bg-pink-500'
                : 'bg-orange-500'
            }`}>
              ⭐ Featured
            </div>
          )}
        </div>
        
        <div className="p-6 flex flex-col h-full">
          <div className="mb-3">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              product.category_id === 'sweets'
                ? 'text-pink-600 bg-pink-100'
                : 'text-orange-600 bg-orange-100'
            }`}>
              {product.category_id === 'sweets' ? '🍬 Sweet' : '🥨 Snack'}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500">
                Stock: {product.stock_quantity}
              </span>
            </div>
            
            <div className="space-y-2">
              {isRecentlyAdded ? (
                <div className="w-full text-green-600 py-3 px-4 rounded-lg font-semibold text-base flex items-center justify-center space-x-2 bg-green-50">
                  <span>✓ Added to Cart</span>
                </div>
              ) : (
                <button
                  onClick={() => onAddToCart(product)}
                  className={`w-full text-white py-3 px-4 rounded-lg font-semibold text-base transition-colors duration-200 flex items-center justify-center space-x-2 ${
                    product.category_id === 'sweets'
                      ? 'bg-pink-600 hover:bg-pink-700'
                      : 'bg-orange-600 hover:bg-orange-700'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // List view
  return (
    <div 
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border overflow-hidden group ${
        product.category_id === 'sweets' 
          ? 'border-pink-200 hover:border-pink-300' 
          : 'border-orange-200 hover:border-orange-300'
      }`}
    >
      <div className="flex">
        <div className="w-64 h-40 relative overflow-hidden">
          <Image
            src={product.image_url || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="192px"
            unoptimized
            priority={isPriority}
            loading={isPriority ? 'eager' : 'lazy'}
            quality={75}
          />
          
          {product.is_featured && (
            <div className={`absolute top-2 left-2 text-white text-sm font-bold px-2 py-1 rounded-full ${
              product.category_id === 'sweets'
                ? 'bg-pink-500'
                : 'bg-orange-500'
            }`}>
              ⭐ Featured
            </div>
          )}
        </div>
        
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="mb-2">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                product.category_id === 'sweets'
                  ? 'text-pink-600 bg-pink-100'
                  : 'text-orange-600 bg-orange-100'
              }`}>
                {product.category_id === 'sweets' ? '🍬 Sweet' : '🥨 Snack'}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {product.name}
            </h3>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                Stock: {product.stock_quantity}
              </span>
            </div>
            
            <div className="w-48">
              {isRecentlyAdded ? (
                <div className="w-full text-green-600 py-2 px-4 rounded-lg font-semibold text-sm flex items-center justify-center space-x-2 bg-green-50">
                  <span>✓ Added to Cart</span>
                </div>
              ) : (
                <button
                  onClick={() => onAddToCart(product)}
                  className={`w-full text-white py-2 px-4 rounded-lg font-semibold text-sm transition-colors duration-200 flex items-center justify-center space-x-2 ${
                    product.category_id === 'sweets'
                      ? 'bg-pink-600 hover:bg-pink-700'
                      : 'bg-orange-600 hover:bg-orange-700'
                  }`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

ProductCard.displayName = 'ProductCard'

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedSweetLevel, setSelectedSweetLevel] = useState<string>('all')
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [recentlyAdded, setRecentlyAdded] = useState<Set<string>>(new Set())
  const { addItem, items: cartItems, updateQuantity } = useCartStore()

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'sweets', name: 'Sweets' },
    { id: 'snacks', name: 'Snacks' }
  ]

  const sweetLevels = [
    { id: 'all', name: 'All Sweet Levels' },
    { id: 'low', name: 'Low Sweetness' },
    { id: 'medium', name: 'Medium Sweetness' },
    { id: 'high', name: 'High Sweetness' }
  ]

  const spiceLevels = [
    { id: 'all', name: 'All Spice Levels' },
    { id: 'mild', name: 'Mild Spice' },
    { id: 'medium', name: 'Medium Spice' },
    { id: 'hot', name: 'Hot Spice' }
  ]

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'featured', label: 'Featured First' }
  ]

  useEffect(() => {
    setProducts(mockProducts)
  }, [])

  // Memoize filtered products to prevent unnecessary recalculations
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category_id === selectedCategory)
    }

    // Sweet level filter (for sweets category) - now based on product name/description
    if (selectedSweetLevel !== 'all' && selectedCategory === 'sweets') {
      if (selectedSweetLevel === 'low') {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes('besan') || 
          product.name.toLowerCase().includes('dink')
        )
      } else if (selectedSweetLevel === 'medium') {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes('methi') || 
          product.name.toLowerCase().includes('nachani')
        )
      } else if (selectedSweetLevel === 'high') {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes('dry fruit') || 
          product.name.toLowerCase().includes('khajur')
        )
      }
    }

    // Spice level filter (for snacks category) - now based on product name/description
    if (selectedSpiceLevel !== 'all' && selectedCategory === 'snacks') {
      if (selectedSpiceLevel === 'mild') {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes('sweet') || 
          product.name.toLowerCase().includes('yellow')
        )
      } else if (selectedSpiceLevel === 'medium') {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes('chakli') || 
          product.name.toLowerCase().includes('shankarpale')
        )
      } else if (selectedSpiceLevel === 'hot') {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes('teekha') || 
          product.name.toLowerCase().includes('sev')
        )
      }
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'featured':
        filtered.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0))
        break
      default: // name
        filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    return filtered
  }, [products, selectedCategory, selectedSweetLevel, selectedSpiceLevel, sortBy, priceRange])

  const handleAddToCart = useCallback((product: Product) => {
    const existingItem = cartItems.find(item => item.product.id === product.id)
    
    if (existingItem) {
      // Item already in cart, increase quantity
      updateQuantity(product.id, existingItem.quantity + 1)
    } else {
      // New item, add to cart
      addItem(product)
    }
    
    // Show "Added" state temporarily
    setRecentlyAdded(prev => new Set(prev).add(product.id))
    setTimeout(() => {
      setRecentlyAdded(prev => {
        const newSet = new Set(prev)
        newSet.delete(product.id)
        return newSet
      })
    }, 2000)
  }, [cartItems, addItem, updateQuantity])

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">All Products</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 font-medium">
            Discover our complete collection of premium sweets and snacks
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h2>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sweet Level Filter */}
              {selectedCategory === 'sweets' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Sweet Level</h3>
                  <div className="space-y-2">
                    {sweetLevels.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => setSelectedSweetLevel(level.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                          selectedSweetLevel === level.id
                            ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {level.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Spice Level Filter */}
              {selectedCategory === 'snacks' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Spice Level</h3>
                  <div className="space-y-2">
                    {spiceLevels.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => setSelectedSpiceLevel(level.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                          selectedSpiceLevel === level.id
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {level.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Min Price</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg font-bold text-gray-900 bg-white focus:border-primary-500 focus:outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Max Price</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg font-bold text-gray-900 bg-white focus:border-primary-500 focus:outline-none"
                        placeholder="100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-black text-gray-900">
                      {filteredProducts.length}
                    </span>
                    <span className="text-lg text-gray-600 font-medium">
                      {filteredProducts.length === 1 ? 'Product' : 'Products'} Found
                    </span>
                  </div>
                  
                  <div className="h-8 w-px bg-gray-300"></div>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-6 py-3 border-2 border-gray-200 rounded-xl text-lg font-bold text-gray-900 bg-white focus:border-primary-500 focus:outline-none cursor-pointer hover:border-gray-300 transition-colors"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value} className="text-lg font-bold text-gray-900 bg-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 rounded-lg transition-colors duration-200 ${
                        viewMode === 'grid'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Grid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 rounded-lg transition-colors duration-200 ${
                        viewMode === 'list'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid - Optimized */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    onAddToCart={handleAddToCart}
                    recentlyAdded={recentlyAdded}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    onAddToCart={handleAddToCart}
                    recentlyAdded={recentlyAdded}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
