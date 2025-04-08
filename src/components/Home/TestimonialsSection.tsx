'use client';

import React from 'react';
import { testimonials, Testimonial } from '@/data/testimonials';
import JdenticonIcon from '../Common/JdenticonIcon';
import SectionContainer from '../Layout/SectionContainer';
import SectionHeading from '../Common/SectionHeading';
import BaseCard from '../Common/BaseCard';

interface TestimonialsSectionProps {
  // Potential future props
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = () => {
  return (
    <SectionContainer className="bg-gray-50 dark:bg-gray-800/50">
      <SectionHeading align="center" className="md:text-5xl mb-12">
        What Our Clients Say
      </SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial: Testimonial) => (
          <BaseCard key={testimonial.id} className="p-6 text-center">
            <div className="mb-4">
              <div className="inline-block p-1 bg-white dark:bg-gray-700 rounded-full shadow mb-3">
                <JdenticonIcon value={testimonial.name} size={60} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {testimonial.title}
              </p>
            </div>
            <blockquote className="text-gray-600 dark:text-gray-300 italic">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
          </BaseCard>
        ))}
      </div>
    </SectionContainer>
  );
};

export default TestimonialsSection;
