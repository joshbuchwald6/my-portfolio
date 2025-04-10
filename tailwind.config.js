const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        background: '#F9F9F9', // Off-white background
        foreground: '#111111', // Near-black text
        muted: {
          DEFAULT: '#E5E5E5', // Light gray borders/dividers
          foreground: '#666666', // Medium gray secondary text
        },
        accent: {
          DEFAULT: '#EC4899', // Pink accent
          foreground: '#FFFFFF', // White text on accent
        },
        // ... (keep existing shadcn/ui colors like border, input, ring, etc. if using)
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      boxShadow: {
        subtle: '0 4px 15px rgba(0, 0, 0, 0.05)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} 