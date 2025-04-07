import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { getSortedServicesData } from '@/lib/services'; // Assuming this path is correct
import { ServiceData } from '@/types/service'; // Assuming this path is correct
import InfoCard from '@/components/Common/InfoCard'; // Use InfoCard from Common components
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TheoForge Services | AI Strategy, Implementation & Enablement',
  description: "Discover how Theoforge's integrated AI services transform complexity into confident action through expert strategy, pragmatic implementation, and workforce enablement.",
};

export default async function ServicesPage() {
  const allServicesData: ServiceData[] = await getSortedServicesData();

  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Page Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Our Services
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Integrated services designed to transform AI complexity into confident action and strategic advantage.
          </Typography>
        </Box>

        {/* Services CSS Grid */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)', // 1 column on extra-small screens
            sm: 'repeat(2, 1fr)', // 2 columns on small screens
            md: 'repeat(3, 1fr)', // 3 columns on medium screens and up
          },
          gap: 4, // Gap between grid items (adjust as needed)
        }}>
          {allServicesData.map((service) => (
            <InfoCard 
              key={service.slug} // Key moves to the mapped element
              title={service.title}
              excerpt={service.excerpt}
              image={service.image} // Pass image if available
              link={service.link} // InfoCard expects a link prop
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};
