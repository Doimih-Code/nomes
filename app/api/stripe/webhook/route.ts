import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createCourseAccessLink, createCourseAccessToken } from '@/lib/course-access'
import { validateServerEnv } from '@/lib/env-validation'
import { sendCourseAccessEmail } from '@/lib/email-service'
import {
  getCourseCheckoutConfig,
  getCourseMaterialsUrl,
  isCourseKey,
} from '@/lib/stripe-course-config'
import Stripe from 'stripe'

const PROCESSED_EVENTS_TTL_MS = 24 * 60 * 60 * 1000
const processedEvents = new Map<string, number>()

function cleanupExpiredProcessedEvents(currentTimestamp: number) {
  for (const [eventId, expiresAt] of processedEvents.entries()) {
    if (expiresAt <= currentTimestamp) {
      processedEvents.delete(eventId)
    }
  }
}

function wasEventProcessed(eventId: string): boolean {
  const currentTimestamp = Date.now()
  cleanupExpiredProcessedEvents(currentTimestamp)

  const expiresAt = processedEvents.get(eventId)
  if (expiresAt && expiresAt > currentTimestamp) {
    return true
  }

  processedEvents.set(eventId, currentTimestamp + PROCESSED_EVENTS_TTL_MS)
  return false
}

function getAppUrl(): string {
  const value = process.env.NEXT_PUBLIC_APP_URL

  if (!value) {
    throw new Error('NEXT_PUBLIC_APP_URL is required for Stripe fulfillment links')
  }

  return value
}

export async function POST(request: NextRequest) {
  validateServerEnv({
    requireStripe: true,
    requireEmail: true,
    requireCourseAccess: true,
  })

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Lipsă semnătură Stripe' },
      { status: 400 }
    )
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json(
      { error: 'Webhook secret nu este configurat' },
      { status: 500 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json(
      { error: 'Semnătură webhook invalidă' },
      { status: 400 }
    )
  }

  try {
    if (wasEventProcessed(event.id)) {
      return NextResponse.json({ received: true, duplicate: true })
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const courseKeyValue = session.metadata?.courseKey

        if (!isCourseKey(courseKeyValue)) {
          console.error('Stripe checkout completed with invalid course key', {
            eventId: event.id,
            sessionId: session.id,
            courseKey: courseKeyValue,
          })
          break
        }

        const customerEmail = session.customer_details?.email || session.customer_email
        if (!customerEmail) {
          console.error('Stripe checkout completed without customer email', {
            eventId: event.id,
            sessionId: session.id,
            courseKey: courseKeyValue,
          })
          break
        }

        const courseConfig = getCourseCheckoutConfig(courseKeyValue)
        const materialsUrl = getCourseMaterialsUrl(courseKeyValue)

        if (!materialsUrl) {
          console.error('Missing course materials url for fulfilled Stripe checkout', {
            eventId: event.id,
            sessionId: session.id,
            courseKey: courseKeyValue,
          })
          break
        }

        const accessToken = createCourseAccessToken({
          sessionId: session.id,
          email: customerEmail,
          courseKey: courseKeyValue,
        })
        const accessLink = createCourseAccessLink({
          appUrl: getAppUrl(),
          token: accessToken,
          courseKey: courseKeyValue,
        })

        await sendCourseAccessEmail({
          customerEmail,
          customerName: session.customer_details?.name || null,
          courseName: courseConfig.displayName,
          accessLink,
          sessionId: session.id,
          amountTotal: session.amount_total || null,
          currency: session.currency || null,
        })

        console.log('Stripe checkout completed', {
          sessionId: session.id,
          eventId: event.id,
          courseKey: courseKeyValue,
          customerEmail,
        })
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.error('Stripe payment failed', {
          paymentIntentId: paymentIntent.id,
          eventId: event.id,
        })
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        console.log('Stripe charge refunded', {
          chargeId: charge.id,
          eventId: event.id,
        })
        break
      }

      default:
        console.log('Stripe unhandled event', { eventType: event.type, eventId: event.id })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Eroare la procesarea webhook-ului:', error)
    return NextResponse.json(
      { error: 'Eroare internă la procesarea webhook-ului' },
      { status: 500 }
    )
  }
}
