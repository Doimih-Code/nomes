#!/usr/bin/env node
// Smoke test: sends a real contact-form email pair (notification + confirmation)
// through the SMTP settings in .env.production, mirroring lib/email-service.ts.
//
// Usage:
//   node scripts/test-contact-email.mjs [--to=someone@example.com] [--env=.env.production]
//
// Defaults to CONTACT_RECIPIENT_EMAIL as the test destination.

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import nodemailer from 'nodemailer'

function parseArgs(argv) {
  const args = {}
  for (const arg of argv) {
    const match = /^--([^=]+)=(.*)$/.exec(arg)
    if (match) args[match[1]] = match[2]
  }
  return args
}

function loadEnvFile(path) {
  const content = readFileSync(path, 'utf8')
  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const idx = line.indexOf('=')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!(key in process.env)) {
      process.env[key] = value
    }
  }
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const CONTROL_CHARS_PATTERN = new RegExp('[\\x00-\\x1F\\x7F]', 'g')

function normalizeText(value) {
  return value.replace(CONTROL_CHARS_PATTERN, '').trim()
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const envPath = resolve(process.cwd(), args.env || '.env.production')
  loadEnvFile(envPath)

  const smtp = {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASSWORD || '',
    },
  }
  const fromName = process.env.EMAIL_FROM_NAME || 'NOMES'
  const from = process.env.EMAIL_FROM || ''
  const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || ''
  const replyTo = process.env.EMAIL_REPLY_TO || recipientEmail

  const missing = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASSWORD', 'EMAIL_FROM', 'CONTACT_RECIPIENT_EMAIL'].filter(
    (key) => !process.env[key]
  )
  if (missing.length > 0) {
    console.error(`Lipsesc variabile din ${envPath}: ${missing.join(', ')}`)
    process.exit(1)
  }

  const testTo = args.to || recipientEmail

  const sample = {
    fullName: 'Test Contact NOMES',
    email: testTo,
    phone: '0712345678',
    comment: 'Acesta este un mesaj de test trimis din scripts/test-contact-email.mjs pentru a verifica configuratia SMTP.',
    services: ['performance', 'social-media'],
  }

  console.log(`SMTP: ${smtp.host}:${smtp.port} secure=${smtp.secure} user=${smtp.auth.user}`)
  console.log(`Destinatie test: ${testTo}`)

  const transporter = nodemailer.createTransport(smtp)

  console.log('Verific conexiunea SMTP...')
  await transporter.verify()
  console.log('OK: Conexiune SMTP reusita.')

  const safeName = escapeHtml(normalizeText(sample.fullName))
  const safeEmail = escapeHtml(normalizeText(sample.email))
  const safePhone = escapeHtml(normalizeText(sample.phone))
  const safeComment = escapeHtml(sample.comment)
  const servicesText = sample.services.join(', ')

  console.log('Trimit emailul de notificare (catre echipa)...')
  const notificationInfo = await transporter.sendMail({
    from: `${fromName} <${from}>`,
    to: testTo,
    replyTo: normalizeText(sample.email),
    subject: `[TEST] Nou mesaj de contact de la ${normalizeText(sample.fullName)}`,
    text: `Formulare de Contact - NOMES (TEST)\n\nNume: ${sample.fullName}\nEmail: ${sample.email}\nTelefon: ${sample.phone}\nServicii de interes: ${servicesText}\n\n--- MESAJ ---\n${sample.comment}`,
    html: `
      <h2>Formulare de Contact - NOMES (TEST)</h2>
      <p><strong>Nume:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Telefon:</strong> ${safePhone}</p>
      <p><strong>Servicii de interes:</strong> ${servicesText}</p>
      <hr />
      <h3>Mesaj:</h3>
      <p>${safeComment}</p>
    `,
  })
  console.log(`OK: Notificare trimisa. messageId=${notificationInfo.messageId}`)

  console.log('Trimit emailul de confirmare (catre client)...')
  const confirmationInfo = await transporter.sendMail({
    from: `${fromName} <${from}>`,
    to: testTo,
    replyTo,
    subject: '[TEST] Confirmare - Formulare de Contact NOMES',
    html: `
      <p>Salut ${safeName},</p>
      <p>Multumim pentru mesajul tau! Am primit formularul si vom reveni la tine in cel mai scurt timp.</p>
      <p>Am notat urmatoarele detalii:</p>
      <ul>
        <li><strong>Email:</strong> ${safeEmail}</li>
        <li><strong>Telefon:</strong> ${safePhone}</li>
        <li><strong>Servicii:</strong> ${servicesText}</li>
      </ul>
      <p>Echipa NOMES</p>
    `,
    text: `Salut ${sample.fullName},\n\nMultumim pentru mesajul tau! Am primit formularul si vom reveni la tine in cel mai scurt timp.\n\nEchipa NOMES`,
  })
  console.log(`OK: Confirmare trimisa. messageId=${confirmationInfo.messageId}`)

  console.log('\nAmbele emailuri au fost trimise cu succes.')
}

main().catch((error) => {
  console.error('\nEROARE: Testul a esuat:', error)
  process.exit(1)
})
