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
        },
        content: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          onAccent: 'var(--pt-on-accent)',
        }
      },
      borderRadius: {
        '3xl': '24px',
        '2xl': '18px',
        'xl': '14px',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'soft-lift': '0 4px 20px -2px rgba(24, 24, 27, 0.05)',
        'soft-lift-dark': '0 4px 24px -2px rgba(0, 0, 0, 0.35)',
      },
      gridTemplateColumns: {
        'compare-2': '260px repeat(2, minmax(0, 1fr))',
        'compare-3': '240px repeat(3, minmax(0, 1fr))',
        'compare-4': '220px repeat(4, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}
