'use client'; // Ensure calculations run client-side

import * as React from 'react';
import { Box, Container, Typography } from '@mui/material';
import InfoCard from '../Common/InfoCard'; // Correct path
import { ServiceData } from '@/types/service'; // Import type from centralized location

// Define the props for the ServicesSection component
interface ServicesSectionProps {
  services: ServiceData[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  return (
    <Box id="services" sx={{ py: { xs: 6, md: 8 }, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Section Title */}
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          sx={{ fontWeight: 'medium', mb: { xs: 4, md: 6 } }}
        >
          Core Services for Your AI Transformation
        </Typography>

        {/* Services CSS Grid */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)', 
            md: 'repeat(3, 1fr)',
          },
          gap: 4, 
        }}>
          {services.map((service) => (
            <InfoCard 
              key={service.slug}
              title={service.title} 
              excerpt={service.excerpt} 
              image={service.image} 
              link={`/services/${service.slug}`} 
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ServicesSection;
