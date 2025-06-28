/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#3D8BFF', // blue-500
        'primary-50': '#EBF4FF', // blue-50
        'primary-100': '#DBEAFE', // blue-100
        'primary-200': '#BFDBFE', // blue-200
        'primary-300': '#93C5FD', // blue-300
        'primary-400': '#60A5FA', // blue-400
        'primary-500': '#3D8BFF', // blue-500
        'primary-600': '#2563EB', // blue-600
        'primary-700': '#1D4ED8', // blue-700
        'primary-800': '#1E40AF', // blue-800
        'primary-900': '#1E3A8A', // blue-900
        'primary-foreground': '#FFFFFF', // white

        // Secondary Colors
        'secondary': '#6366F1', // indigo-500
        'secondary-50': '#EEF2FF', // indigo-50
        'secondary-100': '#E0E7FF', // indigo-100
        'secondary-200': '#C7D2FE', // indigo-200
        'secondary-300': '#A5B4FC', // indigo-300
        'secondary-400': '#818CF8', // indigo-400
        'secondary-500': '#6366F1', // indigo-500
        'secondary-600': '#4F46E5', // indigo-600
        'secondary-700': '#4338CA', // indigo-700
        'secondary-800': '#3730A3', // indigo-800
        'secondary-900': '#312E81', // indigo-900
        'secondary-foreground': '#FFFFFF', // white

        // Accent Colors
        'accent': '#10B981', // emerald-500
        'accent-50': '#ECFDF5', // emerald-50
        'accent-100': '#D1FAE5', // emerald-100
        'accent-200': '#A7F3D0', // emerald-200
        'accent-300': '#6EE7B7', // emerald-300
        'accent-400': '#34D399', // emerald-400
        'accent-500': '#10B981', // emerald-500
        'accent-600': '#059669', // emerald-600
        'accent-700': '#047857', // emerald-700
        'accent-800': '#065F46', // emerald-800
        'accent-900': '#064E3B', // emerald-900
        'accent-foreground': '#FFFFFF', // white

        // Background Colors
        'background': '#0F0F0F', // gray-950
        'background-secondary': '#1A1A1A', // gray-900
        'surface': '#1A1A1A', // gray-900
        'surface-secondary': '#262626', // gray-800

        // Text Colors
        'text-primary': '#FFFFFF', // white
        'text-secondary': '#A1A1AA', // gray-400
        'text-muted': '#71717A', // gray-500
        'text-disabled': '#52525B', // gray-600

        // Status Colors
        'success': '#22C55E', // green-500
        'success-50': '#F0FDF4', // green-50
        'success-100': '#DCFCE7', // green-100
        'success-200': '#BBF7D0', // green-200
        'success-300': '#86EFAC', // green-300
        'success-400': '#4ADE80', // green-400
        'success-500': '#22C55E', // green-500
        'success-600': '#16A34A', // green-600
        'success-700': '#15803D', // green-700
        'success-800': '#166534', // green-800
        'success-900': '#14532D', // green-900
        'success-foreground': '#FFFFFF', // white

        'warning': '#F59E0B', // amber-500
        'warning-50': '#FFFBEB', // amber-50
        'warning-100': '#FEF3C7', // amber-100
        'warning-200': '#FDE68A', // amber-200
        'warning-300': '#FCD34D', // amber-300
        'warning-400': '#FBBF24', // amber-400
        'warning-500': '#F59E0B', // amber-500
        'warning-600': '#D97706', // amber-600
        'warning-700': '#B45309', // amber-700
        'warning-800': '#92400E', // amber-800
        'warning-900': '#78350F', // amber-900
        'warning-foreground': '#FFFFFF', // white

        'error': '#EF4444', // red-500
        'error-50': '#FEF2F2', // red-50
        'error-100': '#FEE2E2', // red-100
        'error-200': '#FECACA', // red-200
        'error-300': '#FCA5A5', // red-300
        'error-400': '#F87171', // red-400
        'error-500': '#EF4444', // red-500
        'error-600': '#DC2626', // red-600
        'error-700': '#B91C1C', // red-700
        'error-800': '#991B1B', // red-800
        'error-900': '#7F1D1D', // red-900
        'error-foreground': '#FFFFFF', // white

        // Border Colors
        'border': 'rgba(255, 255, 255, 0.1)', // white with opacity
        'border-secondary': 'rgba(255, 255, 255, 0.05)', // white with opacity
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'elevation-1': '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
        'elevation-2': '0 4px 6px -1px rgba(0, 0, 0, 0.25), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'elevation-3': '0 10px 15px -3px rgba(0, 0, 0, 0.25), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'elevation-4': '0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'pulse-gentle': 'pulse-gentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'scale-hover': 'scale-hover 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'pulse-gentle': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.7',
          },
        },
        'shimmer': {
          '0%': {
            'background-position': '-200% 0',
          },
          '100%': {
            'background-position': '200% 0',
          },
        },
        'scale-hover': {
          '0%': {
            transform: 'scale(1)',
          },
          '100%': {
            transform: 'scale(1.02)',
          },
        },
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '110': '110',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}