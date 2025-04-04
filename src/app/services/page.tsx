// src/app/services/page.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function ServicesPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold', mb: { xs: 4, md: 6 } }}
        >
          Our Advisory Services
        </Typography>

        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: { xs: 6, md: 8 }, maxWidth: '700px', mx: 'auto' }}
        >
          We empower organizations through strategic guidance, workforce enablement, and intelligent modernization, acting as your trusted partner in navigating technological evolution.
        </Typography>

        {/* Service Section 1: Technology Strategy & Leadership */}
        <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, mb: 6, overflow: 'hidden' }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            gap: 4, 
            alignItems: 'center' 
          }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'medium' }}>
                Technology Strategy & Leadership
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Partner with us to define your digital vision. We offer CTO-level advisory, roadmap development, and strategic planning to align technology with your core business goals.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                href="/services/tech-strategy"
                endIcon={<ArrowForwardIcon />}
              >
                Define Your Strategy
              </Button>
            </Box>
            <Box sx={{ 
              flex: 1, 
              position: 'relative', 
              width: '100%', 
              height: { xs: 250, md: 300 }, 
              borderRadius: 1, 
              overflow: 'hidden', 
              bgcolor: 'grey.200' 
            }}>
              <Image
                src="/strategic.png"
                alt="Collaborative strategic planning"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </Box>
          </Box>
        </Paper>

        {/* Service Section 2: Future-Ready Workforce Training */}
        <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, mb: 6, overflow: 'hidden' }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column-reverse', md: 'row' }, 
            gap: 4, 
            alignItems: 'center'
          }}>
            <Box sx={{ 
              flex: 1, 
              position: 'relative', 
              width: '100%', 
              height: { xs: 250, md: 300 }, 
              borderRadius: 1, 
              overflow: 'hidden', 
              bgcolor: 'grey.200' 
            }}>
              <Image
                src="/ai_training.png"
                alt="Team learning new technology skills"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'medium' }}>
                Future-Ready Workforce Training
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Equip your teams with essential modern skills. We provide targeted training on AI-assisted development, automated testing, DevOps practices, and secure coding.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                href="/services/workforce-training"
                endIcon={<ArrowForwardIcon />}
              >
                Empower Your Team
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Service Section 3: AI-Driven Modernization Advisory */}
        <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, mb: 6, overflow: 'hidden' }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            gap: 4, 
            alignItems: 'center' 
          }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'medium' }}>
                AI-Driven Modernization Advisory
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Modernize legacy systems intelligently. We guide you through architectural assessments, AI-driven code analysis, automated testing strategies, and technology selection.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                href="/services/modernization-advisory"
                endIcon={<ArrowForwardIcon />}
              >
                Modernize Intelligently
              </Button>
            </Box>
            <Box sx={{ 
              flex: 1, 
              position: 'relative', 
              width: '100%', 
              height: { xs: 250, md: 300 }, 
              borderRadius: 1, 
              overflow: 'hidden' 
            }}>
              <Image
                src="/images/services/advanced_ai.png"
                alt="AI enhancing system modernization process"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </Box>
          </Box>
        </Paper>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h5" component="p" sx={{ mb: 3 }}>
            Ready to transform your business?
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="primary"
            component={Link}
            href="/contact"
          >
            Get in Touch
          </Button>
        </Box>

      </Container>
    </Box>
  );
}
