import { config } from './config'

interface EmailData {
  to: string
  subject: string
  html: string
  text?: string
}

export class EmailService {
  private fromEmail: string
  private fromName: string

  constructor() {
    this.fromEmail = config.email.fromEmail
    this.fromName = config.email.fromName
  }

  async sendEmail({ to, subject, html, text }: EmailData): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to,
          subject,
          html,
          text: text || this.htmlToText(html),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email')
      }

      console.log('Email sent successfully:', result.messageId)
      return { success: true }
    } catch (error) {
      console.error('Email sending error:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }
    }
  }

  private htmlToText(html: string): string {
    // Simple HTML to text conversion
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .trim()
  }

  async sendWelcomeEmail(userEmail: string, userName: string): Promise<{ success: boolean; error?: string }> {
    const subject = 'Welcome to INDKAN Sweet n Snacks! 🍬'
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to INDKAN</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .emoji { font-size: 24px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to INDKAN! <span class="emoji">🍬</span></h1>
              <p>Your Sweet Journey Begins Here</p>
            </div>
            <div class="content">
              <h2>Hello ${userName}! 👋</h2>
              <p>Welcome to INDKAN Sweet n Snacks! We're thrilled to have you join our family of sweet lovers.</p>
              
              <p>Your account has been successfully created and you can now:</p>
              <ul>
                <li>🍭 Browse our premium collection of Indian sweets and snacks</li>
                <li>🛒 Add your favorite treats to your cart</li>
                <li>🚚 Enjoy fast and free shipping on orders over $50</li>
                <li>⭐ Get exclusive access to new products and special offers</li>
              </ul>
              
              <div style="text-align: center;">
                <a href="${config.site.url}/products" class="button">Start Shopping Now</a>
              </div>
              
              <p>If you have any questions or need assistance, don't hesitate to reach out to our customer support team. We're here to make your sweet experience unforgettable!</p>
              
              <p>Happy Shopping!<br>
              The INDKAN Team <span class="emoji">💝</span></p>
            </div>
            <div class="footer">
              <p>This email was sent to ${userEmail}</p>
              <p>© 2025 INDKAN Sweet n Snacks. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({ to: userEmail, subject, html })
  }

  async sendLoginNotificationEmail(userEmail: string, userName: string, loginTime: string): Promise<{ success: boolean; error?: string }> {
    const subject = 'New Login to Your INDKAN Account 🔐'
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Login Notification</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #059669, #047857); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .alert { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .emoji { font-size: 24px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Account Login Notification <span class="emoji">🔐</span></h1>
              <p>Security Alert from INDKAN</p>
            </div>
            <div class="content">
              <h2>Hello ${userName}! 👋</h2>
              <p>We're writing to inform you that there was a successful login to your INDKAN account.</p>
              
              <div class="alert">
                <strong>Login Details:</strong><br>
                📧 Email: ${userEmail}<br>
                🕐 Time: ${loginTime}<br>
                🌐 Location: Detected automatically
              </div>
              
              <p>If this was you, no further action is required. You can continue enjoying your sweet shopping experience!</p>
              
              <p><strong>If this wasn't you:</strong></p>
              <ul>
                <li>Change your password immediately</li>
                <li>Contact our support team</li>
                <li>Review your account activity</li>
              </ul>
              
              <p>We take your account security seriously and are here to help if you have any concerns.</p>
              
              <p>Best regards,<br>
              The INDKAN Security Team <span class="emoji">🛡️</span></p>
            </div>
            <div class="footer">
              <p>This email was sent to ${userEmail}</p>
              <p>© 2025 INDKAN Sweet n Snacks. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({ to: userEmail, subject, html })
  }

  async sendOrderConfirmationEmail(orderData: any): Promise<{ success: boolean; error?: string }> {
    const subject = `Order Confirmation #${orderData.id} - INDKAN Sweet n Snacks 🍬`
    
    const formatPrice = (price: number) => `$${price.toFixed(2)}`
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .order-summary { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #e5e7eb; }
            .item-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
            .item-row:last-child { border-bottom: none; }
            .item-name { font-weight: 600; color: #374151; }
            .item-details { color: #6b7280; font-size: 14px; }
            .price { font-weight: 600; color: #059669; }
            .total-section { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; margin: 20px 0; }
            .total-row { display: flex; justify-content: space-between; margin: 5px 0; }
            .total-final { font-size: 18px; font-weight: bold; color: #92400e; border-top: 2px solid #f59e0b; padding-top: 10px; margin-top: 10px; }
            .address-section { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #e5e7eb; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .emoji { font-size: 24px; }
            .status-badge { background: #10b981; color: white; padding: 5px 15px; border-radius: 20px; font-size: 14px; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Confirmed! <span class="emoji">🎉</span></h1>
              <p>Thank you for your purchase</p>
              <div style="margin-top: 15px;">
                <span class="status-badge">PAID</span>
              </div>
            </div>
            <div class="content">
              <h2>Hello ${orderData.customer_name}! 👋</h2>
              <p>Great news! Your order has been confirmed and payment has been processed successfully.</p>
              
              <div class="order-summary">
                <h3 style="margin-top: 0; color: #374151;">Order Details</h3>
                <div class="item-row">
                  <div>
                    <div class="item-name">Order Number</div>
                    <div class="item-details">#${orderData.id}</div>
                  </div>
                  <div class="price">${formatDate(orderData.created_at)}</div>
                </div>
                <div class="item-row">
                  <div>
                    <div class="item-name">Payment Status</div>
                    <div class="item-details">${orderData.payment_status || 'Completed'}</div>
                  </div>
                  <div class="price">✅ Paid</div>
                </div>
              </div>

              <div class="order-summary">
                <h3 style="margin-top: 0; color: #374151;">Order Items</h3>
                ${orderData.items.map((item: any) => `
                  <div class="item-row">
                    <div>
                      <div class="item-name">${item.product_name}</div>
                      <div class="item-details">Quantity: ${item.quantity} × ${formatPrice(item.price)}</div>
                    </div>
                    <div class="price">${formatPrice(item.total)}</div>
                  </div>
                `).join('')}
              </div>

              <div class="total-section">
                <h3 style="margin-top: 0; color: #92400e;">Order Summary</h3>
                <div class="total-row">
                  <span>Subtotal:</span>
                  <span>${formatPrice(orderData.subtotal)}</span>
                </div>
                <div class="total-row">
                  <span>Shipping:</span>
                  <span>${orderData.shipping === 0 ? 'FREE' : formatPrice(orderData.shipping)}</span>
                </div>
                <div class="total-row">
                  <span>Tax:</span>
                  <span>${formatPrice(orderData.tax)}</span>
                </div>
                <div class="total-row total-final">
                  <span>Total:</span>
                  <span>${formatPrice(orderData.total)}</span>
                </div>
              </div>

              <div class="address-section">
                <h3 style="margin-top: 0; color: #374151;">Billing Address</h3>
                <p>
                  ${orderData.customer_name}<br>
                  ${orderData.billing_address.street}<br>
                  ${orderData.billing_address.city}, ${orderData.billing_address.state} ${orderData.billing_address.zip_code}<br>
                  ${orderData.billing_address.country}
                </p>
                <p><strong>Email:</strong> ${orderData.customer_email}</p>
                ${orderData.customer_phone ? `<p><strong>Phone:</strong> ${orderData.customer_phone}</p>` : ''}
              </div>

              <div style="background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 15px; margin: 20px 0;">
                <h4 style="margin-top: 0; color: #0c4a6e;">📦 What's Next?</h4>
                <p style="margin-bottom: 0; color: #0c4a6e;">
                  Your order is being prepared and will be shipped soon. You'll receive a shipping confirmation email with tracking details once your order is on its way.
                </p>
              </div>

              <p>If you have any questions about your order, please don't hesitate to contact our customer support team. We're here to help!</p>
              
              <p>Thank you for choosing INDKAN Sweet n Snacks!<br>
              The INDKAN Team <span class="emoji">💝</span></p>
            </div>
            <div class="footer">
              <p>This email was sent to ${orderData.customer_email}</p>
              <p>© 2025 INDKAN Sweet n Snacks. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({ to: orderData.customer_email, subject, html })
  }

  async sendPasswordResetEmail(userEmail: string, resetLink: string): Promise<{ success: boolean; error?: string }> {
    const subject = 'Reset Your Password - INDKAN Sweet n Snacks 🔐'
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .emoji { font-size: 24px; }
            .security-notice { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; margin: 20px 0; }
            .link-box { background: white; border: 2px solid #e5e7eb; border-radius: 8px; padding: 15px; margin: 20px 0; word-break: break-all; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request <span class="emoji">🔐</span></h1>
              <p>Secure Your INDKAN Account</p>
            </div>
            <div class="content">
              <h2>Hello! 👋</h2>
              <p>We received a request to reset your password for your INDKAN Sweet n Snacks account.</p>
              
              <div style="text-align: center;">
                <a href="${resetLink}" class="button">Reset My Password</a>
              </div>
              
              <div class="link-box">
                <p style="margin: 0; font-size: 12px; color: #666;">
                  <strong>If the button doesn't work, copy and paste this link into your browser:</strong><br>
                  ${resetLink}
                </p>
              </div>
              
              <div class="security-notice">
                <h4 style="margin-top: 0; color: #92400e;">🛡️ Security Notice</h4>
                <ul style="margin-bottom: 0; color: #92400e;">
                  <li>This link will expire in 1 hour for your security</li>
                  <li>If you didn't request this reset, please ignore this email</li>
                  <li>Your password will remain unchanged until you click the link above</li>
                </ul>
              </div>
              
              <p>If you have any questions or need assistance, please don't hesitate to contact our customer support team.</p>
              
              <p>Best regards,<br>
              The INDKAN Security Team <span class="emoji">🛡️</span></p>
            </div>
            <div class="footer">
              <p>This email was sent to ${userEmail}</p>
              <p>© 2025 INDKAN Sweet n Snacks. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail({ to: userEmail, subject, html })
  }
}

export const emailService = new EmailService()
