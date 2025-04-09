// src/components/Testimonials/TestimonialCard.tsx
import React from 'react';
import Image from 'next/image';
import BaseCard from '../Common/BaseCard';
import JdenticonIcon from '../Common/JdenticonIcon';
import { TestimonialData } from '@/lib/testimonialUtils'; 
import { FaQuoteLeft } from 'react-icons/fa6'; // Quotation mark icon
import Heading from '../Common/Heading'; // Import Heading
import Paragraph from '../Common/Paragraph'; // Import Paragraph

interface TestimonialCardProps {
  testimonial: TestimonialData;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { id, quote, name, title, company, image } = testimonial;

  return (
    <BaseCard key={id} className="h-full"> 
      {/* Image/Avatar Container (Top, full width, aspect-video) */}
      <div className="w-full relative aspect-video overflow-hidden rounded-t-lg bg-neutral-100 dark:bg-neutral-700">
        {image ? (
          <Image
            src={image}
            alt={`${name} - ${title}`}
            fill // Use fill
            className="object-cover" // Basic object cover
          />
        ) : (
          // Centered Jdenticon as fallback
          <div className="absolute inset-0 flex items-center justify-center">
            <JdenticonIcon value={name} size={64} /> {/* Adjust size as needed */} 
          </div>
        )}
      </div>

      {/* Content Container (Below image, standard padding) */} 
      <div className="p-6 flex flex-col flex-grow"> 
        {/* Quote (First, with icon) */} 
        <Paragraph 
          className="italic relative mb-4 flex-grow text-base text-neutral-700 dark:text-neutral-300"
        >
          <FaQuoteLeft className="absolute left-0 top-0 -translate-x-full text-neutral-300 dark:text-neutral-600 mr-2" />
          {quote}
        </Paragraph>

        {/* Author Info (Aligned left now) */} 
        <div className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700"> 
          <Heading level={5} className="mb-0">
            {name}
          </Heading>
          <Paragraph variant="body2" className="text-neutral-500 dark:text-neutral-400">
            {title}, {company}
          </Paragraph>
        </div>
      </div>
    </BaseCard>
  );
};

export default TestimonialCard;
