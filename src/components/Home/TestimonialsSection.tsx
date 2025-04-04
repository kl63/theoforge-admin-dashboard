'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Image from 'next/image';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Testimonial } from '@/data/testimonials';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }: TestimonialsSectionProps) => (
  <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
    <Container maxWidth="md">
      <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center' }}>
        What Our Clients Say
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 4, 
        justifyContent: 'center' 
      }}>
        {testimonials.map((testimonial, index) => (
          <Box 
            key={index} 
            sx={{ 
              width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.33% - 16px)' } 
            }}
          >
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ p: 2, textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {testimonial.image && (
                  <Box sx={{ 
                    width: 80, 
                    height: 80, 
                    mb: 2, 
                    position: 'relative', 
                    borderRadius: '50%', 
                    overflow: 'hidden' 
                  }}>
                    <Image 
                      src={testimonial.image} 
                      alt={`Photo of ${testimonial.name}`} 
                      fill 
                      style={{ objectFit: 'cover' }} 
                      sizes="80px" 
                    />
                  </Box>
                )}
                <FormatQuoteIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                  {testimonial.quote}
                </Typography>
                <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'medium' }}>
                  {testimonial.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.title}, {testimonial.company}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);

export default TestimonialsSection;
