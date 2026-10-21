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
          light: '#F8F7F3', // Warm chalk/ivory
          dark: '#0E1114',  // Deep graphite obsidian
        },
        surface: {
          light: '#FFFFFF',
          dark: '#161A1F',
          subtle: {
            light: '#F1EFEA',
            dark: '#1D2329',
          }
        },
        borderLine: {
          light: '#E2DFD7', // Soft, natural, elegant border
          dark: '#262D35',
          strong: {
            light: '#C9C4B7',
            dark: '#3A444E',
          }
        },
        speed: {
          green: '#10B981', // Clean electric emerald
          greenDark: '#059669',
          amber: '#F59E0B',
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
      boxShadow: {
        'soft-lift': '0 4px 20px -2px rgba(24, 24, 27, 0.05)',
        'soft-lift-dark': '0 4px 24px -2px rgba(0, 0, 0, 0.35)',
      }
    },
  },
  plugins: [],
}
