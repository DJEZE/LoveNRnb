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
        background: '#000000',
        surface: {
          DEFAULT: '#0A0A0A',
          2: '#111111',
          3: '#181818',
          4: '#222222',
        },
        gold: {
          DEFAULT: '#CC0000',
          light: '#E52020',
          dark: '#A80000',
          faint: 'rgba(204, 0, 0, 0.08)',
          subtle: 'rgba(204, 0, 0, 0.15)',
          border: 'rgba(204, 0, 0, 0.35)',
        },
        white: '#FFFFFF',
        offwhite: '#F0EDE8',
        dim: '#555555',
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          strong: 'rgba(255, 255, 255, 0.2)',
        },
      },
      fontFamily: {
        display: ['var(--font-barlow-condensed)', 'Impact', 'Arial Narrow', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'Menlo', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem', letterSpacing: '0.12em' }],
        'display-sm': ['clamp(3rem, 6vw, 5rem)', { lineHeight: '0.95', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(5rem, 10vw, 9rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(7rem, 15vw, 14rem)', { lineHeight: '0.88', letterSpacing: '-0.03em' }],
        'display-xl': ['clamp(10rem, 22vw, 22rem)', { lineHeight: '0.85', letterSpacing: '-0.04em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      borderRadius: {
        DEFAULT: '0px',
        'sm': '2px',
        'md': '4px',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-slow': 'marquee 50s linear infinite',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #A80000 0%, #E52020 45%, #CC0000 55%, #A80000 100%)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

export default config
