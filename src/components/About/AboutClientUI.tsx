// src/components/About/AboutClientUI.tsx
"use client"; // Mark this as a Client Component

import React from 'react';
import Image from 'next/image';
import PageContainer from '@/components/Layout/PageContainer'; // Import PageContainer

// Import the data fetching function and types
import { AboutData } from '@/lib/about';

// Updated props interface name and prop name
interface AboutClientUIProps {
  aboutData: AboutData | null; // Use the fetched data passed as a prop
}

// Updated component name and prop destructuring
export const AboutClientUI: React.FC<AboutClientUIProps> = ({ aboutData }) => {
  // The data is now directly available via the aboutData prop
  // Handle the case where data might not be available (simplify check)
  if (!aboutData) {
    // Display a loading state or an error message
    // Wrapped loading state in PageContainer for consistency
    return (
      <PageContainer maxWidth="max-w-4xl" className="bg-white py-16">
        <p className="text-center p-8">Loading about information...</p>
      </PageContainer>
    );
  }

  // Handle potential undefined image and name safely
  const imageSrc = aboutData.image || '/placeholder-avatar.png';
  const altText = aboutData.name || 'Author Avatar'; // Fallback for alt text

  return (
    // Use PageContainer for outer layout
    <PageContainer maxWidth="max-w-4xl" className="bg-white py-16">
      {/* Removed the redundant container div */}
      {/* Replace Paper with div and Tailwind classes */}
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-10">
        {/* Profile header */}
        {/* Replace Box with div and Tailwind classes */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8 pb-6 border-b border-gray-200">
          {/* Replace Avatar with img and Tailwind classes */}
          <div className="relative w-full h-36 md:w-48 md:h-48 overflow-hidden rounded-full shadow-md">
            <Image
              src={imageSrc} // Use the defined variable
              alt={altText} // Use the defined variable
              fill
              style={{ objectFit: 'cover' }} // Use style prop for objectFit with fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {/* Replace Box with div */}
          <div>
            {/* Replace Typography with h1 and Tailwind classes */}
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {aboutData.name}
            </h1>
            {/* Replace Typography with p and Tailwind classes */}
            <p className="text-xl text-gray-600 mb-4">
              {aboutData.title}
            </p>
            {/* Replace Typography with p and Tailwind classes */}
            <p className="text-base text-gray-700 leading-relaxed">
              My approach centers on understanding the client&apos;s unique context and goals, allowing me to craft bespoke strategies that drive tangible results. Whether it&apos;s optimizing operations, navigating digital transformation, or enhancing customer engagement, I bring a blend of analytical rigor and creative problem-solving to every project.
            </p>
          </div>
        </div>

        {/* Main content - Apply Tailwind prose classes */}
        {/* Removed MarkdownContent styled component wrapper */}
        <div className="prose prose-lg max-w-none">
          {aboutData.contentHtml ? (
            <div dangerouslySetInnerHTML={{ __html: aboutData.contentHtml }} />
          ) : (
            // Replace Typography with p and Tailwind classes
            <p className="text-red-600">Content is missing.</p> // Fallback message
          )}
        </div>
        
        {/* Contact CTA */}
        {/* Replace Box with div and Tailwind classes */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-center">
          {/* Replace Typography with p and Tailwind classes */}
          <p className="text-2xl font-semibold mb-4">
            Ready to Transform Complexity into Confidence?
          </p>
          {/* Replace Button/Link with a tag styled as button */}
          <a 
            href="/contact"
            className="inline-block px-8 py-3 bg-indigo-600 text-white text-lg font-medium rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out mt-2"
          >
            Discuss Your AI Strategy
          </a>
        </div>
      </div>
    </PageContainer>
  );
};

export default AboutClientUI;
