/**
 * Email Configuration
 * Configurează credențialele SMTP și setările pentru trimiterea de email-uri
 */

function parseSmtpPort(value: string | undefined): number {
  const fallback = 587
  if (!value) {
    return fallback
  }

  const parsed = Number(value)
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65535) {
    return fallback
  }

  return parsed
}

function parseSmtpSecure(value: string | undefined): boolean {
  return String(value).toLowerCase() === 'true'
}

export const emailConfig = {
  // SMTP Server Settings
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseSmtpPort(process.env.SMTP_PORT),
    secure: parseSmtpSecure(process.env.SMTP_SECURE),
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASSWORD || '',
    },
  },

  // Email sender details
  from: process.env.EMAIL_FROM || '',
  fromName: process.env.EMAIL_FROM_NAME || 'NOMES',

  // Recipient email for contact form submissions
  recipientEmail: process.env.CONTACT_RECIPIENT_EMAIL || '',

  // Reply-to email
  replyTo: process.env.EMAIL_REPLY_TO || '',
}

export type EmailConfigType = typeof emailConfig

export function assertEmailConfigReady() {
  const missing: string[] = []

  if (!emailConfig.smtp.host) missing.push('SMTP_HOST')
  if (!emailConfig.smtp.auth.user) missing.push('SMTP_USER')
  if (!emailConfig.smtp.auth.pass) missing.push('SMTP_PASSWORD')
  if (!emailConfig.from) missing.push('EMAIL_FROM')
  if (!emailConfig.recipientEmail) missing.push('CONTACT_RECIPIENT_EMAIL')

  if (missing.length > 0) {
    throw new Error(`Missing required email configuration: ${missing.join(', ')}`)
  }
}
