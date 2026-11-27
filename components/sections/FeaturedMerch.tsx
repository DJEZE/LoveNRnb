import Link from 'next/link'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ProductCard } from '@/components/shop/ProductCard'
import { getShopProducts } from '@/lib/shop'

export async function FeaturedMerch() {
  let featured = []
  try {
    const all = await getShopProducts()
    featured = all.filter((p) => p.featured).slice(0, 4)
    if (featured.length === 0) featured = all.slice(0, 4)
  } catch {
    return null
  }

  if (featured.length === 0) return null

  return (
    <section className="bg-black border-t border-white/10">
      <div className="container mx-auto px-6 py-16 lg:py-24">
        <AnimatedSection className="flex items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">
              Vol. 001
            </p>
            <h2
              className="font-display font-black uppercase text-white leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', letterSpacing: '-0.03em' }}
            >
              Pray For<br />
              <span className="text-gold">Love.</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.15em] text-gold hover:text-gold-light transition-colors flex-shrink-0"
          >
            Shop All <ArrowRight size={14} />
          </Link>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-10">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="text-center sm:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 h-12 px-8 font-body text-sm font-bold uppercase tracking-[0.2em] text-black bg-gold hover:bg-gold-light transition-colors"
          >
            <ShoppingBag size={16} />
            Shop All Merch
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
