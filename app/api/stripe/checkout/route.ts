import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { checkRateLimit } from '@/lib/server-rate-limit'
import { getCourseCheckoutConfig, isCourseKey } from '@/lib/stripe-course-config'
import { validateServerEnv } from '@/lib/env-validation'

const CHECKOUT_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const CHECKOUT_RATE_LIMIT_MAX_REQUESTS = 8

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

function getAppUrl(): string {
  const value = process.env.NEXT_PUBLIC_APP_URL

  if (!value && process.env.NODE_ENV === 'production') {
    throw new Error('NEXT_PUBLIC_APP_URL must be configured in production')
  }

  return value || 'http://localhost:3000'
}

function sanitizeIdempotencyKey(value: string | null): string {
  if (!value) {
    return crypto.randomUUID()
  }

  const key = value.trim().slice(0, 255)
  return key || crypto.randomUUID()
}

export async function POST(request: NextRequest) {
  try {
    validateServerEnv({ requireStripe: true })

    const clientIp = getClientIp(request)
    const rateLimitResult = checkRateLimit({
      key: `stripe-checkout:${clientIp}`,
      windowMs: CHECKOUT_RATE_LIMIT_WINDOW_MS,
      maxRequests: CHECKOUT_RATE_LIMIT_MAX_REQUESTS,
    })

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Prea multe încercări. Încearcă din nou în câteva minute.' },
        {
          status: 429,
          headers: {
            'Retry-After': Math.max(1, Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000)).toString(),
          },
        }
      )
    }

    const body = await request.json().catch(() => null)
    const courseKey = body?.courseKey

    if (!isCourseKey(courseKey)) {
      return NextResponse.json(
        { error: 'Curs invalid pentru checkout' },
        { status: 400 }
      )
    }

    const courseConfig = getCourseCheckoutConfig(courseKey)
    const priceId = process.env[courseConfig.priceEnvVar]

    if (!priceId) {
      console.error('Stripe price env var is missing', {
        envVar: courseConfig.priceEnvVar,
        courseKey,
      })
      return NextResponse.json(
        { error: 'Curs indisponibil momentan pentru plată' },
        { status: 503 }
      )
    }

    const appUrl = getAppUrl()
    const idempotencyKey = sanitizeIdempotencyKey(request.headers.get('x-idempotency-key'))

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/checkout/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/anulat`,
      metadata: {
        courseKey,
        courseName: courseConfig.displayName,
      },
      locale: 'ro',
    }, {
      idempotencyKey,
    })

    if (!session.url) {
      return NextResponse.json(
        { error: 'Nu am putut inițializa checkout-ul Stripe' },
        { status: 502 }
      )
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error', error)
    return NextResponse.json(
      { error: 'A apărut o eroare la procesarea plății' },
      { status: 500 }
    )
  }
}
