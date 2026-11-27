'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, Minus, Plus, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react'
import { useCart } from './CartContext'
import { formatPrice } from '@/lib/shop'

export function CartDrawer() {
  const { items, count, total, removeItem, updateQuantity, clearCart, isOpen, closeCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCheckout() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/shop/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            priceId: i.priceId,
            quantity: i.quantity,
            size: i.size,
            color: i.color,
            name: i.name,
          })),
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 flex flex-col transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-gold" />
            <span className="font-display font-black uppercase text-white text-lg tracking-wide">
              Your Cart
            </span>
            {count > 0 && (
              <span className="font-body text-xs text-gold border border-gold/40 px-2 py-0.5">
                {count}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="text-white/40 hover:text-white transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-white/10" />
              <p className="font-display font-black uppercase text-white/20 text-2xl">Empty</p>
              <p className="font-body text-sm text-white/30">Add some merch to get started.</p>
              <button
                onClick={closeCart}
                className="mt-2 font-body text-xs text-gold uppercase tracking-[0.15em] hover:text-gold-light transition-colors"
              >
                Continue Shopping →
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.priceId}-${item.size}-${item.color}`}
                  className="flex gap-4"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 flex-shrink-0 bg-white/5 overflow-hidden">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag size={20} className="text-white/20" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-semibold text-white leading-tight mb-1 truncate">
                      {item.name}
                    </p>
                    <div className="flex gap-3 mb-3">
                      {item.size && (
                        <span className="font-body text-2xs text-white/40 uppercase tracking-[0.1em]">
                          Size: {item.size}
                        </span>
                      )}
                      {item.color && (
                        <span className="font-body text-2xs text-white/40 uppercase tracking-[0.1em]">
                          {item.color}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      {/* Qty */}
                      <div className="flex items-center border border-white/10">
                        <button
                          onClick={() => updateQuantity(item.priceId, item.size, item.color, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center font-body text-xs text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.priceId, item.size, item.color, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-body text-sm font-semibold text-white">
                          {formatPrice(item.price * item.quantity, item.currency)}
                        </span>
                        <button
                          onClick={() => removeItem(item.priceId, item.size, item.color)}
                          className="text-white/20 hover:text-white/60 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/10 px-6 py-6 space-y-4">
            {error && (
              <p className="font-body text-xs text-red-400 text-center">{error}</p>
            )}

            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-white/50 uppercase tracking-[0.1em]">Subtotal</span>
              <span className="font-display font-black text-white text-xl">{formatPrice(total)}</span>
            </div>
            <p className="font-body text-2xs text-white/25">
              Shipping &amp; taxes calculated at checkout. Discount codes accepted at checkout.
            </p>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 h-14 font-body text-sm font-bold uppercase tracking-[0.2em] text-black bg-gold hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Processing…</>
              ) : (
                <>Checkout <ArrowRight size={16} /></>
              )}
            </button>

            <button
              onClick={clearCart}
              className="w-full font-body text-2xs text-white/25 uppercase tracking-[0.1em] hover:text-white/50 transition-colors"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}
