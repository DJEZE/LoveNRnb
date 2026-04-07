import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  align?: 'left' | 'center'
}

export function SectionLabel({ children, className, align = 'left' }: SectionLabelProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-3',
        align === 'center' && 'justify-center',
        className
      )}
    >
      <span className="w-8 h-px bg-gold opacity-60" />
      <span className="font-body text-2xs text-gold uppercase tracking-[0.25em] font-medium">
        {children}
      </span>
      <span className="w-8 h-px bg-gold opacity-60" />
    </div>
  )
}
