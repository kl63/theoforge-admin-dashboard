const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary: Deep Teal
        primary: {
          DEFAULT: '#00695C', // Teal 700 (main)
          light: '#439889',
          dark: '#003D33',
        },
        // Secondary: Muted Gold
        secondary: {
          DEFAULT: '#B8860B', // DarkGoldenrod (main)
          light: '#E6A634',
          dark: '#8A5F00',
        },
        // Accent: Bright Orange (For critical CTAs)
        accent: {
          DEFAULT: '#F57C00', // Orange 700 (main)
          light: '#FFAD42',
          dark: '#BB4D00',
        },
        // Neutrals (Using Tailwind's gray as a base)
        neutral: {
          900: '#212121', // Text Primary
          800: '#424242',
          700: '#616161', // Text Secondary
          600: '#757575',
          500: '#9E9E9E', // Text Disabled
          400: '#BDBDBD',
          300: '#E0E0E0', // Divider
          200: '#EEEEEE',
          100: '#F5F5F5',
          50: '#FAFAFA'
        },
        // Backgrounds
        background: {
          DEFAULT: '#FFFFFF', // default bg
          paper: '#FFFFFF',   // paper/card bg
        },
        // System Feedback Colors
        error: '#D32F2F', // Red 700
        info: '#0288D1', // Light Blue 700
        success: '#2E7D32', // Green 700
      },
      fontFamily: {
        sans: ['Public Sans', 'var(--font-public-sans)', ...fontFamily.sans],
        poppins: ['Poppins', 'var(--font-poppins)', 'sans-serif'],
      },
      fontSize: {
        // Define custom sizes based on Typography Guide (rem values)
        '4xl': ['2.75rem', { lineHeight: '1.15' }],    // 44px
        '3xl': ['2.25rem', { lineHeight: '1.2' }],     // 36px
        '2xl': ['1.75rem', { lineHeight: '1.25' }],    // 28px
        'xl': ['1.375rem', { lineHeight: '1.3' }],     // 22px
        'lg': ['1.125rem', { lineHeight: '1.4' }],     // 18px
        // Base (1rem), sm (0.875rem), xs (0.75rem) use Tailwind defaults unless overridden
      },
      // Consider customizing spacing if strict 8-point grid enforcement is needed
      // spacing: { ... } // See spacing_guide.md for example
    },
  },
  plugins: [],
}

// Removed the corePlugins section to re-enable Tailwind's Preflight base styles.
