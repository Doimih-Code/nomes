import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createCourseAccessLink, createCourseAccessToken } from '@/lib/course-access'
import { getCourseMaterialsUrl, isCourseKey } from '@/lib/stripe-course-config'
import { validateServerEnv } from '@/lib/env-validation'

function getAppUrl(): string {
  const value = process.env.NEXT_PUBLIC_APP_URL

  if (!value && process.env.NODE_ENV === 'production') {
    throw new Error('NEXT_PUBLIC_APP_URL must be configured in production')
  }

  return value || 'http://localhost:3000'
}

export async function GET(request: NextRequest) {
  validateServerEnv({ requireStripe: true })

  const sessionId = request.nextUrl.searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json(
      { error: 'session_id este obligatoriu' },
      { status: 400 }
    )
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const isPaid = session.payment_status === 'paid'
    const courseKey = session.metadata?.courseKey
    const customerEmail = session.customer_details?.email || session.customer_email
    let accessUrl: string | null = null

    if (isPaid && isCourseKey(courseKey) && customerEmail && getCourseMaterialsUrl(courseKey)) {
      const token = createCourseAccessToken({
        sessionId: session.id,
        email: customerEmail,
        courseKey,
      })

      accessUrl = createCourseAccessLink({
        appUrl: getAppUrl(),
        token,
        courseKey,
      })
    }

    return NextResponse.json({
      verified: isPaid,
      courseName: session.metadata?.courseName || null,
      sessionId: session.id,
      accessUrl,
    })
  } catch {
    return NextResponse.json(
      { error: 'Sesiune Stripe invalidă sau indisponibilă' },
      { status: 400 }
    )
  }
}
