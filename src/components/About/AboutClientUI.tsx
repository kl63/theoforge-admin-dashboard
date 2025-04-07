// src/components/About/AboutClientUI.tsx
"use client"; // Mark this as a Client Component

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';

// Import the data fetching function and types
import { AboutData } from '@/lib/about';

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

// Updated props interface name and prop name
interface AboutClientUIProps {
  aboutData: AboutData | null; // Use the fetched data passed as a prop
}

// Updated component name and prop destructuring
export const AboutClientUI: React.FC<AboutClientUIProps> = ({ aboutData }) => {
  // The data is now directly available via the aboutData prop
  // Handle the case where data might not be available (simplify check)
  if (!aboutData) {
    // Display a loading state or an error message
    return <Typography>Loading about information...</Typography>;
  }

  return (
    <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
      <Container maxWidth="lg">
        
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
              src={aboutData.image ?? undefined} // Use updated prop name
              alt={aboutData.name} // Use updated prop name
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
                {aboutData.name} {/* Use updated prop name */}
              </Typography>
              <Typography 
                variant="h5" 
                color="text.secondary" 
                component="p"
                gutterBottom
              >
                {aboutData.title} {/* Use updated prop name */}
              </Typography>
              <Typography variant="body1" paragraph>
                My approach centers on understanding the client&apos;s unique context and goals, allowing me to craft bespoke strategies that drive tangible results. Whether it&apos;s optimizing operations, navigating digital transformation, or enhancing customer engagement, I bring a blend of analytical rigor and creative problem-solving to every project.
              </Typography>
            </Box>
          </Box>

          {/* Main content */}
          <MarkdownContent>
            {aboutData.contentHtml ? (
              <div dangerouslySetInnerHTML={{ __html: aboutData.contentHtml }} />
            ) : (
              <Typography color="error">Content is missing.</Typography> // Fallback message
            )}
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
              Ready to Transform Complexity into Confidence?
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              component={Link}
              href="/contact"
              sx={{ mt: 2 }}
            >
              Discuss Your AI Strategy
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AboutClientUI;
