'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { CartItem } from '@/lib/shop'

interface CartContextValue {
  items: CartItem[]
  count: number
  total: number
  addItem: (item: CartItem) => void
  removeItem: (priceId: string, size?: string, color?: string) => void
  updateQuantity: (priceId: string, size: string | undefined, color: string | undefined, quantity: number) => void
  clearCart: () => void
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function itemKey(item: Pick<CartItem, 'priceId' | 'size' | 'color'>) {
  return `${item.priceId}__${item.size ?? ''}__${item.color ?? ''}`
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lovenrnb_cart')
      if (stored) setItems(JSON.parse(stored))
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem('lovenrnb_cart', JSON.stringify(items))
    } catch {}
  }, [items, hydrated])

  const addItem = useCallback((newItem: CartItem) => {
    setItems((prev) => {
      const key = itemKey(newItem)
      const existing = prev.find((i) => itemKey(i) === key)
      if (existing) {
        return prev.map((i) =>
          itemKey(i) === key
            ? { ...i, quantity: Math.min(i.quantity + newItem.quantity, 10) }
            : i
        )
      }
      return [...prev, newItem]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((priceId: string, size?: string, color?: string) => {
    setItems((prev) => prev.filter((i) => itemKey(i) !== itemKey({ priceId, size, color })))
  }, [])

  const updateQuantity = useCallback(
    (priceId: string, size: string | undefined, color: string | undefined, quantity: number) => {
      if (quantity <= 0) {
        removeItem(priceId, size, color)
        return
      }
      setItems((prev) =>
        prev.map((i) =>
          itemKey(i) === itemKey({ priceId, size, color })
            ? { ...i, quantity: Math.min(quantity, 10) }
            : i
        )
      )
    },
    [removeItem]
  )

  const clearCart = useCallback(() => setItems([]), [])
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const count = items.reduce((s, i) => s + i.quantity, 0)
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, count, total, addItem, removeItem, updateQuantity, clearCart, isOpen, openCart, closeCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
