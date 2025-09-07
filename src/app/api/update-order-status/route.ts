import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { emailService } from '@/lib/email-service'

export async function POST(request: NextRequest) {
  try {
    if (!supabaseAdmin) {
      console.error('❌ Supabase admin client not available')
      return NextResponse.json({ error: 'Service unavailable' }, { status: 500 })
    }

    const { orderId, status, paymentIntentId, paymentStatus } = await request.json()
    
    console.log('🔧 Update order status API called with:', {
      orderId,
      status,
      paymentIntentId,
      paymentStatus
    })

    if (!orderId || !status) {
      console.error('❌ Missing required fields:', { orderId, status })
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // First, check if order exists
    console.log('🔍 Checking if order exists...')
    const { data: existingOrder, error: fetchError } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (fetchError) {
      console.error('❌ Error fetching order:', fetchError)
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    console.log('📋 Current order status:', existingOrder.status)
    console.log('📋 Order details:', existingOrder)

    // Update order status
    console.log('🔄 Updating order in database...')
    const { data, error } = await supabaseAdmin
      .from('orders')
      .update({
        status: status,
        payment_intent_id: paymentIntentId,
        payment_status: paymentStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .select()

    if (error) {
      console.error('❌ Error updating order status:', error)
      return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 })
    }

    console.log('✅ Order status updated successfully:', data)
    console.log(`📋 Order ${orderId} status updated to ${status}`)

    // Send order confirmation email if status is 'completed'
    if (status === 'completed' && data && data[0]) {
      try {
        console.log('📧 Sending order confirmation email...')
        const emailResult = await emailService.sendOrderConfirmationEmail(data[0])
        
        if (emailResult.success) {
          console.log('✅ Order confirmation email sent successfully')
        } else {
          console.error('❌ Failed to send order confirmation email:', emailResult.error)
        }
      } catch (emailError) {
        console.error('❌ Error sending order confirmation email:', emailError)
      }
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('❌ Error in update-order-status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
