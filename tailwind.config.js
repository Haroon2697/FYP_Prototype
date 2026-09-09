/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },
        indigo: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        purple: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
        },
        cyan: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          950: '#082F49',
        },
        primary: {
          DEFAULT: '#2563EB', // blue-600
          hover: '#1D4ED8',   // blue-700
          light: '#EFF6FF',   // blue-50
          border: '#BFDBFE',  // blue-200
        },
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F8FAFC', // slate-50
          muted: '#F1F5F9',     // slate-100
        },
        border: {
          DEFAULT: '#E2E8F0', // slate-200
          subtle: '#F1F5F9',  // slate-100
          hover: '#CBD5E1',   // slate-300
        },
        content: {
          primary: '#0F172A',   // slate-900
          secondary: '#64748B', // slate-500
          muted: '#94A3B8',     // slate-400
        },
        status: {
          success: '#10B981', // emerald-500
          warning: '#F59E0B', // amber-500
          error: '#EF4444',   // red-500
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        '2xs': '0 1px 2px 0 rgba(15, 23, 42, 0.035)',
        'xs': '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
        'sm': '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        'md': '0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        'lg': '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)',
        premium: '0 12px 28px -12px rgba(15, 23, 42, 0.22), 0 4px 10px -4px rgba(37, 99, 235, 0.12)',
        'blue': '0 4px 14px 0 rgba(37, 99, 235, 0.25)',
        'glow-blue': '0 0 24px rgba(37, 99, 235, 0.22)',
        'glow-cyan': '0 0 24px rgba(14, 165, 233, 0.22)',
      },
    },
  },
  plugins: [],
}
