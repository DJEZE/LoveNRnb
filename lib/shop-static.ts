import type { ShopProduct } from './shop'

export const STATIC_PRODUCTS: ShopProduct[] = [
  {
    id: 'pray-for-love-longsleeve',
    name: 'Pray For Love Long Sleeve',
    description: 'LoveNRnB Vol. 001. Black long sleeve with red old english "Pray For Love" graphics front and back.',
    images: ['/images/merch-pray-for-love-longsleeve.jpg'],
    priceId: '',
    price: 4500,
    currency: 'usd',
    category: 'apparel',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black'],
    collection: 'Vol. 001',
    preorder: false,
    featured: true,
    active: true,
    metadata: { buy_button_id: 'buy_btn_1UgTlsDfa6xjnJVQGPUDnqMV', payment_link: 'https://buy.stripe.com/6oU6oH8xR9I343S4249sk03' },
  },
]

export function getStaticProduct(id: string): ShopProduct | null {
  return STATIC_PRODUCTS.find((p) => p.id === id) ?? null
}
