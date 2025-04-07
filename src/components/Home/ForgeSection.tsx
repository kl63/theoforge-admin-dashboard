'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import NextLink from 'next/link';
import { forgeProjects, ForgeProject } from '@/data/forgeProjects';
import JdenticonIcon from '../Common/JdenticonIcon';

const ForgeSection: React.FC = () => {
  // Display the 3 most recent non-featured projects, or just the first 3 if none are featured/less than 3 exist
  const nonFeatured = forgeProjects.filter(p => !p.featured);
  const displayProjects = nonFeatured.length >= 3 ? nonFeatured.slice(0, 3) : forgeProjects.slice(0, 3);

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h2" sx={{ textAlign: 'center', mb: 1 }}>
          From the Forge
        </Typography>
        <Typography variant="h6" component="p" color="text.secondary" sx={{ textAlign: 'center', mb: 6, maxWidth: '750px', mx: 'auto' }}>
          Explore recent experiments, tools, and creations forged by the network.
        </Typography>

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)', 
            md: 'repeat(3, 1fr)', 
          },
          gap: 4,
        }}>
          {displayProjects.map((project: ForgeProject) => (
            <Card key={project.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                  <Box sx={{ mb: 1, lineHeight: 0 }}> 
                    <JdenticonIcon value={project.title} size={40} />
                  </Box>
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {project.description}
                </Typography>
                {project.tags && project.tags.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                    {project.tags.map((tag) => (
                      <Chip label={tag} key={tag} size="small" variant="outlined" />
                    ))}
                  </Box>
                )}
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2, mt: 'auto' }}>
                <Button
                  component={Link}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<GitHubIcon />}
                  variant="outlined"
                  size="small"
                >
                  View on GitHub
                </Button>
                {project.liveUrl && (
                  <Button
                    component={Link}
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="text" 
                    size="small"
                    sx={{ ml: 1 }} 
                  >
                    Live Demo
                  </Button>
                )}
                {project.tryUrl && (
                  <Button
                    component={NextLink} 
                    href={project.tryUrl}
                    variant="contained" 
                    size="small"
                    sx={{ ml: 1 }} 
                  >
                    Try It Out
                  </Button>
                )}
              </CardActions>
            </Card>
          ))}
        </Box>

        {forgeProjects.length > 3 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button 
              component={NextLink} 
              href="/forge" 
              variant="contained" 
              size="large"
            >
              Explore the Full Forge
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ForgeSection;
