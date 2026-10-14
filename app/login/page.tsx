import type { Metadata } from 'next'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata: Metadata = { title: 'Sign In' }

export default function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: string }
}) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-1">
          <p className="font-body text-2xs text-gold uppercase tracking-[0.3em]">LoveNRnB</p>
          <h1 className="font-display font-black uppercase text-white text-3xl">Admin Access</h1>
        </div>

        {searchParams.error && (
          <p className="font-body text-xs text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-3 text-center">
            {searchParams.error === 'CredentialsSignin' ? 'Invalid email or password.' : 'Authentication error.'}
          </p>
        )}

        <LoginForm callbackUrl={searchParams.callbackUrl ?? '/admin'} />
      </div>
    </div>
  )
}
