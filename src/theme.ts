import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Font imports are handled by next/font in layout.tsx
// No need for @fontsource imports here

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: '#008080', // Deep Teal (from brand guide)
    },
    secondary: {
      main: '#B8860B', // Muted Gold (from brand guide)
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#FFFFFF', // White (from brand guide)
      paper: '#F0F0F0',   // Light Gray (from brand guide)
    },
    text: {
        primary: '#333333', // Dark Gray for primary text (from brand guide)
        secondary: '#555555', // Slightly lighter gray for secondary text (derived)
    },
    // Consider adding the Accent color if needed elsewhere, e.g., for specific components
    // accent: {
    //   main: '#FFA500', // Bright Orange
    // },
  },
  typography: {
    // Base font for body and UI elements
    fontFamily: '"Public Sans", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
      fontSize: '3.052rem', // ~49px
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
      fontSize: '2.441rem', // ~39px
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
      fontSize: '1.953rem', // ~31px
      fontWeight: 700,
    },
    h4: {
      fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
      fontSize: '1.563rem', // ~25px
      fontWeight: 600, // Use Semi-Bold for H4 as per common practice
    },
    h5: {
      fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
      fontSize: '1.25rem',  // 20px
      fontWeight: 500, // Medium
    },
    h6: {
      fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
      fontSize: '1.125rem', // 18px
      fontWeight: 500, // Medium
    },
    body1: {
      // Inherits fontFamily from base typography setting ('Public Sans')
      fontSize: '1rem', // 16px
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      // Inherits fontFamily from base typography setting ('Public Sans')
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      // Inherits fontFamily from base typography setting ('Public Sans')
      fontSize: '0.9375rem', // 15px
      fontWeight: 500, // Medium weight for buttons
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
    caption: {
      // Inherits fontFamily from base typography setting ('Public Sans')
      fontSize: '0.75rem', // 12px
      fontWeight: 400,
    },
    overline: {
      // Inherits fontFamily from base typography setting ('Public Sans')
      fontSize: '0.75rem', // 12px
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  components: {
    // --- Default Component Styles --- //

    // Example: Define default Button styles
    MuiButton: {
      defaultProps: {
        // disableElevation: true, // Example: Remove shadow by default
      },
      styleOverrides: {
        root: {
          borderRadius: 8, // Example: Consistent rounded corners
          padding: '8px 22px', // Adjust padding if needed
        },
        // Add styles for specific variants if needed
        // containedPrimary: {
        //   backgroundColor: '#FFA500', // Use Bright Orange for primary CTAs?
        //   '&:hover': {
        //     backgroundColor: '#e69500', // Darken orange on hover
        //   },
        // },
      },
    },

    // Example: Define default Card styles
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: 12, // Slightly larger radius for cards
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)', // Softer shadow
            }
        }
    },

    // Example: Define default Chip styles
    MuiChip: {
        styleOverrides: {
            root: {
                borderRadius: 8, // Match button radius
            }
        }
    },

    // Example: Define default Link styles
    MuiLink: {
      defaultProps: {
        underline: 'hover', // Underline links only on hover
      },
      styleOverrides: {
        root: {
          color: '#008080', // Use primary color for links
          fontWeight: 500,
          '&:hover': {
            color: '#006666', // Darken slightly on hover
          },
        },
      },
    },

    // Add other component overrides as needed (AppBar, TextField, etc.)

  },
});

// Apply responsive font sizes
theme = responsiveFontSizes(theme);

export default theme;
