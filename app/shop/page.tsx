import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ProductCard } from '@/components/shop/ProductCard'
import { getShopProducts, type ShopProduct } from '@/lib/shop'

export const metadata: Metadata = {
  title: 'Shop — LoveNRnB',
  description: 'Wear the culture. Shop official LoveNRnB merchandise — apparel, accessories, and more from the South\'s premier R&B experience.',
}

export const revalidate = 60

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>
}) {
  const params = await searchParams
  const canceled = params.canceled === '1'

  let products: ShopProduct[] = []
  let loadError = false

  try {
    products = await getShopProducts()
  } catch {
    loadError = true
  }

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))]

  return (
    <>
      <Navigation />
      <main className="bg-black min-h-screen pt-20">

        {/* Canceled banner */}
        {canceled && (
          <div className="bg-white/5 border-b border-white/10 py-3 px-6 text-center">
            <p className="font-body text-xs text-white/50">
              Your checkout was canceled. Your cart is saved — continue whenever you&apos;re ready.
            </p>
          </div>
        )}

        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(204,0,0,0.12) 0%, rgba(140,0,0,0.05) 50%, transparent 70%), #000`,
          }}
        >
          <div className="container mx-auto px-6 py-20 lg:py-28">
            <AnimatedSection>
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-5">
                LoveNRnB Shop
              </p>
              <h1
                className="font-display font-black uppercase text-white leading-none mb-6"
                style={{ fontSize: 'clamp(4rem, 11vw, 11rem)', letterSpacing: '-0.03em' }}
              >
                Wear The<br />
                <span className="text-gold">Culture.</span>
              </h1>
              <p className="font-body text-base lg:text-lg text-white/50 max-w-xl leading-relaxed">
                Official LoveNRnB merchandise. Premium apparel and accessories for R&amp;B lovers.
              </p>
            </AnimatedSection>
          </div>
          <div className="w-full h-px bg-white/10" />
        </section>

        {/* Products */}
        <section className="bg-black">
          <div className="container mx-auto px-6 py-16 lg:py-24">

            {loadError ? (
              <AnimatedSection className="text-center py-24">
                <p className="font-body text-base text-white/40">
                  Unable to load products right now. Please check back soon.
                </p>
              </AnimatedSection>
            ) : products.length === 0 ? (
              <AnimatedSection className="text-center py-24">
                <ShoppingBagEmpty />
              </AnimatedSection>
            ) : (
              <AnimatedSection>
                {/* Category filter — client-side via URL could be added later */}
                <div className="flex flex-wrap gap-3 mb-12">
                  {categories.map((cat) => (
                    <span
                      key={cat}
                      className="font-body text-2xs uppercase tracking-[0.15em] border border-white/10 px-4 py-2 text-white/40 cursor-default"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </AnimatedSection>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-black border-t border-white/10">
          <div className="container mx-auto px-6 py-16 text-center">
            <AnimatedSection>
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">Questions?</p>
              <p className="font-body text-sm text-white/40 mb-4">
                For order inquiries, sizing help, or bulk orders, reach out directly.
              </p>
              <a
                href="mailto:eze@lovenrnb.com"
                className="font-body text-xs text-gold uppercase tracking-[0.15em] hover:text-gold-light transition-colors"
              >
                eze@lovenrnb.com →
              </a>
            </AnimatedSection>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

function ShoppingBagEmpty() {
  return (
    <div className="flex flex-col items-center gap-6">
      <p
        className="font-display font-black uppercase text-white/10 leading-none"
        style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.03em' }}
      >
        Coming Soon
      </p>
      <p className="font-body text-base text-white/30 max-w-sm">
        The shop is being stocked. Check back soon for official LoveNRnB merch.
      </p>
      <a
        href="https://laylo.com/lovenrnb_/X16P9f"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center h-11 px-8 font-body text-xs font-semibold uppercase tracking-[0.2em] text-black bg-gold hover:bg-gold-light transition-colors"
      >
        Get Notified
      </a>
    </div>
  )
}
