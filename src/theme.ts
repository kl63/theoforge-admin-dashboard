import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Import Inter font weights
import '@fontsource/inter/300.css'; // Light
import '@fontsource/inter/400.css'; // Regular
import '@fontsource/inter/500.css'; // Medium
import '@fontsource/inter/700.css'; // Bold

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Example primary color (adjust as needed)
    },
    secondary: {
      main: '#dc004e', // Example secondary color (adjust as needed)
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
      paper: '#f5f5f5', // Slightly off-white for paper backgrounds
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.052rem', // ~49px (Adjusted slightly from scale for practicality)
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.441rem', // ~39px
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.953rem', // ~31px
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.563rem', // ~25px
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.25rem',  // 20px
      fontWeight: 500, // Medium weight for slightly less emphasis
    },
    h6: {
      fontSize: '1.125rem', // 18px (Slightly adjusted)
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem', // 16px
      fontWeight: 400,
      lineHeight: 1.6, // Increased line height for readability
    },
    body2: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      fontSize: '0.9375rem', // 15px
      fontWeight: 500,
      textTransform: 'none', // Keep button text case as defined
      letterSpacing: '0.02em', // Add subtle letter spacing
    },
    caption: {
      fontSize: '0.75rem', // 12px
      fontWeight: 400,
    },
    overline: {
      fontSize: '0.75rem', // 12px
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  // You can add component overrides here later if needed
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         borderRadius: 8, // Example override
  //       },
  //     },
  //   },
  // },
});

// Apply responsive font sizes
theme = responsiveFontSizes(theme);

export default theme;
