import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link'; // For the button link

const CallToActionSection = () => (
  <Box sx={{ py: 8, backgroundColor: 'primary.main', color: 'primary.contrastText' }}> {/* Use primary color */}
    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
        Ready to Build Your Strategic AI Advantage?
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Schedule a strategic consultation to explore how our founder-led expertise can accelerate your AI initiatives, mitigate risks, and deliver measurable business value.
      </Typography>
      {/* Link to contact page */}
      <Link href="/contact" passHref> 
        <Button 
          variant="contained" 
          color="secondary" // Use secondary color for contrast
          size="large" 
          sx={{ 
            color: 'secondary.contrastText', // Ensure text contrasts with button
            // Add hover effect if needed
            '&:hover': {
              backgroundColor: 'secondary.dark', // Darken on hover
            },
          }}
        >
          Schedule Your Strategy Session
        </Button>
      </Link>
    </Container>
  </Box>
);

export default CallToActionSection;
