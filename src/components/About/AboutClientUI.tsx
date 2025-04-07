// src/components/About/AboutClientUI.tsx
"use client"; // Mark this as a Client Component

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Card from '@mui/material/Card'; // Added Card import
import CardContent from '@mui/material/CardContent'; // Added CardContent import
import CardMedia from '@mui/material/CardMedia'; // Added CardMedia import
import List from '@mui/material/List'; // Added List import
import ListItem from '@mui/material/ListItem'; // Added ListItem import
import ListItemIcon from '@mui/material/ListItemIcon'; // Added ListItemIcon import
import ListItemText from '@mui/material/ListItemText'; // Added ListItemText import
import Grid from '@mui/material/Grid'; // Added Grid import
import { styled } from '@mui/material/styles';

import { getAboutData, AboutData, AboutItem } from '@/lib/about'; // Import AboutItem
import { Launch as LaunchIcon, Code as CodeIcon, Build as BuildIcon } from '@mui/icons-material'; // Example icons

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

// Function to render individual about items based on their component type
const renderAboutItem = (item: AboutItem, index: number): JSX.Element => {
  return (
    (() => {
      switch (item.component) {
        case 'ProfileCard':
          return (
            <StyledCard key={index} elevation={3}>
              {item.image && (
                <CardMedia
                  component="img"
                  height="200" // Adjust height as needed
                  image={item.image} // Use item.image
                  alt={item.name} // Use item.name
                  sx={{ objectFit: 'cover' }}
                />
              )}
              <CardContent>
                <Typography variant="h6" component="div">
                  {item.name} {/* Use item.name */}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {item.title} {/* Use item.title */}
                </Typography>
                <Typography variant="body2">
                  {typeof item.content === 'string' ? item.content : item.content.main}
                </Typography>
              </CardContent>
            </StyledCard>
          );

        case 'TextSection':
          return (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                {item.title} {/* Use item.title */}
              </Typography>
              <Typography variant="body1">
                {typeof item.content === 'string' ? item.content : item.content.main} {/* Use item.content */}
              </Typography>
            </Box>
          );

        case 'FeatureList':
          return (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                {item.title} {/* Use item.title */}
              </Typography>
              {typeof item.content === 'object' && (
                <>
                  <Typography variant="body1" gutterBottom>
                    {item.content.main}
                  </Typography>
                  <List dense>
                    {item.content.points.map((point, pIndex) => (
                      <ListItem key={pIndex}>
                        <ListItemIcon sx={{ minWidth: '30px' }}>
                          <BuildIcon fontSize="small" /> {/* Example icon */}
                        </ListItemIcon>
                        <ListItemText primary={point} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </Box>
          );

        case 'LinkList':
          return (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                {item.title} {/* Use item.title */}
              </Typography>
              <List dense>
                {item.links && item.links.map((link, lIndex) => (
                  <ListItem key={lIndex} component={Link} href={link.url} target="_blank" rel="noopener noreferrer">
                    <ListItemIcon sx={{ minWidth: '30px' }}>
                      {link.icon === 'Launch' ? <LaunchIcon fontSize="small" /> : <CodeIcon fontSize="small" />} {/* Conditional icon */}
                    </ListItemIcon>
                    <ListItemText primary={link.text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          );
        
        case 'BasicCard': // Handle BasicCard
          return (
            <StyledCard key={index} elevation={1} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2">
                  {typeof item.content === 'string' ? item.content : 'Invalid content type'}
                </Typography>
              </CardContent>
            </StyledCard>
          );
        default:
          // Provide a fallback for unknown component types
          console.warn(`Unknown component type encountered: ${item.component}`);
          return <Alert severity="warning" key={index}>Unknown component type: &apos;{item.component}&apos;</Alert>; // Use &apos;
      }
    })() // IIFE to execute the switch and return the element
  );
};

// Styled Card component (example)
const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  // Add other styles as needed
}));

// Updated props interface name and prop name
interface AboutClientUIProps {
  about: AboutData | null;
}

// Updated component name and prop destructuring
export default function AboutClientUI({ about }: AboutClientUIProps) {
  if (!about) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        {/* Updated error message to refer to 'about' content */}
        <Alert severity="error">About content could not be loaded. Please check the file &apos;src/content/about/keith.md&apos;.</Alert>
      </Container>
    );
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
              src={about.image ?? undefined} // Use updated prop name
              alt={about.name} // Use updated prop name
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
                {about.name} {/* Use updated prop name */}
              </Typography>
              <Typography 
                variant="h5" 
                color="text.secondary" 
                component="p"
                gutterBottom
              >
                {about.title} {/* Use updated prop name */}
              </Typography>
              <Typography variant="body1" paragraph>
                My approach centers on understanding the client&apos;s unique context and goals, allowing me to craft bespoke strategies that drive tangible results. Whether it&apos;s optimizing operations, navigating digital transformation, or enhancing customer engagement, I bring a blend of analytical rigor and creative problem-solving to every project.
              </Typography>
            </Box>
          </Box>

          {/* Main content */}
          <MarkdownContent>
            {about.contentHtml ? (
              <div dangerouslySetInnerHTML={{ __html: about.contentHtml }} />
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
}

// Fetch the about data using the imported function
const aboutData = getAboutData();

// Handle the case where data might not be available (though unlikely with static data)
if (!aboutData || !aboutData.sections) {
  return <Alert severity="error">About content could not be loaded.</Alert>;
}

return (
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        About The Obsidian Forge
      </Typography>

      {/* Map through sections and render items */}
      {aboutData.sections.map((section, sectionIndex) => (
        <Box key={sectionIndex} sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1, mb: 3 }}>
            {section.title}
          </Typography>
          <Grid container spacing={3}>
            {/* Render items within the section */}
            {section.items.map((item, itemIndex) => (
              <Grid item xs={12} md={item.gridWidth || 12} key={itemIndex}> {/* Use gridWidth or default */}
                {renderAboutItem(item, itemIndex)} 
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
      <Alert severity="info" icon={<BuildIcon fontSize="inherit" />} sx={{ mt: 4 }}>
        <strong>Under Development:</strong> This application is actively being developed.
        Features and visuals may change. Check the{' '}
        <Link href="https://github.com/your-repo/your-project-name/tree/develop" target="_blank" rel="noopener noreferrer">
          GitHub repository&apos;s
        </Link>{' '}
        development branch for the latest updates.
      </Alert>
    </Paper>
  </Container>
);
