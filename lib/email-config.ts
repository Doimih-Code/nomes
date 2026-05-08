/**
 * Email Configuration
 * Configurează credențialele SMTP și setările pentru trimiterea de email-uri
 */

export const emailConfig = {
  // SMTP Server Settings
  smtp: {
    host: process.env.SMTP_HOST || 'mail.nomes.ro',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASSWORD || '',
    },
  },

  // Email sender details
  from: process.env.EMAIL_FROM || 'noreply@nomes.ro',
  fromName: process.env.EMAIL_FROM_NAME || 'NOMES',

  // Recipient email for contact form submissions
  recipientEmail: process.env.CONTACT_RECIPIENT_EMAIL || 'contact@nomes.ro',

  // Reply-to email
  replyTo: process.env.EMAIL_REPLY_TO || 'contact@nomes.ro',
}

export type EmailConfigType = typeof emailConfig
