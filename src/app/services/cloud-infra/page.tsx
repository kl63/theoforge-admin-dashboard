import React from 'react';
import { Container, Typography, Paper, Box, Button, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Link from 'next/link';
import Image from 'next/image';

export default function CloudInfraPage() {
  const keyOfferings = [
    'Cloud Readiness Assessment & Migration Strategy',
    'Multi-Cloud & Hybrid Cloud Architecture Design',
    'Infrastructure as Code (IaC) Implementation (Terraform, Pulumi)',
    'DevOps & CI/CD Pipeline Automation',
    'Containerization & Orchestration (Docker, Kubernetes)',
    'Cloud Security Posture Management & Compliance',
    'Cost Optimization & FinOps Strategy',
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
          {/* Image Section */}
          <Grid item xs={12} md={5}>
             <Box sx={{ position: 'relative', width: '100%', height: { xs: 250, md: 350 }, borderRadius: 1, overflow: 'hidden', mb: { xs: 3, md: 0 } }}>
               {/* Reusing image for now, replace later */}
              <Image
                src="/images/services/advanced_ai.png" // Placeholder
                alt="Cloud Infrastructure Modernization Diagram"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </Box>
          </Grid>

          {/* Content Section */}
          <Grid item xs={12} md={7}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              Cloud & Infrastructure Modernization
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Build a resilient, scalable, and cost-effective foundation for your digital future. We help you leverage the power of cloud computing, modernize your IT infrastructure, and adopt DevOps practices to accelerate innovation. From migration planning to ongoing management and optimization, we provide end-to-end cloud solutions tailored to your needs.
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
        </Grid>
      </Paper>
    </Container>
  );
}
