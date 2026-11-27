import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { validateCartItems } from '@/lib/shop'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2024-06-20',
})

interface CartItemPayload {
  priceId: string
  quantity: number
  size?: string
  color?: string
  name?: string
}

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  try {
    const { items, discountCode } = await req.json() as {
      items: CartItemPayload[]
      discountCode?: string
    }

    if (!items?.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Validate prices server-side — never trust client amounts
    const validated = await validateCartItems(
      items.map((i) => ({ priceId: i.priceId, quantity: i.quantity }))
    )

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lovenrnb.com'

    const lineItems = validated.map((v, i) => {
      const original = items[i]
      return {
        price: v.priceId,
        quantity: v.quantity,
        ...(original.size || original.color
          ? {
              adjustable_quantity: { enabled: false },
            }
          : {}),
      }
    })

    // Build metadata for order notes (size/color per item)
    const orderMetadata: Record<string, string> = {}
    items.forEach((item, i) => {
      if (item.size) orderMetadata[`item_${i + 1}_size`] = item.size
      if (item.color) orderMetadata[`item_${i + 1}_color`] = item.color
      if (item.name) orderMetadata[`item_${i + 1}_name`] = item.name
    })

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      line_items: lineItems,
      success_url: `${siteUrl}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/shop?canceled=1`,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
      metadata: orderMetadata,
    }

    // Apply a specific discount code if provided
    if (discountCode) {
      const coupons = await stripe.promotionCodes.list({
        code: discountCode,
        active: true,
        limit: 1,
      })
      if (coupons.data.length > 0) {
        sessionParams.discounts = [{ promotion_code: coupons.data[0].id }]
        delete sessionParams.allow_promotion_codes
      }
    }

    const session = await stripe.checkout.sessions.create(sessionParams)
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Shop checkout error:', err)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
