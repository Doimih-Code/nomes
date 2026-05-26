/**
 * API Route: POST /api/contact
 * Handles contact form submissions
 */

import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail, ContactFormData } from '@/lib/email-service'
import { verifyRecaptcha } from '@/lib/recaptcha-config'
import { checkRateLimit } from '@/lib/server-rate-limit'
import { validateServerEnv } from '@/lib/env-validation'

const CONTACT_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const CONTACT_RATE_LIMIT_MAX_REQUESTS = 5

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]?.trim()
    if (firstIp) {
      return firstIp
    }
  }

  const realIp = request.headers.get('x-real-ip')
  return realIp?.trim() || 'unknown'
}

export async function POST(request: NextRequest) {
  try {
    const requireRecaptcha =
      process.env.NODE_ENV === 'production' || Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)

    validateServerEnv({
      requireEmail: true,
      requireRecaptcha,
    })

    const clientIp = getClientIp(request)
    const rateLimitResult = checkRateLimit({
      key: `contact:${clientIp}`,
      windowMs: CONTACT_RATE_LIMIT_WINDOW_MS,
      maxRequests: CONTACT_RATE_LIMIT_MAX_REQUESTS,
    })

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Prea multe trimiteri. Încearcă din nou mai târziu.' },
        {
          status: 429,
          headers: {
            'Retry-After': Math.max(1, Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000)).toString(),
          },
        }
      )
    }

    const body = await request.json()

    // Validare date
    const { fullName, email, phone, comment, services, recaptchaToken } = body

    if (!fullName || !email || !phone || !comment) {
      return NextResponse.json(
        { error: 'Toate câmpurile sunt obligatorii' },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA token
    if (requireRecaptcha && !recaptchaToken) {
      return NextResponse.json(
        { error: 'Token reCAPTCHA lipsă' },
        { status: 400 }
      )
    }

    if (recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(recaptchaToken)
      if (!recaptchaResult.success) {
        return NextResponse.json(
          { error: 'Verificare reCAPTCHA eșuată. Ești robot?' },
          { status: 400 }
        )
      }
      console.log(`reCAPTCHA score: ${recaptchaResult.score}`)
    }

    // Validare email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalid' },
        { status: 400 }
      )
    }

    // Validare telefon
    if (phone.length < 10) {
      return NextResponse.json(
        { error: 'Telefon invalid' },
        { status: 400 }
      )
    }

    // Construire data pentru email
    const contactData: ContactFormData = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      comment: comment.trim(),
      services: Array.isArray(services) ? services : [],
    }

    // Trimitere email
    await sendContactEmail(contactData)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mesajul a fost trimis cu succes! Vei primi o confirmare pe email.' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Eroare la procesarea cererii. Încearcă din nou mai târziu.' },
      { status: 500 }
    )
  }
}
