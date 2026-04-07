import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#080808',
        surface: {
          DEFAULT: '#111111',
          2: '#161616',
          3: '#1C1C1C',
          4: '#222222',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#D4B86A',
          dark: '#A8893C',
          faint: 'rgba(201, 168, 76, 0.08)',
          subtle: 'rgba(201, 168, 76, 0.15)',
          border: 'rgba(201, 168, 76, 0.25)',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          muted: '#A89F94',
          faint: 'rgba(245, 240, 232, 0.06)',
        },
        dim: '#4A4A4A',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'Menlo', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem', letterSpacing: '0.1em' }],
        'display-sm': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(3.5rem, 7vw, 6rem)', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(4.5rem, 10vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-xl': ['clamp(5.5rem, 14vw, 13rem)', { lineHeight: '0.9', letterSpacing: '-0.05em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      borderRadius: {
        'sm': '3px',
        DEFAULT: '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400% center' },
          '100%': { backgroundPosition: '400% center' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.85)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #A8893C 0%, #D4B86A 45%, #C9A84C 55%, #A8893C 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #C9A84C 0%, #F5E6AA 30%, #C9A84C 60%, #F5E6AA 90%, #C9A84C 100%)',
        'dark-vignette': 'radial-gradient(ellipse at center, transparent 40%, #080808 100%)',
        'hero-overlay': 'linear-gradient(180deg, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.5) 50%, rgba(8,8,8,0.95) 100%)',
        'section-fade-top': 'linear-gradient(180deg, #080808 0%, transparent 100%)',
        'section-fade-bottom': 'linear-gradient(0deg, #080808 0%, transparent 100%)',
      },
      boxShadow: {
        'gold-sm': '0 0 12px rgba(201, 168, 76, 0.2)',
        'gold-md': '0 0 24px rgba(201, 168, 76, 0.25)',
        'gold-lg': '0 0 48px rgba(201, 168, 76, 0.2)',
        'card': '0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 1px 0 rgba(255,255,255,0.06), 0 8px 40px rgba(0,0,0,0.5)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

export default config
