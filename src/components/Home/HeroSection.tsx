'use client';

import React from 'react';
import Link from 'next/link';
import Button from '../Common/Button'; // Import the Button component
import Heading from '../Common/Heading'; // Import the Heading component
import Paragraph from '../Common/Paragraph'; // Import the Paragraph component

const HeroSection = () => (
  // Replaced outer Box with section, added Tailwind classes
  <section
    className="h-[70vh] flex flex-col items-center justify-center text-white text-center bg-[url('/hero_bg.png')] bg-cover bg-center bg-no-repeat relative overflow-hidden"
  >
    {/* Replaced Overlay Box with div, added Tailwind classes */}
    <div
      className="absolute inset-0 bg-black/65 z-10" // Using Tailwind color/opacity format
    />
    {/* Replaced Content Container with div, added Tailwind classes */}
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
      {/* Replaced inner content Box with div, added Tailwind classes */}
      <div 
        className="flex flex-col items-start text-left p-4 sm:p-6"
      >
        {/* Use Heading component, map text-5xl to level 1 based on scale */}
        <Heading
          level={1} // H1 equivalent
          className="font-semibold text-white text-3xl sm:text-4xl md:text-5xl mb-6" // Added font-semibold, keep responsive sizes for hero, override default color
        >
          Transform AI Complexity into Strategic Confidence
        </Heading>
        {/* Use Paragraph component, variant defaults to body1 */}
        <Paragraph
          className="text-white text-lg mb-8" // Added gold accents
        >
          Partner with Theoforge to navigate the AI landscape. Leverage integrated expertise in strategy, engineering, and education to build reliable, <span className="text-[#B8860B] font-medium">high-impact AI solutions</span> that drive <span className="text-[#B8860B] font-medium">measurable business value</span>. Listen to our weekly podcast and join our Discord community to learn more.
        </Paragraph>
        {/* Use Button component with Secondary OUTLINE variant */}
        <Button 
          variant="outline"
          href="/contact" 
          size="lg" 
          className="mt-4 border-[#B8860B] text-white hover:bg-[#B8860B]/10" // Gold border, white text
        >
          Begin Your AI Transformation
        </Button>
      </div>
    </div> 
  </section>
);

export default HeroSection;
