# SMTP Email Configuration Guide

This guide will help you set up SMTP email configuration for the INDKAN Sweet n Snacks application.

## Supported SMTP Providers

The application supports any SMTP provider. Here are some popular options:

### 1. Gmail SMTP
- **Host**: smtp.gmail.com
- **Port**: 587 (TLS) or 465 (SSL)
- **Security**: TLS (port 587) or SSL (port 465)

### 2. Outlook/Hotmail SMTP
- **Host**: smtp-mail.outlook.com
- **Port**: 587
- **Security**: TLS

### 3. Yahoo SMTP
- **Host**: smtp.mail.yahoo.com
- **Port**: 587 or 465
- **Security**: TLS or SSL

### 4. Custom SMTP Server
- Use your own SMTP server details

## Environment Variables Setup

Copy the `env.local.example` file to `.env.local` and configure the following variables:

```bash
# Email Service Configuration (SMTP)
EMAIL_SERVICE=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=INDKAN Sweet n Snacks
```

## Gmail Setup (Recommended)

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification

### Step 2: Generate App Password
1. In Google Account settings, go to Security
2. Under "2-Step Verification", click "App passwords"
3. Select "Mail" and your device
4. Copy the generated 16-character password
5. Use this password as `SMTP_PASS` in your environment variables

### Step 3: Configure Environment Variables
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_gmail_address@gmail.com
SMTP_PASS=your_16_character_app_password
```

## Outlook/Hotmail Setup

### Step 1: Enable SMTP Authentication
1. Go to Outlook.com settings
2. Navigate to Mail > Sync email
3. Enable "Let devices and apps use POP"

### Step 2: Configure Environment Variables
```bash
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_outlook_email@outlook.com
SMTP_PASS=your_outlook_password
```

## Yahoo Setup

### Step 1: Enable App Passwords
1. Go to Yahoo Account Security
2. Enable 2-Factor Authentication
3. Generate an App Password for "Mail"

### Step 2: Configure Environment Variables
```bash
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_yahoo_email@yahoo.com
SMTP_PASS=your_yahoo_app_password
```

## Custom SMTP Server Setup

If you have your own SMTP server or use a service like SendGrid, Mailgun, etc.:

```bash
SMTP_HOST=your_smtp_server.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
```

## Port and Security Configuration

### Port 587 (TLS - Recommended)
```bash
SMTP_PORT=587
SMTP_SECURE=false
```

### Port 465 (SSL)
```bash
SMTP_PORT=465
SMTP_SECURE=true
```

### Port 25 (Unencrypted - Not Recommended)
```bash
SMTP_PORT=25
SMTP_SECURE=false
```

## Testing Your Configuration

After setting up your environment variables, restart your development server:

```bash
npm run dev
```

The application will automatically test the SMTP connection when sending emails. Check the console logs for any connection errors.

## Email Templates

The application includes the following email templates:

1. **Welcome Email**: Sent when users sign up
2. **Login Notification**: Sent when users log in
3. **Password Reset**: Sent when users request password reset

All emails are sent with beautiful HTML templates and include:
- Company branding
- Responsive design
- Professional styling
- Security information

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Verify your username and password
   - For Gmail, ensure you're using an App Password, not your regular password
   - Check if 2-Factor Authentication is enabled

2. **Connection Timeout**
   - Verify the SMTP host and port
   - Check your firewall settings
   - Ensure the SMTP server is accessible

3. **SSL/TLS Errors**
   - Verify the `SMTP_SECURE` setting matches your port
   - Port 587 should use `SMTP_SECURE=false` (TLS)
   - Port 465 should use `SMTP_SECURE=true` (SSL)

4. **Emails Not Sending**
   - Check the console logs for error messages
   - Verify all environment variables are set correctly
   - Test with a simple email first

### Debug Mode

To enable debug logging, add this to your environment variables:

```bash
DEBUG=nodemailer:*
```

This will show detailed SMTP communication logs.

## Security Best Practices

1. **Never commit your `.env.local` file to version control**
2. **Use App Passwords instead of regular passwords**
3. **Enable 2-Factor Authentication on your email account**
4. **Use TLS/SSL encryption (ports 587 or 465)**
5. **Regularly rotate your SMTP credentials**

## Production Considerations

For production deployment:

1. Set environment variables in your hosting platform
2. Use a dedicated email service (SendGrid, Mailgun, etc.)
3. Monitor email delivery rates
4. Set up email bounce handling
5. Consider rate limiting for email sending

## Support

If you encounter issues with SMTP configuration:

1. Check the console logs for detailed error messages
2. Verify your SMTP provider's documentation
3. Test your SMTP settings with a simple email client
4. Contact your SMTP provider's support if needed

The application will gracefully handle email failures and continue to function even if emails cannot be sent.
