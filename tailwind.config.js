/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          light: 'var(--canvas-bg)',
          dark: 'var(--canvas-bg)',
        },
        surface: {
          light: '#FFFFFF',
          dark: 'var(--surface-card-dark)',
          subtle: {
            light: 'var(--surface-subtle)',
            dark: 'var(--surface-subtle-dark)',
          }
        },
        borderLine: {
          light: 'var(--border-line)',
          dark: 'var(--border-line-dark)',
          strong: {
            light: 'var(--border-line-strong)',
            dark: 'var(--border-line-strong-dark)',
          }
        },
        pt: {
          accent: 'var(--pt-accent)',
          hover: 'var(--pt-accent-hover)',
          subtle: 'var(--pt-accent-subtle)',
          border: 'var(--pt-accent-border)',
          text: 'var(--pt-accent-text)',
        }
      },
      borderRadius: {
        '3xl': '24px',
        '2xl': '18px',
        'xl': '14px',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
        '5xl': ['48px', { lineHeight: '52px' }],
        '6xl': ['60px', { lineHeight: '64px' }],
      },
      boxShadow: {
        'soft-lift': '0 4px 20px -2px rgba(24, 24, 27, 0.05)',
        'soft-lift-dark': '0 4px 24px -2px rgba(0, 0, 0, 0.35)',
      }
    },
  },
  plugins: [],
}
