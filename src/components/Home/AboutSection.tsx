'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';

const AboutSection: React.FC = () => {
  const lastName = "Williams"; 

  return (
    // Add id="about" for header link navigation
    <Box id="about" sx={{ bgcolor: 'background.paper', py: 8 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          textAlign="center" 
          gutterBottom 
          sx={{ mb: 6, fontWeight: 'medium' }}
        >
          About TheoForge
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 4, 
          alignItems: 'flex-start',
          mb: 6
        }}>
          {/* Company info section */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" paragraph>
              TheoForge is an AI consulting company founded in Newark, NJ with a singular mission: helping businesses and educational institutions successfully navigate the AI transformation through expert guidance, strategic implementation, and tailored education.
            </Typography>
            
            <Typography variant="body1" paragraph>
              Our focus is delivering practical, impactful AI solutions and strategies that align with your core business goals. We believe successful AI adoption requires both deep technical expertise and a nuanced understanding of organizational change, instructional design, and strategic alignment.
            </Typography>
            
            <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 'medium' }}>
              Our Approach
            </Typography>
            
            <Typography variant="body1" paragraph>
              We bridge the gap between cutting-edge AI technology and practical business application. Whether you're exploring your first AI initiative or scaling existing efforts, TheoForge provides the guidance, education, and implementation support to ensure your success.
            </Typography>
          </Box>
          
          {/* Founder section with image */}
          <Box sx={{ 
            flex: 1, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            bgcolor: 'background.default',
            p: 3,
            borderRadius: 2,
          }}>
            <Box sx={{ 
              position: 'relative',
              width: 180,
              height: 180,
              mb: 2,
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: 3
            }}>
              <Image
                src="/theo_keith.png"
                alt="Keith Williams"
                fill
                style={{ objectFit: 'cover' }}
                sizes="180px"
              />
            </Box>
            
            <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'medium' }}>
              Keith {lastName}
            </Typography>
            
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Founder & Principal AI Strategist
            </Typography>
            
            <Typography variant="body1" sx={{ mt: 2, textAlign: 'left' }}>
              Keith brings a unique blend of 30 years of engineering experience, 20 years of university-level teaching, and deep expertise in AI technologies to your most complex challenges.
            </Typography>
            
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              endIcon={<ArrowForwardIcon />} 
              component={Link}
              href="/profile"
              sx={{ mt: 3 }}
            >
              Meet Keith {lastName}
            </Button>
          </Box>
        </Box>

        <Typography variant="h5" component="h3" sx={{ mt: 6, mb: 3, fontWeight: 'medium', textAlign: 'center' }}>
          Why Partner with TheoForge?
        </Typography>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 4
        }}>
          {[
            {
              title: 'Technical Depth & Breadth',
              content: 'From practical implementation (RAG, Vector Embeddings, Knowledge Graphs) to cutting-edge research (LLM Alignment, LoRA adapters), we bring comprehensive AI expertise.'
            },
            {
              title: 'Enterprise & Startup Experience',
              content: 'With experience as a CTO for a seed-stage fund and leading a funded startup, we understand technology\'s role in driving business growth.'
            },
            {
              title: 'Education & Adoption Focus',
              content: 'Our background in instructional design and psychology enhances talent development and speeds effective AI adoption across your organization.'
            },
            {
              title: 'Holistic 360° Approach',
              content: 'We consider the entire ecosystem - from user experience and product design to implementation and strategic alignment.'
            }
          ].map((point, index) => (
            <Box key={index} sx={{ p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
              <Typography variant="h6" component="h4" gutterBottom sx={{ fontWeight: 'medium' }}>
                {point.title}
              </Typography>
              <Typography variant="body1">
                {point.content}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default AboutSection;
