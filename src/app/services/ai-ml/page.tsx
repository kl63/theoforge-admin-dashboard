// src/app/services/ai-ml/page.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function AiMlServicePage() {
  return (
    <Box sx={{ bgcolor: 'background.default', py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Back Button */}
        <Button
            startIcon={<ArrowBackIcon />}
            component={Link}
            href="/services"
            sx={{ mb: 4 }}
        >
            Back to Services
        </Button>

        <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, overflow: 'hidden' }}>
           <Grid container spacing={4} alignItems="flex-start">
              {/* Image Section */}
              <Grid item xs={12} md={5}>
                <Box sx={{ position: 'relative', width: '100%', height: { xs: 250, md: 350 }, borderRadius: 1, overflow: 'hidden', mb: { xs: 3, md: 0 } }}>
                  <Image
                    src="/images/services/advanced_ai.png" // Using the available image
                    alt="Advanced AI and Machine Learning implementation"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />
                </Box>
              </Grid>

              {/* Content Section */}
              <Grid item xs={12} md={7}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                  AI & Machine Learning Solutions
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                  Leverage the power of artificial intelligence to transform your business processes, gain deeper insights, and create unparalleled customer experiences.
                </Typography>

                <Typography variant="body1" sx={{ mb: 3 }}>
                  Our AI & Machine Learning services are designed to integrate seamlessly into your existing infrastructure, providing scalable and robust solutions. We work closely with your team to understand your unique challenges and opportunities, developing custom models and applications that deliver measurable results.
                </Typography>

                 <Typography variant="h5" component="h2" sx={{ fontWeight: 'medium', mb: 2, mt: 4 }}>
                  Key Offerings:
                </Typography>
                <List dense>
                  {[
                    "Predictive Analytics & Forecasting",
                    "Natural Language Processing (NLP) & Text Analytics",
                    "Computer Vision & Image Recognition",
                    "Process Automation & Optimization",
                    "Custom AI Model Development & Deployment",
                    "AI Strategy & Consulting",
                  ].map((text) => (
                    <ListItem key={text} disablePadding>
                       <ListItemIcon sx={{minWidth: '40px'}}>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>

                <Typography variant="body1" sx={{ mt: 4, mb: 3 }}>
                  Whether you're looking to automate repetitive tasks, predict market trends, or personalize customer interactions, our expert team can help you navigate the complexities of AI implementation and unlock significant business value.
                </Typography>

                {/* Call to Action */}
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  component={Link}
                  href="/contact?subject=AI%20ML%20Solutions%20Inquiry"
                  sx={{ mt: 2 }}
                >
                  Discuss Your AI Project
                </Button>
              </Grid>
           </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
