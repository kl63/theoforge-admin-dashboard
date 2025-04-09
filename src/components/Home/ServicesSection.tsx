'use client'; // Ensure calculations run client-side

import * as React from 'react';
import InfoCard from '../Common/InfoCard'; // Correct path
import SectionContainer from '../Layout/SectionContainer'; // Import new container
import SectionHeading from '../Common/SectionHeading'; // Import new heading
import { ServiceData } from '@/types/service'; // Import type from centralized location
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Define the props for the ServicesSection component
interface ServicesSectionProps {
  services: ServiceData[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  return (
    // Use SectionContainer, pass ID and background classes
    // Note: Original had py-12 md:py-16 on section AND py-16 on inner div.
    // We'll use the default py-16 from SectionContainer and add background.
    <SectionContainer id="services" className="bg-background dark:bg-background">
      {/* Use SectionHeading, pass responsive font size class */}
      <SectionHeading className="md:text-5xl">
        Core Services for Your AI Transformation
      </SectionHeading>

      {/* Replace Grid with Carousel */}
      <Carousel 
        opts={{
          align: "start",
          loop: true,
        }}
        // Remove max-width and mx-auto, let SectionContainer handle width
        className="w-full" 
      >
        <CarouselContent>
          {services.map((service, index) => (
            // Add padding, remove intermediate div, put h-full back on InfoCard
            <CarouselItem key={service.slug} className="basis-1/3 p-2">
              <InfoCard
                title={service.title}
                excerpt={service.excerpt}
                image={service.image}
                link={`/services/${service.slug}`}
                priorityImage={index < 3} // Prioritize first few images
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" /> {/* Hide controls on smallest screens */} 
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </SectionContainer>
  );
};

export default ServicesSection;
