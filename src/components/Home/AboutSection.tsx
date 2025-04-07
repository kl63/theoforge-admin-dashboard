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
    <Box 
      id="about" 
      sx={{
        bgcolor: 'background.paper', 
        py: 8,
        // Add scroll margin to account for the sticky header height
        scrollMarginTop: '80px', // Adjust value as needed based on actual header height
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          textAlign="center" 
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
            <Typography variant="body1" sx={{ mb: 2 }}>
              TheoForge is dedicated to **transforming AI complexity into strategic confidence** for businesses and educational institutions. Based in Newark, NJ, we provide expert guidance, pragmatic implementation, and tailored education to ensure you successfully navigate the AI landscape.
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 2 }}>
              We focus on delivering practical, high-impact AI solutions and strategies precisely aligned with your core objectives. We believe mastering AI requires more than just technology; it demands integrated expertise spanning strategy, engineering, organizational dynamics, and effective knowledge transfer.
            </Typography>
            
            <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2, fontWeight: 'medium' }}>
              Our Approach: Clarity, Capability, Confidence
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 2 }}>
              We bridge the gap between the potential of advanced AI and its practical, valuable application within your context. Whether charting your initial AI course or scaling sophisticated systems, TheoForge provides the strategic insight, technical skill, and educational support to build lasting AI capability and confidence.
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
              width: 176,
              height: 176,
              mb: 2,
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: 3
            }}>
              <Image
                src="/theo_keith.png"
                alt="Keith Williams"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
                sizes="176px"
              />
            </Box>
            
            <Typography variant="h5" component="h3" sx={{ fontWeight: 'medium', mb: 1 }}>
              Keith {lastName}
            </Typography>
            
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
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
              title: 'Integrated Expertise for Holistic Solutions',
              content: 'We combine deep AI technical skill (RAG, LLMs, Graphs) with strategic vision and user-centric design. This holistic approach moves beyond isolated features to deliver cohesive, high-impact AI systems you can trust.',
            },
            {
              title: 'From Complexity to Confident Adoption',
              content: 'Leveraging decades of CTO leadership and instructional design mastery, we translate complex AI concepts into practical strategies and build internal capabilities, ensuring your team adopts and leverages AI effectively and confidently.',
            },
          ].map((point, index) => (
            <Box key={index} sx={{ p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
              <Typography variant="h6" component="h4" sx={{ fontWeight: 'medium', mb: 1 }}>
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
