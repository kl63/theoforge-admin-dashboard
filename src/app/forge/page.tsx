'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import JdenticonIcon from '@/components/Common/JdenticonIcon';
import { forgeProjects, ForgeProject } from '@/data/forgeProjects';
import NextLink from 'next/link';

// Helper component for a single project card
const ProjectCard: React.FC<{ project: ForgeProject }> = ({ project }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
      <Typography variant="h5" component="div" sx={{ mb: 1 }}>
        {/* Add Jdenticon above title */}
        <Box sx={{ mb: 1, lineHeight: 0 }}>
          <JdenticonIcon value={project.title} size={40} />
        </Box>
        {project.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        By: {project.author}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
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
      {/* Add live link button if available */}
      {project.liveUrl && (
        <Button
          component={Link}
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="text" // Less prominent than GitHub link
          size="small"
          sx={{ ml: 1 }} 
        >
          Live Demo
        </Button>
      )}
      {/* Conditionally add Try It Out Link (internal) */}
      {project.tryUrl && (
        <Button
          component={NextLink} // Use NextLink for internal routing
          href={project.tryUrl}
          variant="contained" // Make it stand out
          size="small"
          sx={{ ml: 1 }}
        >
          Try It Out
        </Button>
      )}
    </CardActions>
  </Card>
);

// Main Forge Page Component
const ForgePage: React.FC = () => {
  const featuredProject = forgeProjects.find(p => p.featured);
  const otherProjects = forgeProjects.filter(p => !p.featured);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Typography variant="h2" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        The TheoForge
      </Typography>
      <Typography variant="h6" component="p" color="text.secondary" sx={{ textAlign: 'center', mb: { xs: 6, md: 8 }, maxWidth: '750px', mx: 'auto' }}>
        A showcase of experiments, tools, and creations forged by the TheoForge network.
      </Typography>

      {/* Featured Project Section */}
      {featuredProject && (
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            Featured Project
          </Typography>
          {/* Render the featured project using a similar card structure, maybe slightly larger or with more emphasis */}
          <ProjectCard project={featuredProject} />
        </Box>
      )}

      {/* Other Projects Grid Section */}
      {otherProjects.length > 0 && (
        <Box>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            More Creations
          </Typography>
          {/* Replace MUI Grid with CSS Grid */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)', 
              md: 'repeat(3, 1fr)', 
            },
            gap: 4,
          }}>
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Box>
        </Box>
      )}

      {/* Case where no projects are available */}
      {!featuredProject && otherProjects.length === 0 && (
        <Typography sx={{ textAlign: 'center', mt: 4 }} color="text.secondary">
          The Forge is currently empty. Check back soon for new creations!
        </Typography>
      )}
    </Container>
  );
};

export default ForgePage;
