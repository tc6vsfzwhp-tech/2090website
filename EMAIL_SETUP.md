# Email Setup Instructions

The contact form is now functional! To receive emails, choose one of these options:

## Option 1: Resend (Recommended - Modern & Simple)

1. Sign up at https://resend.com (free tier available)
2. Get your API key from the dashboard
3. Install Resend:
   ```bash
   npm install resend
   ```
4. Add to `.env.local`:
   ```
   RESEND_API_KEY=your_api_key_here
   ```
5. Uncomment the Resend code in `app/api/contact/route.ts`
6. Update the `from` email to match your verified domain

## Option 2: SendGrid

1. Sign up at https://sendgrid.com
2. Get your API key
3. Install SendGrid:
   ```bash
   npm install @sendgrid/mail
   ```
4. Update `app/api/contact/route.ts` with SendGrid code

## Option 3: Nodemailer (Use your own SMTP)

1. Install Nodemailer:
   ```bash
   npm install nodemailer
   ```
2. Configure with your email provider's SMTP settings

## Current Status

The form currently logs to the console. To enable actual email sending:

1. Choose an email service above
2. Follow the setup steps
3. Uncomment/update the code in `app/api/contact/route.ts`

Your form will send to: **ralharbi@me.com**
