const { fontFamily } = require('tailwindcss/defaultTheme');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], 
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{ts,tsx}', 
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      fontSize: { 
        'xs': ['0.75rem', '1.5'],    
        'sm': ['0.875rem', '1.5'],   
        'base': ['1rem', '1.6'],     
        'lg': ['1.125rem', '1.4'],   
        'xl': ['1.375rem', '1.3'],   
        '2xl': ['1.75rem', '1.25'],  
        '3xl': ['2.25rem', '1.2'],   
        '4xl': ['2.75rem', '1.15'],  
        '5xl': ['3.5rem', '1.1'],   
        '6xl': ['4.5rem', '1.05'],  
      },
      spacing: { 
        // Keep standard Tailwind spacing
      },
      colors: { 
        neutral: {
          900: '#212121',
          800: '#424242', 
          700: '#616161',
          600: '#757575',
          500: '#9E9E9E',
          400: '#BDBDBD',
          300: '#E0E0E0',
          200: '#EEEEEE',
          100: '#F5F5F5',
        },
        error: '#D32F2F',
        info: '#0288D1',
        success: '#2E7D32',
        // Explicitly link shadcn/ui CSS variables to Tailwind color names
        background: 'hsl(var(--background))', 
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        primary: { 
          DEFAULT: 'hsl(var(--primary))',          
          foreground: 'hsl(var(--primary-foreground))', 
        },
        secondary: { 
          DEFAULT: 'hsl(var(--secondary))',         
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',      
          foreground: 'hsl(var(--destructive-foreground))', 
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',             
          foreground: 'hsl(var(--muted-foreground))', 
        },
        accent: { 
          DEFAULT: 'hsl(var(--accent))',            
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',           
          foreground: 'hsl(var(--popover-foreground))', 
        },
        card: {
          DEFAULT: 'hsl(var(--card))',              
          foreground: 'hsl(var(--card-foreground))',  
        },
      },
      fontFamily: {
        heading: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        sans: ['var(--font-public-sans)', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: { 
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: { 
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: { 
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")], 
}

// Removed the corePlugins section to re-enable Tailwind's Preflight base styles.
