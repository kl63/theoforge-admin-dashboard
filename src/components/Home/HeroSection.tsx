'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link'; // Import Link component from next/link

const HeroSection = () => (
  <Box
    sx={{
      height: '70vh', // Adjust height as needed
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'common.white', // Default text color for contrast
      textAlign: 'center',
      backgroundImage: 'url(/hero_bg.png)', // Use the new background image
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      position: 'relative', // Needed for z-index layering
      overflow: 'hidden', // Prevent content spillover
    }}
  >
    {/* Explicit Overlay Box */}
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)', // Overlay opacity
        zIndex: 1, // Overlay sits below content
      }}
    />
    {/* Content Container - Must have relative position and higher z-index */}
    <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
      <Box 
        sx={{
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start', 
          textAlign: 'left',
          p: { xs: 2, sm: 3 } 
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{ 
            fontWeight: 'bold', 
            color: 'inherit', // Explicitly inherit color from parent Box 
            fontSize: { xs: '1.8rem', sm: '2.25rem', md: '2.75rem' }, // Responsive font size 
            mb: 3, // Increased margin bottom (was 2) 
          }} 
        >
          Transform AI Complexity into Strategic Confidence
        </Typography>
        {/* Revised Sub-headline: Focus on expertise, not name */}
        <Typography
          variant="h5"
          component="p"
          sx={{
            color: 'inherit', // Explicitly inherit color from parent Box
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.125rem' }, // Responsive font size
            mb: 4, // Adjusted margin bottom
          }}
        >
          Partner with Theoforge to navigate the AI landscape. Leverage integrated expertise in strategy, engineering, and education to build reliable, high-impact AI solutions that drive measurable business value.
        </Typography>
        {/* Link the Button to the Contact page */}
        <Button 
          variant="contained" 
          color="accent" 
          size="large"
          component={Link} // Use Link component for navigation
          href="/contact" // Set the target path
          sx={{ mt: 2 }} // Added margin top
        >
          Begin Your AI Transformation
        </Button>
      </Box>
    </Container> 
  </Box>
);

export default HeroSection;
