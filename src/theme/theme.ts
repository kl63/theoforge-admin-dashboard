'use client';
import { createTheme, Theme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { ButtonProps } from '@mui/material/Button'; // Import ButtonProps

// Augment the palette options to include a custom accent color
declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
  }
}

// Augment Button color prop to accept accent
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
}

// Define the fonts
let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00695C', // Teal 700 - WCAG AA on White
      light: '#439889',
      dark: '#003D33',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#B8860B', // DarkGoldenrod - Use carefully, needs light contrast text
      light: '#E6A634',
      dark: '#8A5F00',
      contrastText: grey[900], // Use text.primary (#212121) for accessibility
    },
    warning: {
      main: '#F57C00', // Orange 700 - Use for CTAs, WCAG AA Large text/UI on White
      light: '#FFAD42',
      dark: '#BB4D00',
      contrastText: grey[900], // Use text.primary (#212121) for accessibility
    },
    accent: {
      main: '#F57C00', // Use this for primary CTAs
      light: '#FFAD42',
      dark: '#BB4D00',
      contrastText: grey[900], // Use text.primary (#212121) for accessibility
    },
    error: {
      main: '#D32F2F', // Red 700
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#0288D1', // Light Blue 700
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#2E7D32', // Green 700
      contrastText: '#FFFFFF',
    },
    text: {
      primary: grey[900], // #212121
      secondary: grey[700], // #616161
      disabled: grey[500], // #9E9E9E
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF', // Keep paper white, use grey backgrounds explicitly if needed
    },
    divider: grey[300], // #E0E0E0 - Lighter grey for subtle dividers
    grey: { ...grey }, // Expose the full grey scale if needed directly
  },
  typography: {
    // Use CSS variables defined in layout.tsx
    fontFamily: [
      'var(--font-public-sans)', // Primary font
      'Roboto', // Fallback
      '"Helvetica Neue"', // Fallback
      'Arial', // Fallback
      'sans-serif' // Generic fallback
    ].join(','),
    fontSize: 16, // Base font size for rem calculations
    h1: {
      fontFamily: 'var(--font-poppins)', // Heading font
      fontWeight: 700,
      fontSize: '2.75rem',
      lineHeight: 1.15,
      color: 'text.primary', // Use direct string reference
    },
    h2: {
      fontFamily: 'var(--font-poppins)', // Heading font
      fontWeight: 600,
      fontSize: '2.25rem', // ~36px
      lineHeight: 1.2,
      color: 'text.primary',
    },
    h3: {
      fontFamily: 'var(--font-poppins)', // Heading font
      fontWeight: 600,
      fontSize: '1.75rem', // ~28px
      lineHeight: 1.25,
      color: 'text.primary',
    },
    h4: {
      fontFamily: 'var(--font-poppins)', // Heading font
      fontWeight: 500, // Slightly lighter for h4
      fontSize: '1.375rem', // ~22px
      lineHeight: 1.3,
      color: 'text.primary',
    },
    h5: {
      fontFamily: 'var(--font-poppins)', // Heading font
      fontWeight: 500,
      fontSize: '1.125rem', // ~18px
      lineHeight: 1.4,
      color: 'text.primary',
    },
    h6: {
      fontFamily: 'var(--font-poppins)', // Heading font
      fontWeight: 500,
      fontSize: '1rem', // 16px
      lineHeight: 1.5,
      color: 'text.primary',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem', // 16px
      lineHeight: 1.6,
      color: 'text.primary',
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem', // 14px
      lineHeight: 1.5,
      color: 'text.secondary', // Use direct string reference
    },
    button: {
      fontWeight: 600, // Standardized button weight
      fontSize: '0.9375rem', // 15px
      lineHeight: 1.75,
      textTransform: 'none', // Keep button text case as written
      color: 'text.primary', // Default button color
    },
    caption: {
      fontWeight: 400,
      fontSize: '0.75rem', // 12px
      lineHeight: 1.66,
      color: 'text.secondary',
    },
    overline: {
      fontWeight: 400,
      fontSize: '0.75rem', // 12px
      lineHeight: 1.66, // Adjusted from 2.66 to standard value
      textTransform: 'uppercase',
    },
  },
});

// Define component overrides separately, using the initial theme
const componentOverrides = {
  components: {
    // Example component overrides - can customize spacing/styles further here
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', // Subtle shadow for elevation
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme, ownerState }: { theme: Theme; ownerState: ButtonProps }) => ({
          borderRadius: theme.spacing(4), // 32px (pill shape)
          textTransform: 'none', // Keep button text case as defined
          // Example: Different styles based on props like variant or color
          ...(ownerState.variant === 'contained' && ownerState.color === 'primary' && {
            // Styles for contained primary buttons
          }),
        }),
        // Define padding based on 8pt grid for consistency
        sizeSmall: {
          padding: theme.spacing(0.5, 1), // 4px 8px
        },
        sizeMedium: {
          padding: theme.spacing(1, 2), // 8px 16px
        },
        sizeLarge: {
          padding: theme.spacing(1, 3), // 8px 24px
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          borderRadius: theme.spacing(2), // Use 16px (standard)
          boxShadow: theme.shadows[3], // Add a subtle shadow
          transition: 'box-shadow 0.3s ease-in-out', // Smooth transition for hover effects
          '&:hover': {
            boxShadow: theme.shadows[6], // Enhance shadow on hover
          },
        }),
      },
    },
  }
};

// Merge the component overrides back into the theme
theme = createTheme(theme, componentOverrides);

export default theme;
