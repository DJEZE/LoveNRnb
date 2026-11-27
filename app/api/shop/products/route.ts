import { NextResponse } from 'next/server'
import { getShopProducts } from '@/lib/shop'

export const revalidate = 60 // cache for 60 seconds

export async function GET() {
  try {
    const products = await getShopProducts()
    return NextResponse.json({ products })
  } catch (err) {
    console.error('Failed to fetch shop products:', err)
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 })
  }
}
