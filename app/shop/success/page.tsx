import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { OrderSuccessClient } from './OrderSuccessClient'

export const metadata: Metadata = {
  title: 'Order Confirmed — LoveNRnB Shop',
}

export default function OrderSuccessPage() {
  return (
    <>
      <Navigation />
      <main className="bg-black min-h-screen pt-20 flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6 py-24">
          <OrderSuccessClient />
        </div>
      </main>
      <Footer />
    </>
  )
}
