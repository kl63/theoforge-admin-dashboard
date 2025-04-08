'use client';

import React from 'react';
import Link from 'next/link';
import Button from '../Common/Button'; // Import the Button component

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
        {/* Replaced Typography H1 with h1, added Tailwind classes */}
        <h1
          className="font-bold text-white text-3xl sm:text-4xl md:text-5xl mb-6" // Adjusted font sizes and margin
        >
          Transform AI Complexity into Strategic Confidence
        </h1>
        {/* Replaced Typography H5 with p, added Tailwind classes */}
        <p
          className="text-white text-base sm:text-lg md:text-xl mb-8" // Adjusted font sizes and margin
        >
          Partner with Theoforge to navigate the AI landscape. Leverage integrated expertise in strategy, engineering, and education to build reliable, high-impact AI solutions that drive measurable business value.
        </p>
        {/* Use Button component */}
        <Button 
          href="/contact" 
          variant="primary" // Or a custom variant if needed, but primary seems suitable
          size="lg" 
          // Keeping the orange accent style
          className="mt-4 bg-orange-500 hover:bg-orange-600 focus:ring-orange-400 focus:ring-offset-black/50 border-transparent"
        >
          Begin Your AI Transformation
        </Button>
      </div>
    </div> 
  </section>
);

export default HeroSection;
