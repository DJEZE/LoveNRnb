import { auth } from '@/auth'
import { NextResponse } from 'next/server'

const ADMIN_ROLES = ['SUPER_ADMIN', 'FINANCE_ADMIN', 'VENDOR_MANAGER', 'MERCH_MANAGER', 'CUSTOMER_SUPPORT', 'EVENT_OPS', 'ANALYST']

export default auth((req) => {
  const { pathname } = req.nextUrl

  // Admin routes require authentication + admin role
  if (pathname.startsWith('/admin')) {
    if (!req.auth) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    const roles: string[] = (req.auth.user as any)?.roles ?? []
    const isAdmin = roles.some((r) => ADMIN_ROLES.includes(r))
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/?error=unauthorized', req.url))
    }
  }

  // Vendor dashboard requires authentication
  if (pathname.startsWith('/vendor/dashboard')) {
    if (!req.auth) {
      return NextResponse.redirect(new URL('/login?next=/vendor/dashboard', req.url))
    }
  }

  // Account routes require authentication
  if (pathname.startsWith('/account')) {
    if (!req.auth) {
      return NextResponse.redirect(new URL('/login?next=/account', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*', '/vendor/dashboard/:path*', '/account/:path*'],
}
