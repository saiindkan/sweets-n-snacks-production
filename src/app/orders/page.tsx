'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase, Order } from '@/lib/supabase'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { Package, Clock, CheckCircle, XCircle, Truck, ArrowLeft, Calendar, CreditCard, MapPin, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const OrdersPage = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      // Test Supabase connection first
      testSupabaseConnection()
      fetchOrders()
    }
  }, [user])

  const testSupabaseConnection = async () => {
    try {
      console.log('🔧 Testing Supabase connection...')
      const { data, error } = await supabase
        .from('orders')
        .select('count')
        .limit(1)
      
      if (error) {
        console.error('❌ Supabase connection test failed:', error)
        setError(`Database connection failed: ${error.message}`)
      } else {
        console.log('✅ Supabase connection test passed')
      }
    } catch (err) {
      console.error('❌ Supabase connection exception:', err)
      setError(`Database connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const fetchOrders = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      
      console.log('🔍 Fetching orders for user:', user?.email)
      
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_email', user?.email)
        .order('created_at', { ascending: false })

      console.log('📊 Orders query result:', { data, error })

      if (error) {
        console.error('❌ Error fetching orders:', error)
        setError(`Failed to load orders: ${error.message}`)
      } else {
        console.log('✅ Orders loaded successfully:', data?.length || 0, 'orders')
        
        // Debug: Log the first order's items structure
        if (data && data.length > 0) {
          console.log('🔍 First order items structure:', JSON.stringify(data[0].items, null, 2))
        }
        
        // Enhance orders with product images for items that don't have them
        const enhancedOrders = await Promise.all((data || []).map(async (order) => {
          if (order.items && Array.isArray(order.items)) {
            const enhancedItems = await Promise.all(order.items.map(async (item: any) => {
              // If item doesn't have product_image, try to fetch it from products table
              if (!item.product_image && item.product_id) {
                try {
                  console.log('🔍 Fetching image for product:', item.product_id, item.product_name)
                  
                  // Try multiple approaches to find the product
                  let productData = null
                  
                  // First try: exact ID match
                  const { data: exactMatch } = await supabase
                    .from('products')
                    .select('image_url')
                    .eq('id', item.product_id)
                    .single()
                  
                  if (exactMatch) {
                    productData = exactMatch
                  } else {
                    // Second try: name match (in case IDs don't match)
                    const { data: nameMatch } = await supabase
                      .from('products')
                      .select('image_url')
                      .eq('name', item.product_name)
                      .single()
                    
                    if (nameMatch) {
                      productData = nameMatch
                    }
                  }
                  
                  if (productData && productData.image_url) {
                    item.product_image = productData.image_url
                    console.log('✅ Found image for product:', item.product_name, productData.image_url)
                  } else {
                    console.warn('❌ No image found for product:', item.product_id, item.product_name)
                  }
                } catch (err) {
                  console.warn('❌ Error fetching product image for item:', item.product_id, err)
                }
              }
              return item
            }))
            order.items = enhancedItems
          }
          return order
        }))
        
        setOrders(enhancedOrders)
        setError('')
      }
    } catch (err) {
      console.error('❌ Exception in fetchOrders:', err)
      setError(`Failed to load orders: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const updateOrderStatus = async (orderId: string) => {
    try {
      setUpdatingStatus(orderId)
      console.log('🔄 Manually updating order status for:', orderId)
      
      const response = await fetch('/api/update-order-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderId,
          status: 'completed',
          paymentStatus: 'succeeded'
        }),
      })
      
      if (response.ok) {
        console.log('✅ Order status updated successfully')
        // Refresh orders to show updated status
        await fetchOrders(true)
      } else {
        console.error('❌ Failed to update order status')
        const errorText = await response.text()
        console.error('📋 Error response:', errorText)
      }
    } catch (error) {
      console.error('❌ Error updating order status:', error)
    } finally {
      setUpdatingStatus(null)
    }
  }


  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Package className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPaymentStatusColor = (paymentStatus: string) => {
    switch (paymentStatus) {
      case 'succeeded':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
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
              <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
              <p className="text-gray-600">Track and manage your orders</p>
            </div>
          </div>
          <button
            onClick={() => fetchOrders(true)}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error Loading Orders</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                  <p className="mt-2">
                    This might be because:
                  </p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>The orders table doesn't exist in the database</li>
                    <li>Database migrations haven't been run</li>
                    <li>Supabase connection issues</li>
                    <li>Row Level Security (RLS) policies are blocking access</li>
                  </ul>
                  <p className="mt-2">
                    Check the browser console for more detailed error information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Orders Yet</h2>
            <p className="text-gray-600 mb-8">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <Link
              href="/products"
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-orange-100 px-8 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Order #{order.id.slice(-8).toUpperCase()}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {formatDate(order.created_at)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-2 capitalize">{order.status}</span>
                      </span>
                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id)}
                          disabled={updatingStatus === order.id}
                          className="px-3 py-1 text-xs bg-amber-500 text-white rounded-full hover:bg-amber-600 disabled:opacity-50 transition-colors"
                        >
                          {updatingStatus === order.id ? 'Updating...' : 'Fix Status'}
                        </button>
                      )}
                      {order.payment_status && (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPaymentStatusColor(order.payment_status)}`}>
                          <CreditCard className="h-4 w-4 mr-2" />
                          <span className="capitalize">{order.payment_status}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h4>
                  <div className="space-y-4">
                    {order.items && Array.isArray(order.items) && order.items.map((item: any, index: number) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.product_image || item.image_url || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'}
                            alt={item.product_name}
                            fill
                            className="object-cover rounded-lg"
                            sizes="64px"
                            onError={(e) => {
                              console.error('Order item image failed to load:', item.product_name, item.product_image)
                              // Fallback to default image
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900">{item.product_name}</h5>
                          <p className="text-sm text-gray-600">Product ID: {item.product_id}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">Qty: {item.quantity}</p>
                          <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                          <p className="font-semibold text-green-600">${item.total.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Billing Address */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        Billing Address
                      </h4>
                      <div className="text-sm text-gray-600">
                        <p className="font-semibold">{order.customer_name}</p>
                        <p>{order.billing_address?.street}</p>
                        <p>{order.billing_address?.city}, {order.billing_address?.state} {order.billing_address?.zip_code}</p>
                        <p>{order.billing_address?.country}</p>
                        <p className="mt-2">{order.customer_email}</p>
                        {order.customer_phone && <p>{order.customer_phone}</p>}
                      </div>
                    </div>

                    {/* Order Total */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Order Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-900 font-medium">Subtotal</span>
                          <span className="font-semibold text-gray-900">${order.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-900 font-medium">Shipping</span>
                          <span className="font-semibold text-gray-900">
                            {order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-900 font-medium">Sales Tax</span>
                          <span className="font-semibold text-gray-900">${order.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-2">
                          <span className="text-gray-900">Total</span>
                          <span className="text-green-600">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default OrdersPage
