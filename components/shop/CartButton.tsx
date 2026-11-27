'use client'

import { ShoppingBag } from 'lucide-react'
import { useCart } from './CartContext'

export function CartButton() {
  const { count, openCart } = useCart()

  return (
    <button
      onClick={openCart}
      className="relative flex items-center gap-1.5 h-9 px-4 font-body text-xs font-medium uppercase tracking-[0.15em] text-white/60 hover:text-white transition-colors duration-150"
      aria-label={`Cart (${count} items)`}
    >
      <ShoppingBag size={16} />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-gold text-black font-body text-[10px] font-bold rounded-full">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  )
}
