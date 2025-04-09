import React from 'react';
import { getAllTestimonials, TestimonialData } from '@/lib/testimonialUtils'; 
import SectionContainer from '../Layout/SectionContainer';
import SectionHeading from '../Common/SectionHeading';
import TestimonialCard from '../Testimonials/TestimonialCard';
import Button from '../Common/Button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TestimonialsSectionProps {
  maxItems?: number;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ maxItems }) => {
  const allTestimonials = getAllTestimonials(); 

  const testimonialsToDisplay = maxItems 
    ? allTestimonials.slice(0, maxItems) 
    : allTestimonials;

  if (testimonialsToDisplay.length === 0) {
    return null;
  }

  return (
    <SectionContainer className="bg-muted dark:bg-muted-dark">
      <SectionHeading align="center" className="md:text-5xl mb-12">
        What Our Clients Say
      </SectionHeading>

      <Carousel 
        opts={{
          align: "start",
          loop: testimonialsToDisplay.length > 3, // Only loop if more items than visible
        }}
        className="w-full" 
      >
        <CarouselContent className="-ml-4"> {/* Adjust margin for item padding */} 
          {testimonialsToDisplay.map((testimonial) => (
            // Set basis to 1/3 for 3 cards, add padding
            <CarouselItem key={testimonial.id} className="basis-1/3 pl-4"> 
              <div className="h-full"> {/* Ensure card stretches */} 
                <TestimonialCard testimonial={testimonial} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Conditionally show controls if looping is possible */} 
        {testimonialsToDisplay.length > 3 && (
          <>
            <CarouselPrevious className="hidden sm:flex" /> 
            <CarouselNext className="hidden sm:flex" />
          </>
        )}
      </Carousel>
      
      {maxItems && allTestimonials.length > maxItems && (
          <div className="mt-12 text-center">
              <Button href="/testimonials" variant="outline" size="md">
                  View All Testimonials
              </Button>
          </div>
      )}
    </SectionContainer>
  );
};

export default TestimonialsSection;
