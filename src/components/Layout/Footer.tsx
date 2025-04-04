'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'; // Reverted back to standard import
import Typography from '@mui/material/Typography';
import NextLink from 'next/link'; // Renamed to avoid conflict
import MuiLink from '@mui/material/Link'; // For external links if needed, styled
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material';

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        backgroundColor: theme.palette.grey[900], // Use very dark grey for background
        color: theme.palette.common.white, // Set default text color to white
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Column 1: Brand Info */}
          <Grid item xs={12} sm={6} md={4}> {/* Reverted: Added item prop back */}
            <Typography variant="h6" component="div" gutterBottom sx={{ color: theme.palette.primary.main /* Deep Teal for name */ }}>
              TheoForge
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: theme.palette.grey[300] /* Lighter grey for description */ }}>
              Guiding organizations through the complexities of AI adoption with strategic insight and technical expertise. {/* Increased contrast */}
            </Typography>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid item xs={6} sm={3} md={2}> {/* Reverted: Added item prop back */}
            <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'medium' }}> {/* Increased prominence */}
              Quick Links
            </Typography>
            <Box component="nav" sx={{ display: 'flex', flexDirection: 'column' }}>
              {/* Updated links to point to homepage sections */}
              <MuiLink component={NextLink} href="/#about" color="inherit" underline="hover" sx={{ mb: 1 }}> 
                About Us
              </MuiLink>
              <MuiLink component={NextLink} href="/#services" color="inherit" underline="hover" sx={{ mb: 1 }}> 
                Services
              </MuiLink>
              <MuiLink component={NextLink} href="/blog" color="inherit" underline="hover" sx={{ mb: 1 }}>
                Blog
              </MuiLink>
              <MuiLink component={NextLink} href="/contact" color="inherit" underline="hover">
                Contact
              </MuiLink>
            </Box>
          </Grid>

          {/* Column 3: Social Media */}
          <Grid item xs={6} sm={3} md={2}> {/* Reverted: Added item prop back */}
            <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'medium' }}> {/* Increased prominence */}
              Connect
            </Typography>
            <Box>
              {/* Icons already inherit color, which should be white/light contrast */}
              <IconButton 
                aria-label="LinkedIn" 
                color="inherit" 
                href="#" // TODO: Replace with actual LinkedIn URL
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton 
                aria-label="YouTube" 
                color="inherit" 
                href="#" // TODO: Replace with actual YouTube URL
                target="_blank"
                rel="noopener noreferrer"
              >
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Column 4: Contact Info (Optional - Example) */}
          {/* Add if needed, adjust grid sizes above */}
          {/* <Grid item xs={12} md={4}>
            <Typography variant="h6" component="div" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Newark, NJ
            </Typography>
            <Typography variant="body2">
              info@theoforge.com
            </Typography>
          </Grid> */}
        </Grid>

        {/* Bottom Row: Copyright */}
        <Box sx={{ mt: 4, pt: 4, borderTop: `1px solid ${alpha(theme.palette.common.white, 0.12)}` }}> {/* Subtle divider */}
          <Typography variant="caption" display="block" textAlign="center" sx={{ color: theme.palette.grey[400] }}> {/* Increased contrast */}
            {currentYear} TheoForge. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
