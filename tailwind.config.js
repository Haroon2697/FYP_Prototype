/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        electric: {
          cyan: '#06b6d4',
          teal: '#14b8a6',
          emerald: '#10b981',
          coral: '#f43f5e',
          amber: '#f59e0b',
          violet: '#7c3aed',
          indigo: '#4f46e5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'elevated': '0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'premium': '0 12px 30px -4px rgba(124, 58, 237, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'glow-violet': '0 0 25px -4px rgba(124, 58, 237, 0.4)',
        'glow-cyan': '0 0 25px -4px rgba(6, 182, 212, 0.4)',
        'glow-coral': '0 0 25px -4px rgba(244, 63, 94, 0.4)',
        'glow-emerald': '0 0 25px -4px rgba(16, 185, 129, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(at 100% 0%, rgba(124, 58, 237, 0.15) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(6, 182, 212, 0.15) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(244, 63, 94, 0.08) 0px, transparent 50%)',
      }
    },
  },
  plugins: [],
}
