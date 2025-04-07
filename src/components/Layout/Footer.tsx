'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import MuiLink from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub'; 
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material';

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  // Common hover style for links and icons
  const hoverSx = {
    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      color: theme.palette.primary.light, // Lighter teal on hover
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 4, sm: 6 }, // Responsive padding
        backgroundColor: theme.palette.grey[900],
        color: theme.palette.common.white,
      }}
    >
      <Container maxWidth="lg">
        {/* Adjust spacing and alignment */}
        <Grid container spacing={{ xs: 4, md: 5 }} justifyContent="space-between">
          {/* Column 1: Brand Info */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" component="div" sx={{ color: theme.palette.primary.main, mb: 1 }}>
              TheoForge
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: theme.palette.grey[300] }}>
              Guiding organizations through the complexities of AI adoption with strategic insight and technical expertise.
            </Typography>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'medium', color: theme.palette.primary.main, mb: 1 }}>
              Quick Links
            </Typography>
            <Box component="nav" sx={{ display: 'flex', flexDirection: 'column' }}>
              {[ // Array for easier mapping/styling
                { href: '/#about', label: 'About Us' },
                { href: '/#services', label: 'Services' },
                { href: '/blog', label: 'Blog' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <MuiLink 
                  key={link.label}
                  component={NextLink} 
                  href={link.href} 
                  color="inherit" 
                  underline="hover" 
                  sx={{ mb: 1, ...hoverSx }} // Apply hover effect (8px margin)
                >
                  {link.label}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* Column 3: Social Media */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'medium', color: theme.palette.primary.main, mb: 1 }}>
              Connect
            </Typography>
            {/* Add spacing between icons */}
            <Box sx={{ display: 'flex', gap: 2 }}> {/* 16px gap */}
              {[ // Array for icons
                { href: '#', label: 'LinkedIn', Icon: LinkedInIcon }, // Replace # with actual URL
                { href: '#', label: 'YouTube', Icon: YouTubeIcon }, // Replace # with actual URL
                { href: 'https://github.com/kaw393939', label: 'GitHub', Icon: GitHubIcon },
              ].map(({ href, label, Icon }) => (
                <IconButton
                  key={label}
                  aria-label={label}
                  color="inherit"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ ...hoverSx, p: 0.5 }} // Add hover effect and slight padding adjustment
                >
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

        </Grid>

        {/* Bottom Bar - Refined Styling */}
        <Box
          sx={{
            mt: { xs: 4, sm: 6 },
            pt: { xs: 3, sm: 4 },
            borderTop: `1px solid ${alpha(theme.palette.common.white, 0.15)}`, // Slightly more visible border
            textAlign: 'center',
            color: theme.palette.grey[400],
          }}
        >
          <Typography variant="body2">
            &copy; {currentYear} TheoForge. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
