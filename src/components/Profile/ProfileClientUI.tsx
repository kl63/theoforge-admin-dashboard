// src/components/Profile/ProfileClientUI.tsx
"use client"; // Mark this as a Client Component

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { styled } from '@mui/material/styles';

import { ProfileData } from '@/lib/profile'; // Assuming ProfileData is exported from here

// Enhanced styled component for Markdown content
const MarkdownContent = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  '& h1': {
    fontSize: '2.2rem',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  '& h2': {
    fontSize: '1.8rem',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.text.primary,
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing(1),
  },
  '& h3, & h4, & h5, & h6': {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    fontWeight: theme.typography.fontWeightMedium,
  },
  '& p': {
    lineHeight: 1.7,
    marginBottom: theme.spacing(2),
    fontSize: '1.05rem',
  },
  '& ul, & ol': {
    paddingLeft: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  '& li': {
    marginBottom: theme.spacing(1.5),
    lineHeight: 1.6,
    fontSize: '1.05rem',
  },
  '& a': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  '& strong': {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  '& blockquote': {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    paddingLeft: theme.spacing(2),
    fontStyle: 'italic',
    margin: theme.spacing(2, 0),
    color: theme.palette.text.secondary,
  },
}));

interface ProfileClientUIProps {
  profile: ProfileData | null;
}

export default function ProfileClientUI({ profile }: ProfileClientUIProps) {
  if (!profile) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error">Profile data could not be loaded. Please check the file 'src/content/profile/keith.md'.</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
      <Container maxWidth="lg">
        {/* Navigation back button */}
        <Box sx={{ mb: 4 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            component={Link}
            href="/#about"
          >
            Back to About
          </Button>
        </Box>
        
        <Paper elevation={3} sx={{ p: { xs: 3, md: 5 } }}>
          {/* Profile header with image and title */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            alignItems: { xs: 'center', sm: 'flex-start' }, 
            mb: 6,
            pb: 4,
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}>
            <Avatar
              src={profile.image}
              alt={profile.name}
              sx={{ 
                width: { xs: 150, md: 200 }, 
                height: { xs: 150, md: 200 }, 
                mr: { xs: 0, sm: 4 }, 
                mb: { xs: 3, sm: 0 },
                boxShadow: 3
              }}
            />
            <Box>
              <Typography variant="h2" component="h1" gutterBottom sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}>
                {profile.name}
              </Typography>
              <Typography 
                variant="h5" 
                color="text.secondary" 
                component="p"
                gutterBottom
              >
                {profile.title}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, fontSize: '1.1rem' }}>
                {profile.bio_summary}
              </Typography>
            </Box>
          </Box>

          {/* Main content */}
          <MarkdownContent>
            <ReactMarkdown>{profile.content}</ReactMarkdown>
          </MarkdownContent>
          
          {/* Contact CTA */}
          <Box sx={{ 
            mt: 6, 
            pt: 4, 
            borderTop: '1px solid', 
            borderColor: 'divider',
            textAlign: 'center'
          }}>
            <Typography variant="h5" component="p" gutterBottom>
              Ready to explore how AI can transform your organization?
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              component={Link}
              href="/contact"
              sx={{ mt: 2 }}
            >
              Contact Keith
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
