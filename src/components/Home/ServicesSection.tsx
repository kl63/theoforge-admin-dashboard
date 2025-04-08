'use client'; // Ensure calculations run client-side

import * as React from 'react';
import InfoCard from '../Common/InfoCard'; // Correct path
import SectionContainer from '../Layout/SectionContainer'; // Import new container
import SectionHeading from '../Common/SectionHeading'; // Import new heading
import { ServiceData } from '@/types/service'; // Import type from centralized location

// Define the props for the ServicesSection component
interface ServicesSectionProps {
  services: ServiceData[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  return (
    // Use SectionContainer, pass ID and background classes
    // Note: Original had py-12 md:py-16 on section AND py-16 on inner div.
    // We'll use the default py-16 from SectionContainer and add background.
    <SectionContainer id="services" className="bg-white dark:bg-gray-900">
      {/* Use SectionHeading, pass responsive font size class */}
      <SectionHeading className="md:text-5xl">
        Core Services for Your AI Transformation
      </SectionHeading>

      {/* Services CSS Grid - Use existing grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <InfoCard 
            key={service.slug}
            title={service.title} 
            excerpt={service.excerpt} 
            image={service.image} 
            link={`/services/${service.slug}`} 
            priorityImage={index === 0} 
          />
        ))}
      </div>
    </SectionContainer>
  );
};

export default ServicesSection;
