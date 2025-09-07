# Stripe Payment Integration Setup Guide

This guide will help you set up Stripe payment processing for your sweets and snacks website.

## 🚀 Quick Setup

### 1. Create Stripe Account
1. Go to [stripe.com](https://stripe.com) and create an account
2. Complete the account verification process
3. Switch to **Test Mode** for development

### 2. Get Your API Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copy your **Publishable Key** (starts with `pk_test_`)
3. Copy your **Secret Key** (starts with `sk_test_`)

### 3. Set Up Webhook
1. Go to [Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click **"Add endpoint"**
3. Set URL to: `https://yourdomain.com/api/webhook`
4. Select events: `payment_intent.succeeded` and `payment_intent.payment_failed`
5. Copy the **Webhook Secret** (starts with `whsec_`)

### 4. Environment Variables
Add these to your `.env.local` file:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 5. Database Migration
Run the database migration to create the orders table:

```bash
# If using Supabase CLI
supabase db push

# Or run the SQL manually in your Supabase dashboard
```

## 🧪 Testing

### Test Card Numbers
Use these test card numbers for testing:

**Successful Payments:**
- `4242 4242 4242 4242` (Visa)
- `5555 5555 5555 4444` (Mastercard)
- `3782 822463 10005` (American Express)

**Declined Payments:**
- `4000 0000 0000 0002` (Card declined)
- `4000 0000 0000 9995` (Insufficient funds)

**Use any future expiry date and any 3-digit CVV**

### Test the Flow
1. Add items to cart
2. Go to checkout
3. Use test card numbers
4. Check Stripe Dashboard for payment records
5. Check your database for order records

## 🔒 Security Features

### What's Included
- ✅ **PCI DSS Compliance** - Stripe handles card data
- ✅ **SSL Encryption** - All data encrypted in transit
- ✅ **Webhook Verification** - Secure payment confirmation
- ✅ **Database Storage** - Order and payment records
- ✅ **Error Handling** - Comprehensive error management

### Security Best Practices
- Never store card details in your database
- Always use HTTPS in production
- Verify webhook signatures
- Use environment variables for secrets
- Test thoroughly before going live

## 📊 Database Schema

### Orders Table
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  billing_address JSONB NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  shipping DECIMAL(10,2) NOT NULL DEFAULT 0,
  tax DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  payment_intent_id VARCHAR(255),
  payment_status VARCHAR(50),
  items JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚀 Going Live

### 1. Switch to Live Mode
1. Complete Stripe account verification
2. Switch to **Live Mode** in Stripe Dashboard
3. Get your live API keys
4. Update environment variables

### 2. Update Webhook URL
1. Update webhook URL to your production domain
2. Test webhook in live mode

### 3. Test with Real Cards
1. Use real card numbers (small amounts)
2. Verify payments in Stripe Dashboard
3. Check order records in database

## 🛠️ Troubleshooting

### Common Issues

**"Invalid API Key"**
- Check your environment variables
- Ensure you're using the correct test/live keys

**"Webhook signature verification failed"**
- Check your webhook secret
- Ensure webhook URL is correct

**"Payment failed"**
- Check card number format
- Verify expiry date is in the future
- Check CVV length (3-4 digits)

### Debug Mode
Enable debug logging by adding to your `.env.local`:
```env
NEXT_PUBLIC_DEBUG=true
```

## 📞 Support

- **Stripe Documentation**: [stripe.com/docs](https://stripe.com/docs)
- **Stripe Support**: [support.stripe.com](https://support.stripe.com)
- **Test Cards**: [stripe.com/docs/testing](https://stripe.com/docs/testing)

## 💡 Features Included

- ✅ Real payment processing
- ✅ Order management
- ✅ Payment confirmation
- ✅ Error handling
- ✅ Security compliance
- ✅ Database integration
- ✅ Webhook processing
- ✅ Test mode support

Your checkout system is now ready for real payments! 🎉
