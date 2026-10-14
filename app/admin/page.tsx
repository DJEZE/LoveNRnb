import type { Metadata } from 'next'
import { db } from '@/lib/server/db'
import { DollarSign, ClipboardList, ShoppingBag, Users, AlertTriangle, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export const metadata: Metadata = { title: 'Overview' }

export const dynamic = 'force-dynamic'

async function getDashboardStats() {
  const [
    vendorApps,
    totalMerchOrders,
    paidMerchOrders,
    pendingMerchOrders,
    totalCustomers,
    totalVendorRevenue,
    totalMerchRevenue,
    recentOrders,
    recentApps,
  ] = await Promise.all([
    db.vendorApplication.groupBy({ by: ['status'], _count: true }),
    db.merchandiseOrder.count(),
    db.merchandiseOrder.count({ where: { status: { in: ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'] } } }),
    db.merchandiseOrder.count({ where: { status: 'PENDING_PAYMENT' } }),
    db.user.count(),
    db.vendorPayment.aggregate({ where: { status: 'succeeded' }, _sum: { amountPaid: true } }),
    db.merchandiseOrder.aggregate({ where: { status: { in: ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'] } }, _sum: { totalAmount: true } }),
    db.merchandiseOrder.findMany({ orderBy: { createdAt: 'desc' }, take: 5, select: { orderNumber: true, totalAmount: true, status: true, createdAt: true, guestEmail: true } }),
    db.vendorApplication.findMany({ orderBy: { createdAt: 'desc' }, take: 5, include: { business: { select: { businessName: true, email: true } } } }),
  ])

  const vendorStatusMap = Object.fromEntries(vendorApps.map((g) => [g.status, g._count]))

  return {
    vendorSubmitted: vendorStatusMap['SUBMITTED'] ?? 0,
    vendorApproved: vendorStatusMap['APPROVED'] ?? 0,
    vendorPending: vendorStatusMap['UNDER_REVIEW'] ?? 0,
    totalMerchOrders,
    paidMerchOrders,
    pendingMerchOrders,
    totalCustomers,
    vendorRevenue: (totalVendorRevenue._sum.amountPaid ?? 0),
    merchRevenue: (totalMerchRevenue._sum.totalAmount ?? 0),
    totalRevenue: (totalVendorRevenue._sum.amountPaid ?? 0) + (totalMerchRevenue._sum.totalAmount ?? 0),
    recentOrders,
    recentApps,
  }
}

function cents(n: number) {
  return `$${(n / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const STATUS_COLORS: Record<string, string> = {
  PENDING_PAYMENT: 'text-yellow-400',
  PAID: 'text-green-400',
  PROCESSING: 'text-blue-400',
  SHIPPED: 'text-blue-300',
  DELIVERED: 'text-green-300',
  CANCELLED: 'text-red-400',
  REFUNDED: 'text-red-300',
  SUBMITTED: 'text-yellow-400',
  UNDER_REVIEW: 'text-blue-400',
  APPROVED: 'text-green-400',
  REJECTED: 'text-red-400',
}

export default async function AdminOverviewPage() {
  const stats = await getDashboardStats()

  const statCards = [
    { label: 'Total Revenue', value: cents(stats.totalRevenue), icon: DollarSign, sub: `${cents(stats.vendorRevenue)} vendors · ${cents(stats.merchRevenue)} merch`, color: 'text-gold' },
    { label: 'Vendor Applications', value: stats.vendorSubmitted + stats.vendorApproved + stats.vendorPending, icon: ClipboardList, sub: `${stats.vendorApproved} approved · ${stats.vendorSubmitted} new`, color: 'text-blue-400' },
    { label: 'Merch Orders', value: stats.totalMerchOrders, icon: ShoppingBag, sub: `${stats.paidMerchOrders} paid · ${stats.pendingMerchOrders} pending`, color: 'text-purple-400' },
    { label: 'Customers', value: stats.totalCustomers, icon: Users, sub: 'Total registered', color: 'text-green-400' },
  ]

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div>
        <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-2">LoveNRnB Admin</p>
        <h1 className="font-display font-black uppercase text-white text-4xl lg:text-5xl">Overview</h1>
        <p className="font-body text-sm text-white/30 mt-2">LoveNRnB Fest · Nov 21, 2026</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-surface-2 border border-white/10 p-5">
            <div className="flex items-start justify-between mb-4">
              <p className="font-body text-2xs text-white/40 uppercase tracking-[0.2em]">{card.label}</p>
              <card.icon size={16} className={card.color} strokeWidth={1.5} />
            </div>
            <p className={cn('font-display font-black text-3xl', card.color)}>{card.value}</p>
            <p className="font-body text-2xs text-white/30 mt-2">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent vendor applications */}
        <div className="bg-surface-2 border border-white/10 p-6">
          <div className="flex items-center justify-between mb-5">
            <p className="font-body text-2xs text-gold uppercase tracking-[0.2em]">Recent Vendor Applications</p>
            <a href="/admin/vendors" className="font-body text-2xs text-white/30 hover:text-white transition-colors uppercase tracking-[0.15em]">View all →</a>
          </div>
          {stats.recentApps.length === 0 ? (
            <p className="font-body text-sm text-white/25">No applications yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentApps.map((app) => (
                <div key={app.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div>
                    <p className="font-body text-sm text-white">{app.business.businessName}</p>
                    <p className="font-body text-2xs text-white/30">{app.business.email}</p>
                  </div>
                  <span className={cn('font-body text-2xs uppercase tracking-[0.15em]', STATUS_COLORS[app.status] ?? 'text-white/40')}>
                    {app.status.replace(/_/g, ' ')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent orders */}
        <div className="bg-surface-2 border border-white/10 p-6">
          <div className="flex items-center justify-between mb-5">
            <p className="font-body text-2xs text-gold uppercase tracking-[0.2em]">Recent Orders</p>
            <a href="/admin/orders" className="font-body text-2xs text-white/30 hover:text-white transition-colors uppercase tracking-[0.15em]">View all →</a>
          </div>
          {stats.recentOrders.length === 0 ? (
            <p className="font-body text-sm text-white/25">No orders yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentOrders.map((order) => (
                <div key={order.orderNumber} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div>
                    <p className="font-body text-sm text-white font-mono">{order.orderNumber}</p>
                    <p className="font-body text-2xs text-white/30">{order.guestEmail}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-body text-sm text-white">{cents(order.totalAmount)}</p>
                    <span className={cn('font-body text-2xs uppercase tracking-[0.1em]', STATUS_COLORS[order.status] ?? 'text-white/40')}>
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Active feature flags */}
      <div className="bg-surface-2 border border-yellow-500/20 p-5">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={14} className="text-yellow-500" />
          <p className="font-body text-2xs text-yellow-500 uppercase tracking-[0.2em]">Feature Flags</p>
        </div>
        <p className="font-body text-sm text-white/50">
          <span className="text-white font-semibold">Independent ticketing is DISABLED</span> for November 2026. POSH integration remains active. Ticketing infrastructure will be enabled for 2027 after explicit authorization.
        </p>
      </div>
    </div>
  )
}
