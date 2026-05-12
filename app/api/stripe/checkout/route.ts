import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { priceId, courseName } = body

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID este obligatoriu' },
        { status: 400 }
      )
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

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
        courseName: courseName || '',
      },
      locale: 'ro',
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'A apărut o eroare la procesarea plății' },
      { status: 500 }
    )
  }
}
