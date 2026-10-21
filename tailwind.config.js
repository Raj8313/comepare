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
          light: '#F7F5EE',
          dark: '#0C1317',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#111B21',
          subtle: {
            light: '#F0ECE1',
            dark: '#182229',
          }
        },
        outline: {
          light: '#18181B', // Crisp black/dark-slate outline
          dark: '#2A3942',
        },
        wa: {
          green: '#25D366',
          greenDark: '#00A884',
          greenHover: '#1EBE5D',
        }
      },
      borderRadius: {
        '3xl': '28px',
        '2xl': '20px',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
