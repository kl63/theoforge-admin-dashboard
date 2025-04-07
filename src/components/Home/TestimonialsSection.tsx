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
    <Container maxWidth="lg">
      <Typography variant="h3" component="h2" sx={{ textAlign: 'center', mb: 6 }}>
        Client Success Stories & Partnerships
      </Typography>
      {/* Flexbox layout for testimonials */}
      <Box 
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4, // Use theme spacing for gap
          justifyContent: 'center' // Center items
        }}
      >
        {testimonials.map((testimonial, index) => (
          <Box 
            key={index}
            sx={{
              // Responsive sizing: 1 on xs, 2 on sm, 3 on md
              flexBasis: { 
                xs: '100%', 
                sm: 'calc(50% - 16px)', // Approx 1/2 minus gap/2
                md: 'calc(33.333% - 22px)' // Approx 1/3 minus gap
              },
              maxWidth: { 
                xs: '100%', 
                sm: 'calc(50% - 16px)', 
                md: 'calc(33.333% - 22px)'
              },
              flexGrow: 1,
              flexShrink: 0,
              // Ensure Card inside stretches
              display: 'flex', 
              alignItems: 'stretch',
            }}
          >
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', width: '100%' }}>
              <CardContent sx={{ p: 3, textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                <Box sx={{ mt: 'auto' }}>
                  <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'medium' }}>
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {testimonial.title}, {testimonial.company}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);

export default TestimonialsSection;
