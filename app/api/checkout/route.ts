import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// ---------------------------------------------------------------------------
// POST /api/checkout
// Creates a Stripe Checkout session and returns the redirect URL.
//
// Required env vars (set in Vercel dashboard):
//   STRIPE_SECRET_KEY          — Stripe dashboard → Developers → API Keys
//   NEXT_PUBLIC_SITE_URL       — your production URL, e.g. https://lovenrnb.com
//
// Body: { priceId: string }   — the Stripe Price ID for the selected tier
// ---------------------------------------------------------------------------

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2024-06-20',
})

export async function POST(req: NextRequest) {
  const { priceId } = await req.json()

  if (!priceId || typeof priceId !== 'string') {
    return NextResponse.json({ error: 'Missing priceId' }, { status: 400 })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Missing STRIPE_SECRET_KEY env var')
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lovenrnb.com'

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/tickets?success=1`,
      cancel_url: `${siteUrl}/tickets?canceled=1`,
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
