// 'use client'; // Masonry likely requires client context

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Masonry from '@mui/lab/Masonry';
import InfoCard from '../Common/InfoCard'; 

// Define the expected prop type (matching the data structure in page.tsx)
interface ServiceTeaser {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  link: string;
}

// Define props for the ServicesSection component
interface ServicesSectionProps {
  services: ServiceTeaser[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  return (
    <Box id="services" sx={{ py: { xs: 6, md: 8 }, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Section Title */}
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          textAlign="center"
          sx={{ fontWeight: 'medium', mb: { xs: 4, md: 6 } }}
        >
          AI Strategy & Implementation Expertise
        </Typography>

        {/* Services Masonry Layout */}
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={4}>
          {services.map((service) => (
            <InfoCard 
              key={service.slug} 
              title={service.title} 
              excerpt={service.excerpt} 
              image={service.image} 
              link={service.link} 
            />
          ))}
        </Masonry>
      </Container>
    </Box>
  );
};

export default ServicesSection;
