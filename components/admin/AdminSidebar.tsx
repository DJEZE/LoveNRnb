'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Package,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  FileText,
  Tag,
  QrCode,
  ClipboardList,
} from 'lucide-react'

const NAV = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Vendors', href: '/admin/vendors', icon: ClipboardList },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Finance', href: '/admin/finance', icon: DollarSign },
  { label: 'Promo Codes', href: '/admin/promos', icon: Tag },
  { label: 'Reports', href: '/admin/reports', icon: BarChart3 },
  { label: 'Audit Log', href: '/admin/audit', icon: FileText },
  { label: 'Scanner', href: '/admin/scanner', icon: QrCode },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 bg-surface-2 border-r border-white/10 flex flex-col min-h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/10">
        <Link href="/admin">
          <Image
            src="/images/lovenrnb-logo.png"
            alt="LoveNRnB"
            width={120}
            height={60}
            className="h-8 w-auto object-contain"
          />
        </Link>
        <p className="font-body text-2xs text-gold uppercase tracking-[0.2em] mt-2">Admin</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ label, href, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 font-body text-xs uppercase tracking-[0.15em] transition-colors duration-150',
                active
                  ? 'bg-gold/10 text-gold border-l-2 border-gold -ml-0.5 pl-3.5'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon size={15} strokeWidth={1.5} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10">
        <Link
          href="/api/auth/signout"
          className="flex items-center gap-3 px-3 py-2.5 font-body text-xs uppercase tracking-[0.15em] text-white/30 hover:text-red-400 transition-colors"
        >
          <LogOut size={15} strokeWidth={1.5} />
          Sign Out
        </Link>
      </div>
    </aside>
  )
}
