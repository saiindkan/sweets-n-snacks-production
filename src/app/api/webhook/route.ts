import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase'
import { EmailService } from '@/lib/email-service'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
const emailService = new EmailService()

export async function POST(request: NextRequest) {
  console.log('🔔 Webhook received:', new Date().toISOString())
  
  if (!supabaseAdmin) {
    console.error('❌ Supabase admin client not available')
    return NextResponse.json({ error: 'Service unavailable' }, { status: 500 })
  }
  
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    console.log('✅ Webhook signature verified, event type:', event.type)
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const orderId = paymentIntent.metadata.orderId
        
        console.log('💳 Payment succeeded for order:', orderId)
        console.log('💰 Payment amount:', paymentIntent.amount / 100)

        if (orderId) {
          // Update order status to completed
          const { error: orderError } = await supabaseAdmin
            .from('orders')
            .update({
              status: 'completed',
              payment_intent_id: paymentIntent.id,
              payment_status: 'succeeded',
              updated_at: new Date().toISOString()
            })
            .eq('id', orderId)

          if (orderError) {
            console.error('Error updating order:', orderError)
          } else {
            console.log(`Order ${orderId} marked as completed`)
            
            // Send order confirmation email
            try {
              console.log('📧 Sending order confirmation email...')
              const { data: orderData, error: fetchError } = await supabaseAdmin
                .from('orders')
                .select('*')
                .eq('id', orderId)
                .single()

              if (fetchError) {
                console.error('Error fetching order data for email:', fetchError)
              } else if (orderData) {
                const emailResult = await emailService.sendOrderConfirmationEmail(orderData)
                
                if (emailResult.success) {
                  console.log('✅ Order confirmation email sent successfully')
                } else {
                  console.error('❌ Failed to send order confirmation email:', emailResult.error)
                }
              }
            } catch (emailError) {
              console.error('❌ Error sending order confirmation email:', emailError)
            }
          }

          // Create payment record
          const { error: paymentError } = await supabaseAdmin
            .from('payments')
            .insert({
              order_id: orderId,
              amount: paymentIntent.amount / 100, // Convert from cents
              payment_method: 'stripe',
              payment_status: 'completed',
              transaction_id: paymentIntent.id,
              payment_date: new Date().toISOString()
            })

          if (paymentError) {
            console.error('Error creating payment record:', paymentError)
          } else {
            console.log(`Payment record created for order ${orderId}`)
          }
        }
        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent
        const failedOrderId = failedPayment.metadata.orderId

        if (failedOrderId) {
          // Update order status to failed
          const { error: orderError } = await supabaseAdmin
            .from('orders')
            .update({
              status: 'failed',
              payment_intent_id: failedPayment.id,
              payment_status: 'failed',
              updated_at: new Date().toISOString()
            })
            .eq('id', failedOrderId)

          if (orderError) {
            console.error('Error updating failed order:', orderError)
          } else {
            console.log(`Order ${failedOrderId} marked as failed`)
          }

          // Create failed payment record
          const { error: paymentError } = await supabaseAdmin
            .from('payments')
            .insert({
              order_id: failedOrderId,
              amount: failedPayment.amount / 100, // Convert from cents
              payment_method: 'stripe',
              payment_status: 'failed',
              transaction_id: failedPayment.id,
              payment_date: new Date().toISOString()
            })

          if (paymentError) {
            console.error('Error creating failed payment record:', paymentError)
          } else {
            console.log(`Failed payment record created for order ${failedOrderId}`)
          }
        }
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
