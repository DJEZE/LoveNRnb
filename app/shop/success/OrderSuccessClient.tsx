'use client'

import { useEffect } from 'react'
import { Check } from 'lucide-react'
import { useCart } from '@/components/shop/CartContext'

export function OrderSuccessClient() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="max-w-lg w-full text-center">
      {/* Check */}
      <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-8">
        <Check size={28} className="text-gold" />
      </div>

      <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">Order Confirmed</p>

      <h1
        className="font-display font-black uppercase text-white leading-none mb-6"
        style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '-0.03em' }}
      >
        You&apos;re<br /><span className="text-gold">Good.</span>
      </h1>

      <p className="font-body text-base text-white/50 leading-relaxed mb-10 max-w-sm mx-auto">
        Your order is confirmed. You&apos;ll receive an email receipt shortly.
        We&apos;ll be in touch when your order ships.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/shop"
          className="inline-flex items-center justify-center h-12 px-8 font-body text-xs font-bold uppercase tracking-[0.2em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
        >
          Keep Shopping
        </a>
        <a
          href="/"
          className="inline-flex items-center justify-center h-12 px-8 font-body text-xs font-bold uppercase tracking-[0.2em] text-gold border border-gold/40 hover:border-gold hover:bg-gold/5 transition-all duration-200"
        >
          Back to Home
        </a>
      </div>

      <p className="font-body text-2xs text-white/20 mt-10">
        Questions about your order? Email{' '}
        <a href="mailto:eze@lovenrnb.com" className="text-white/40 hover:text-white transition-colors">
          eze@lovenrnb.com
        </a>
      </p>
    </div>
  )
}
