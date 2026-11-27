'use client'

import { type ReactNode } from 'react'
import { CartProvider } from './CartContext'
import { CartDrawer } from './CartDrawer'

export function ShopProviders({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  )
}
