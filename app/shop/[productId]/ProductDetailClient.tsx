'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingBag, Minus, Plus, Check } from 'lucide-react'
import type { ShopProduct } from '@/lib/shop'
import { formatPrice } from '@/lib/shop'
import { useCart } from '@/components/shop/CartContext'
import { StripeBuyButton } from '@/components/shop/StripeBuyButton'

interface Props {
  product: ShopProduct
}

export function ProductDetailClient({ product }: Props) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes.length === 1 ? product.sizes[0] : undefined
  )
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors.length === 1 ? product.colors[0] : undefined
  )
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  const image = product.images[0]

  function handleAddToCart() {
    if (product.sizes.length > 0 && !selectedSize) {
      setSizeError(true)
      return
    }
    setSizeError(false)

    addItem({
      priceId: product.priceId,
      productId: product.id,
      name: product.name,
      price: product.price,
      currency: product.currency,
      image: image ?? '',
      size: selectedSize,
      color: selectedColor,
      quantity,
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

      {/* Image */}
      <div className="relative aspect-[3/4] bg-white/5 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            unoptimized
            className="object-cover object-center"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag size={64} className="text-white/10" />
          </div>
        )}

        {product.preorder && (
          <div className="absolute top-4 left-4">
            <span className="font-body text-2xs uppercase tracking-[0.15em] bg-gold text-black px-3 py-1.5">
              Pre-Order
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="lg:sticky lg:top-32">
        <p className="font-body text-2xs text-gold/60 uppercase tracking-[0.25em] mb-3">
          {product.category}
          {product.collection ? ` · ${product.collection}` : ''}
        </p>

        <h1
          className="font-display font-black uppercase text-white leading-none mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
        >
          {product.name}
        </h1>

        <p className="font-display font-black text-gold text-3xl mb-6">
          {formatPrice(product.price, product.currency)}
        </p>

        {product.preorder && (
          <div className="border border-gold/20 bg-gold/5 px-4 py-3 mb-6">
            <p className="font-body text-xs text-gold/80 leading-relaxed">
              This is a pre-order item. It will ship when production is complete.
            </p>
          </div>
        )}

        {product.description && (
          <p className="font-body text-base text-white/50 leading-relaxed mb-8">
            {product.description}
          </p>
        )}

        <div className="w-full h-px bg-white/10 mb-8" />

        {/* Color selection */}
        {product.colors.length > 1 && (
          <div className="mb-6">
            <p className="font-body text-xs text-white/50 uppercase tracking-[0.15em] mb-3">
              Color: <span className="text-white">{selectedColor ?? 'Select'}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`font-body text-xs uppercase tracking-[0.1em] px-4 py-2 border transition-all duration-150 ${
                    selectedColor === color
                      ? 'border-gold text-gold bg-gold/5'
                      : 'border-white/20 text-white/40 hover:border-white/50 hover:text-white/70'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size selection */}
        {product.sizes.length > 0 && (
          <div className="mb-8">
            <p className={`font-body text-xs uppercase tracking-[0.15em] mb-3 ${sizeError ? 'text-red-400' : 'text-white/50'}`}>
              Size: <span className={selectedSize ? 'text-white' : sizeError ? 'text-red-400' : 'text-white/30'}>
                {selectedSize ?? (sizeError ? 'Please select a size' : 'Select')}
              </span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => { setSelectedSize(size); setSizeError(false) }}
                  className={`w-12 h-12 font-body text-xs uppercase tracking-[0.05em] border transition-all duration-150 ${
                    selectedSize === size
                      ? 'border-gold text-gold bg-gold/5'
                      : 'border-white/20 text-white/40 hover:border-white/50 hover:text-white/70'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center border border-white/20">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-12 h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="w-10 text-center font-body text-sm text-white">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              className="w-12 h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
          <span className="font-body text-sm text-white/30">Max 10 per order</span>
        </div>

        {/* Checkout */}
        {product.metadata.buy_button_id ? (
          <div className="mt-2">
            <StripeBuyButton buyButtonId={product.metadata.buy_button_id} />
          </div>
        ) : (
          <>
            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-2 h-14 font-body text-sm font-bold uppercase tracking-[0.2em] transition-all duration-200 ${
                added
                  ? 'bg-white text-black'
                  : 'text-black bg-gold hover:bg-gold-light'
              }`}
            >
              {added ? (
                <><Check size={16} /> Added to Cart</>
              ) : (
                <><ShoppingBag size={16} /> Add to Cart</>
              )}
            </button>
          </>
        )}

        <p className="font-body text-2xs text-white/20 text-center mt-4 leading-relaxed">
          Secure checkout via Stripe · Ships to US &amp; Canada
        </p>
      </div>
    </div>
  )
}
