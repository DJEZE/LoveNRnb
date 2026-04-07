import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'gold' | 'outline' | 'ghost' | 'gold-outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
  isExternal?: boolean
}

const variantStyles: Record<Variant, string> = {
  gold: [
    'bg-gold-gradient text-background font-semibold',
    'hover:shadow-gold-md hover:brightness-110',
    'active:brightness-95',
  ].join(' '),
  outline: [
    'border border-gold-border text-cream bg-transparent',
    'hover:border-gold hover:bg-gold-faint hover:text-gold-light',
    'active:bg-gold-subtle',
  ].join(' '),
  ghost: [
    'text-cream-muted bg-transparent border-transparent',
    'hover:text-cream hover:bg-cream-faint',
  ].join(' '),
  'gold-outline': [
    'border border-gold text-gold bg-transparent',
    'hover:bg-gold hover:text-background',
    'active:opacity-90',
  ].join(' '),
}

const sizeStyles: Record<Size, string> = {
  sm: 'h-9 px-4 text-xs tracking-widest',
  md: 'h-11 px-6 text-xs tracking-widest',
  lg: 'h-14 px-8 text-sm tracking-widest',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'gold',
      size = 'md',
      className,
      children,
      href,
      isExternal,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      // base
      'inline-flex items-center justify-center gap-2',
      'font-body uppercase tracking-widest',
      'rounded-sm transition-all duration-300 ease-smooth',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'disabled:opacity-40 disabled:cursor-not-allowed',
      'cursor-pointer select-none',
      variantStyles[variant],
      sizeStyles[size],
      className
    )

    if (href) {
      return (
        <a
          href={href}
          className={classes}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
