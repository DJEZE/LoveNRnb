import Stripe from 'stripe'

export interface ShopProduct {
  id: string
  name: string
  description: string
  images: string[]
  priceId: string
  price: number // in cents
  currency: string
  category: string
  sizes: string[]
  colors: string[]
  collection: string
  preorder: boolean
  featured: boolean
  active: boolean
  metadata: Record<string, string>
}

export interface CartItem {
  priceId: string
  productId: string
  name: string
  price: number
  currency: string
  image: string
  size?: string
  color?: string
  quantity: number
}

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('Missing STRIPE_SECRET_KEY')
  return new Stripe(key, { apiVersion: '2024-06-20' })
}

function parseList(value: string | undefined): string[] {
  if (!value) return []
  return value.split(',').map((s) => s.trim()).filter(Boolean)
}

function stripeProductToShopProduct(
  product: Stripe.Product,
  price: Stripe.Price
): ShopProduct {
  const m = product.metadata ?? {}
  return {
    id: product.id,
    name: product.name,
    description: product.description ?? '',
    images: product.images ?? [],
    priceId: price.id,
    price: price.unit_amount ?? 0,
    currency: price.currency ?? 'usd',
    category: m.category ?? 'apparel',
    sizes: parseList(m.sizes),
    colors: parseList(m.colors),
    collection: m.collection ?? '',
    preorder: m.preorder === 'true',
    featured: m.featured === 'true',
    active: product.active,
    metadata: m,
  }
}

export async function getShopProducts(): Promise<ShopProduct[]> {
  const stripe = getStripe()

  const products = await stripe.products.list({
    active: true,
    expand: ['data.default_price'],
    limit: 100,
  })

  const result: ShopProduct[] = []

  for (const product of products.data) {
    if (!product.metadata?.shop) continue // only include products tagged shop=true
    const price = product.default_price as Stripe.Price | null
    if (!price || !price.unit_amount) continue
    result.push(stripeProductToShopProduct(product, price))
  }

  // sort: featured first, then by name
  return result.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return a.name.localeCompare(b.name)
  })
}

export async function getShopProduct(productId: string): Promise<ShopProduct | null> {
  const stripe = getStripe()

  try {
    const product = await stripe.products.retrieve(productId, {
      expand: ['default_price'],
    })

    if (!product.active) return null
    const price = product.default_price as Stripe.Price | null
    if (!price || !price.unit_amount) return null

    return stripeProductToShopProduct(product, price)
  } catch {
    return null
  }
}

export async function validateCartItems(
  items: { priceId: string; quantity: number }[]
): Promise<{ priceId: string; quantity: number; unitAmount: number }[]> {
  const stripe = getStripe()

  const validated = await Promise.all(
    items.map(async (item) => {
      const price = await stripe.prices.retrieve(item.priceId)
      if (!price.active || !price.unit_amount) {
        throw new Error(`Price ${item.priceId} is not available`)
      }
      return {
        priceId: price.id,
        quantity: Math.max(1, Math.min(item.quantity, 10)),
        unitAmount: price.unit_amount,
      }
    })
  )

  return validated
}

export function formatPrice(cents: number, currency = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(cents / 100)
}
