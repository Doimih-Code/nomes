/**
 * Email Service
 * Serviciu pentru trimiterea de email-uri
 */

import nodemailer from 'nodemailer'
import { emailConfig } from './email-config'

export interface ContactFormData {
  fullName: string
  email: string
  phone: string
  comment: string
  services: string[]
}

export async function sendContactEmail(data: ContactFormData) {
  const { fullName, email, phone, comment, services } = data

  // Validare date
  if (!fullName || !email || !phone || !comment) {
    throw new Error('Missing required fields')
  }

  try {
    // Creare transport SMTP
    const transporter = nodemailer.createTransport(emailConfig.smtp)

    // Verificare conexiune SMTP
    await transporter.verify()

    // Construire conținut email
    const servicesText = services.length > 0 
      ? services.join(', ') 
      : 'Niciun serviciu selectat'

    const htmlContent = `
      <h2>Formulare de Contact - NOMES</h2>
      <p><strong>Nume:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      <p><strong>Servicii de interes:</strong> ${servicesText}</p>
      <hr />
      <h3>Mesaj:</h3>
      <p>${comment.replace(/\n/g, '<br>')}</p>
    `

    const textContent = `
Formulare de Contact - NOMES

Nume: ${fullName}
Email: ${email}
Telefon: ${phone}
Servicii de interes: ${servicesText}

--- MESAJ ---
${comment}
    `

    // Trimitere email către recipient
    await transporter.sendMail({
      from: `${emailConfig.fromName} <${emailConfig.from}>`,
      to: emailConfig.recipientEmail,
      replyTo: email,
      subject: `Nou mesaj de contact de la ${fullName}`,
      text: textContent,
      html: htmlContent,
    })

    // Trimitere email de confirmare către client
    const confirmationHtml = `
      <p>Salut ${fullName},</p>
      <p>Mulțumim pentru mesajul tău! Am primit formularul și vom reveni la tine în cel mai scurt timp.</p>
      <p>Am notat următoarele detalii:</p>
      <ul>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Telefon:</strong> ${phone}</li>
        <li><strong>Servicii:</strong> ${servicesText}</li>
      </ul>
      <p>Echipa NOMES</p>
    `

    await transporter.sendMail({
      from: `${emailConfig.fromName} <${emailConfig.from}>`,
      to: email,
      subject: 'Confirmare - Formulare de Contact NOMES',
      html: confirmationHtml,
      text: `Salut ${fullName},\n\nMultumim pentru mesajul tau! Am primit formularul si vom reveni la tine in cel mai scurt timp.\n\nEchipa NOMES`,
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
