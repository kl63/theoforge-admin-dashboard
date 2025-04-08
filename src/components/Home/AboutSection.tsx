'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionContainer from '../Layout/SectionContainer';
import SectionHeading from '../Common/SectionHeading';

const AboutSection: React.FC = () => {
  const lastName = "Williams";

  return (
    <SectionContainer 
      id="about"
      className="bg-white dark:bg-gray-900 scroll-mt-20" 
    >
      <SectionHeading>
        About TheoForge
      </SectionHeading>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
          <div className="flex-1">
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              TheoForge is dedicated to <strong>transforming AI complexity into strategic confidence</strong> for businesses and educational institutions. Based in Newark, NJ, we provide expert guidance, pragmatic implementation, and tailored education to ensure you successfully navigate the AI landscape.
            </p>
            
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We focus on delivering practical, high-impact AI solutions and strategies precisely aligned with your core objectives. We believe mastering AI requires more than just technology; it demands integrated expertise spanning strategy, engineering, organizational dynamics, and effective knowledge transfer.
            </p>
            
            <h3 className="text-2xl font-medium mt-8 mb-4 text-gray-900 dark:text-white">
              Our Approach: Clarity, Capability, Confidence
            </h3>
            
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We bridge the gap between the potential of advanced AI and its practical, valuable application within your context. Whether charting your initial AI course or scaling sophisticated systems, TheoForge provides the strategic insight, technical skill, and educational support to build lasting AI capability and confidence.
            </p>
          </div>
          
          <div className="flex-1 flex flex-col items-center text-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <div 
              className="relative w-44 mb-4 rounded-full overflow-hidden shadow-lg"
              style={{ height: '11rem' }} 
            >
              <Image
                src="/theo_keith.png"
                alt="Keith Williams"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
                sizes="176px"
              />
            </div>
            
            <h3 className="text-xl font-medium mb-1 text-gray-900 dark:text-white">
              Keith {lastName}
            </h3>
            
            <p className="text-md text-gray-500 dark:text-gray-400 mb-4">
              Founder & Principal AI Strategist
            </p>
            
            <p className="mt-4 text-left text-gray-700 dark:text-gray-300">
              Keith brings a unique blend of 30 years of engineering experience, 20 years of university-level teaching, and deep expertise in AI technologies to your most complex challenges.
            </p>
            
            <Link href="/profile" passHref legacyBehavior>
              <a 
                className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-150"
              >
                Meet Keith {lastName}
                <span className="ml-2">→</span> 
              </a>
            </Link>
          </div>
        </div>

        <h3 className="text-2xl font-medium mt-16 mb-6 text-center text-gray-900 dark:text-white">
          Why Partner with TheoForge?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: 'Integrated Expertise for Holistic Solutions',
              content: 'We combine deep AI technical skill (RAG, LLMs, Graphs) with strategic vision and user-centric design. This holistic approach moves beyond isolated features to deliver cohesive, high-impact AI systems you can trust.',
            },
            {
              title: 'From Complexity to Confident Adoption',
              content: 'Leveraging decades of CTO leadership and instructional design mastery, we translate complex AI concepts into practical strategies and build internal capabilities, ensuring your team adopts and leverages AI effectively and confidently.',
            },
          ].map((point, index) => (
            <div key={index} className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h4 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
                {point.title}
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                {point.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default AboutSection;
