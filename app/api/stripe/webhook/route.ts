import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
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
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        console.log('Plată finalizată cu succes:', {
          sessionId: session.id,
          customerEmail: session.customer_details?.email,
          courseName: session.metadata?.courseName,
          amount: session.amount_total,
        })
        // TODO: Trimite email de confirmare via Nodemailer
        // await sendOrderConfirmationEmail({ ... })
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.error('Plată eșuată:', paymentIntent.id)
        break
      }

      default:
        console.log(`Eveniment Stripe netratat: ${event.type}`)
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
