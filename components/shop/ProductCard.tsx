import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import type { ShopProduct } from '@/lib/shop'
import { formatPrice } from '@/lib/shop'

interface ProductCardProps {
  product: ShopProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0]

  return (
    <Link href={`/shop/${product.id}`} className="group block">
      {/* Image */}
      <div className="relative aspect-square bg-white overflow-hidden mb-4">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            unoptimized
            className="object-contain object-center p-3 group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag size={40} className="text-white/10" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.preorder && (
            <span className="font-body text-2xs uppercase tracking-[0.15em] bg-gold text-black px-2 py-1">
              Pre-Order
            </span>
          )}
          {product.featured && !product.preorder && (
            <span className="font-body text-2xs uppercase tracking-[0.15em] bg-white text-black px-2 py-1">
              Featured
            </span>
          )}
        </div>

        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 h-12 flex items-center justify-center bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="font-body text-2xs uppercase tracking-[0.2em] text-white">
            {product.sizes.length > 0 ? 'Select Size' : 'View Item'}
          </span>
        </div>
      </div>

      {/* Info */}
      <div>
        <p className="font-body text-2xs text-gold/60 uppercase tracking-[0.2em] mb-1">
          {product.category}
          {product.collection ? ` · ${product.collection}` : ''}
        </p>
        <h3 className="font-body text-sm font-semibold text-white leading-tight mb-1 group-hover:text-gold transition-colors duration-150">
          {product.name}
        </h3>
        <p className="font-body text-sm text-white/50">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>
    </Link>
  )
}
