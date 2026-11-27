import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { getShopProduct } from '@/lib/shop'
import { ProductDetailClient } from './ProductDetailClient'

export const revalidate = 60

interface Props {
  params: Promise<{ productId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params
  const product = await getShopProduct(productId)
  if (!product) return { title: 'Product Not Found — LoveNRnB Shop' }

  return {
    title: `${product.name} — LoveNRnB Shop`,
    description: product.description || `Shop ${product.name} from LoveNRnB.`,
    openGraph: {
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { productId } = await params
  const product = await getShopProduct(productId)

  if (!product) notFound()

  return (
    <>
      <Navigation />
      <main className="bg-black min-h-screen pt-20">
        <div className="container mx-auto px-6 py-16 lg:py-24">
          <AnimatedSection>
            <a
              href="/shop"
              className="inline-flex items-center gap-2 font-body text-2xs text-white/30 uppercase tracking-[0.2em] hover:text-white/60 transition-colors mb-12"
            >
              ← Back to Shop
            </a>
          </AnimatedSection>

          <ProductDetailClient product={product} />
        </div>
      </main>
      <Footer />
    </>
  )
}
