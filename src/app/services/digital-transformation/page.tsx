import React from 'react';
import { Container, Typography, Paper, Box, Button, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Link from 'next/link';
import Image from 'next/image';

export default function DigitalTransformationPage() {
  const keyOfferings = [
    'Digital Maturity Assessment & Roadmap Development',
    'Business Process Re-engineering & Automation',
    'Customer Experience (CX) Strategy & Optimization',
    'Change Management & Organizational Alignment',
    'Technology Modernization & Legacy System Migration',
    'Data Strategy & Analytics Implementation',
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Box sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          component={Link}
          href="/services"
        >
          Back to Services
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, overflow: 'hidden' }}>
        <Grid container spacing={4} alignItems="flex-start">
          {/* Content Section */}
          <Grid item xs={12} md={7}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              Digital Transformation & Strategy
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Navigate the complexities of the digital era with our strategic guidance. We partner with you to reimagine business models, optimize operations, and enhance customer engagement through technology. Our holistic approach ensures your digital transformation journey is aligned with your core business objectives, driving sustainable growth and competitive advantage.
            </Typography>

            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'medium', mb: 2 }}>
              Key Offerings:
            </Typography>
            <List dense>
              {keyOfferings.map((offering, index) => (
                <ListItem key={index} disableGutters>
                  <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5, color: 'primary.main' }}>
                    <CheckCircleOutlineIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={offering} />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Image Section */}
          <Grid item xs={12} md={5}>
             <Box sx={{ position: 'relative', width: '100%', height: { xs: 250, md: 350 }, borderRadius: 1, overflow: 'hidden', mt: { xs: 3, md: 0 } }}>
               {/* Reusing image for now, replace later */}
              <Image
                src="/images/services/advanced_ai.png"
                alt="Digital Transformation Strategy Visualization"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
