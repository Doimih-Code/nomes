/**
 * Email Service
 * Serviciu pentru trimiterea de email-uri
 */

import nodemailer from 'nodemailer'
import { assertEmailConfigReady, emailConfig } from './email-config'

export interface ContactFormData {
  fullName: string
  email: string
  phone: string
  comment: string
  services: string[]
}

export interface CourseAccessEmailData {
  customerEmail: string
  customerName: string | null
  courseName: string
  accessLink: string
  sessionId: string
  amountTotal: number | null
  currency: string | null
}

let transporterPromise: Promise<ReturnType<typeof nodemailer.createTransport>> | null = null

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function normalizeText(value: string): string {
  return value.replace(/[\u0000-\u001F\u007F]/g, '').trim()
}

function formatAmount(amountTotal: number | null, currency: string | null): string | null {
  if (amountTotal === null || !currency) {
    return null
  }

  try {
    return new Intl.NumberFormat('ro-RO', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amountTotal / 100)
  } catch {
    return `${amountTotal / 100} ${currency.toUpperCase()}`
  }
}

async function getTransporter() {
  if (!transporterPromise) {
    assertEmailConfigReady()

    const transporter = nodemailer.createTransport(emailConfig.smtp)
    transporterPromise = transporter.verify().then(() => transporter)
  }

  return transporterPromise
}

export async function sendContactEmail(data: ContactFormData) {
  const { fullName, email, phone, comment, services } = data

  // Validare date
  if (!fullName || !email || !phone || !comment) {
    throw new Error('Missing required fields')
  }

  const safeName = escapeHtml(normalizeText(fullName))
  const safeEmail = escapeHtml(normalizeText(email))
  const safePhone = escapeHtml(normalizeText(phone))
  const safeComment = escapeHtml(comment).replace(/\n/g, '<br>')
  const safeServices = services.map((service) => escapeHtml(normalizeText(service))).filter(Boolean)
  const servicesText = safeServices.length > 0 ? safeServices.join(', ') : 'Niciun serviciu selectat'

  try {
    const transporter = await getTransporter()

    const htmlContent = `
      <h2>Formulare de Contact - NOMES</h2>
      <p><strong>Nume:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Telefon:</strong> ${safePhone}</p>
      <p><strong>Servicii de interes:</strong> ${servicesText}</p>
      <hr />
      <h3>Mesaj:</h3>
      <p>${safeComment}</p>
    `

    const textContent = `
Formulare de Contact - NOMES

Nume: ${normalizeText(fullName)}
Email: ${normalizeText(email)}
Telefon: ${normalizeText(phone)}
Servicii de interes: ${servicesText}

--- MESAJ ---
${normalizeText(comment)}
    `

    // Trimitere email către recipient
    await transporter.sendMail({
      from: `${emailConfig.fromName} <${emailConfig.from}>`,
      to: emailConfig.recipientEmail,
      replyTo: normalizeText(email),
      subject: `Nou mesaj de contact de la ${normalizeText(fullName)}`,
      text: textContent,
      html: htmlContent,
    })

    // Trimitere email de confirmare către client
    const confirmationHtml = `
      <p>Salut ${safeName},</p>
      <p>Mulțumim pentru mesajul tău! Am primit formularul și vom reveni la tine în cel mai scurt timp.</p>
      <p>Am notat următoarele detalii:</p>
      <ul>
        <li><strong>Email:</strong> ${safeEmail}</li>
        <li><strong>Telefon:</strong> ${safePhone}</li>
        <li><strong>Servicii:</strong> ${servicesText}</li>
      </ul>
      <p>Echipa NOMES</p>
    `

    await transporter.sendMail({
      from: `${emailConfig.fromName} <${emailConfig.from}>`,
      to: normalizeText(email),
      replyTo: emailConfig.replyTo || emailConfig.recipientEmail,
      subject: 'Confirmare - Formulare de Contact NOMES',
      html: confirmationHtml,
      text: `Salut ${normalizeText(fullName)},\n\nMultumim pentru mesajul tau! Am primit formularul si vom reveni la tine in cel mai scurt timp.\n\nEchipa NOMES`,
    })

    return {
      success: true,
      message: 'Email trimis cu succes',
    }
  } catch (error) {
    console.error('Email send error:', error)
    throw new Error('Eroare la trimiterea emailului. Încearcă din nou mai târziu.')
  }
}

export async function sendCourseAccessEmail(data: CourseAccessEmailData) {
  const transporter = await getTransporter()

  const safeName = data.customerName ? escapeHtml(normalizeText(data.customerName)) : 'participant'
  const safeCourseName = escapeHtml(normalizeText(data.courseName))
  const safeSessionId = escapeHtml(normalizeText(data.sessionId))
  const formattedAmount = formatAmount(data.amountTotal, data.currency)

  const html = `
    <h2>Plata confirmata - ${safeCourseName}</h2>
    <p>Salut ${safeName},</p>
    <p>Multumim! Plata pentru cursul <strong>${safeCourseName}</strong> a fost confirmata.</p>
    ${formattedAmount ? `<p><strong>Suma:</strong> ${escapeHtml(formattedAmount)}</p>` : ''}
    <p><strong>Referinta plata:</strong> ${safeSessionId}</p>
    <p>Poti accesa materialele cursului folosind linkul de mai jos:</p>
    <p><a href="${data.accessLink}">${data.accessLink}</a></p>
    <p>Linkul este securizat si expira automat.</p>
    <p>Echipa NOMES</p>
  `

  const text = [
    `Plata confirmata - ${normalizeText(data.courseName)}`,
    `Salut ${data.customerName ? normalizeText(data.customerName) : 'participant'},`,
    `Plata pentru curs a fost confirmata.`,
    formattedAmount ? `Suma: ${formattedAmount}` : null,
    `Referinta plata: ${normalizeText(data.sessionId)}`,
    `Acces materiale: ${data.accessLink}`,
    'Linkul este securizat si expira automat.',
    'Echipa NOMES',
  ]
    .filter(Boolean)
    .join('\n')

  await transporter.sendMail({
    from: `${emailConfig.fromName} <${emailConfig.from}>`,
    to: normalizeText(data.customerEmail),
    replyTo: emailConfig.replyTo || emailConfig.recipientEmail,
    subject: `Acces curs - ${normalizeText(data.courseName)}`,
    html,
    text,
  })
}
