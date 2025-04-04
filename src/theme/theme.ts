'use client';
import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

// Define the fonts
const publicSans = ['"Public Sans"', 'sans-serif'].join(',');
const poppins = ['"Poppins"', 'sans-serif'].join(',');

const theme = createTheme({
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
      contrastText: '#FFFFFF', // Changed to white for better contrast
    },
    warning: {
      main: '#F57C00', // Orange 700 - Use for CTAs, WCAG AA Large text/UI on White
      light: '#FFAD42',
      dark: '#BB4D00',
      contrastText: '#FFFFFF', // White text for large elements, consider black for smaller
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
    fontFamily: publicSans,
    fontSize: 16, // Base font size for rem calculations
    h1: {
      fontFamily: poppins,
      fontWeight: 700,
      fontSize: '2.75rem',
      lineHeight: 1.15,
      color: 'text.primary', // Use direct string reference
    },
    h2: {
      fontFamily: poppins,
      fontWeight: 700,
      fontSize: '2.25rem', // ~36px
      lineHeight: 1.2,
      color: 'text.primary',
    },
    h3: {
      fontFamily: poppins,
      fontWeight: 600,
      fontSize: '1.75rem', // ~28px
      lineHeight: 1.25,
      color: 'text.primary',
    },
    h4: {
      fontFamily: poppins,
      fontWeight: 600,
      fontSize: '1.375rem', // ~22px
      lineHeight: 1.3,
      color: 'text.primary',
    },
    h5: {
      fontFamily: poppins,
      fontWeight: 500,
      fontSize: '1.125rem', // ~18px
      lineHeight: 1.4,
      color: 'text.primary',
    },
    h6: {
      fontFamily: poppins,
      fontWeight: 500,
      fontSize: '1rem', // 16px
      lineHeight: 1.5,
      color: 'text.primary',
    },
    body1: {
      fontFamily: publicSans,
      fontWeight: 400,
      fontSize: '1rem', // 16px
      lineHeight: 1.6,
      color: 'text.primary',
    },
    body2: {
      fontFamily: publicSans,
      fontWeight: 400,
      fontSize: '0.875rem', // 14px
      lineHeight: 1.5,
      color: 'text.secondary', // Use direct string reference
    },
    button: {
      fontFamily: publicSans,
      fontWeight: 500,
      fontSize: '0.9375rem', // 15px
      lineHeight: 1.75,
      textTransform: 'none', // Keep button text case as written
      color: 'text.primary', // Default button color
    },
    caption: {
      fontFamily: publicSans,
      fontWeight: 400,
      fontSize: '0.75rem', // 12px
      lineHeight: 1.66,
      color: 'text.secondary',
    },
    overline: {
      fontFamily: publicSans,
      fontWeight: 400,
      fontSize: '0.75rem', // 12px
      lineHeight: 2.66,
      textTransform: 'uppercase',
      color: 'text.secondary',
    },
  },
  components: {
    // Example component overrides - can customize spacing/styles further here
    MuiAppBar: {
      styleOverrides: {
        root: (ownerState) => ({
          backgroundColor: ownerState.theme.palette.background.default,
          color: ownerState.theme.palette.text.primary,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', // Subtle shadow for elevation
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        // Example: Style CTA button (using warning color)
        // containedWarning: {
        //   // backgroundColor already set by palette
        //   // color: palette.warning.contrastText already set by palette
        //   '&:hover': {
        //     backgroundColor: 'darkorange', // Slightly darker orange on hover
        //   },
        // },
      },
      // Default props example
      // defaultProps: {
      //   // disableElevation: true,
      // },
    },
    MuiCard: {
      styleOverrides: {
        root: (ownerState) => ({
          // Cards use paper background by default, defined in palette
          boxShadow: '0 2px 5px rgba(0,0,0,0.08)', // Softer shadow than default
          borderRadius: '8px', // Slightly softer corners
        }),
      },
    },
    // MuiTypography: {
    //   styleOverrides: {
    //     paragraph: {
    //       marginBottom: '1.2em', // Example paragraph spacing
    //     },
    //   },
    // },
  }
});

export default theme;
