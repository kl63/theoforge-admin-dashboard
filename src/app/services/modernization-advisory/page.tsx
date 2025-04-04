import React from 'react';
import { Container, Typography, Paper, Box, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Link from 'next/link';
import Image from 'next/image';

export default function ModernizationAdvisoryPage() {
  // Updated Key Offerings
  const keyOfferings = [
    'Legacy System Assessment & Modernization Strategy',
    'AI Code Analysis & Refactoring Guidance',
    'Automated Testing Framework Design & Implementation Advisory',
    'Microservices & Cloud-Native Architecture Planning',
    'Identifying AI Opportunities for Process Automation',
    'Technology & Tool Selection for Modernization',
    'Risk Assessment & Mitigation Planning',
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
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 4, 
          alignItems: 'flex-start' 
        }}>
          {/* Image Section */}
          <Box sx={{ 
            width: { xs: '100%', md: '41.66%' }, 
            position: 'relative',
            height: { xs: 250, md: 350 }, 
            borderRadius: 1, 
            overflow: 'hidden', 
            mb: { xs: 3, md: 0 }
          }}>
            <Image
              src="/understanding_latent_space_and_vector_search.png" 
              alt="Abstract AI and modernization concept"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            />
          </Box>

          {/* Content Section */}
          <Box sx={{ width: { xs: '100%', md: '58.33%' } }}>
            {/* Updated Title */}
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
              AI-Driven Modernization Advisory
            </Typography>
            {/* Updated Description */}
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Transform legacy systems with intelligent modernization strategies. Our advisory services combine AI-driven code analysis, architectural assessment, and modern development practices to help you navigate the path from outdated systems to scalable, maintainable technology platforms.
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
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
