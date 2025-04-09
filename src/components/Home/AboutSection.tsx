'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionContainer from '../Layout/SectionContainer';
import SectionHeading from '../Common/SectionHeading';
import Button from '../Common/Button';
import Heading from '../Common/Heading';
import Paragraph from '../Common/Paragraph';

const AboutSection: React.FC = () => {
  const lastName = "Williams";

  return (
    <SectionContainer 
      id="about"
      className="bg-white dark:bg-neutral-950 scroll-mt-20" 
    >
      <SectionHeading>
        About TheoForge
      </SectionHeading>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
          <div className="flex-1">
            <Paragraph className="mb-4 text-muted-foreground dark:text-muted-foreground-dark">
              TheoForge is dedicated to <strong>transforming AI complexity into strategic confidence</strong> for businesses and educational institutions. Based in Newark, NJ, we provide expert guidance, pragmatic implementation, and tailored education to ensure you successfully navigate the AI landscape.
            </Paragraph>
            
            <Paragraph className="mb-4 text-muted-foreground dark:text-muted-foreground-dark">
              We focus on delivering practical, high-impact AI solutions and strategies precisely aligned with your core objectives. We believe mastering AI requires more than just technology; it demands integrated expertise spanning strategy, engineering, organizational dynamics, and effective knowledge transfer.
            </Paragraph>
            
            <Heading level={3} className="text-2xl font-medium mt-8 mb-4 text-foreground dark:text-foreground-dark">
              Our Approach: Clarity, Capability, Confidence
            </Heading>
            
            <Paragraph className="mb-4 text-muted-foreground dark:text-muted-foreground-dark">
              We bridge the gap between the potential of advanced AI and its practical, valuable application within your context. Whether charting your initial AI course or scaling sophisticated systems, TheoForge provides the strategic insight, technical skill, and educational support to build lasting AI capability and confidence.
            </Paragraph>
          </div>
          
          <div className="flex-1 flex flex-col items-center text-center bg-muted dark:bg-muted-dark p-6 rounded-lg">
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
            
            <Heading level={5} className="text-xl font-medium mb-1 text-foreground dark:text-foreground-dark">
              Keith {lastName}
            </Heading>
            
            <Paragraph variant="body2" className="text-sm text-muted-foreground dark:text-muted-foreground-dark mb-4">
              Founder & Principal AI Strategist
            </Paragraph>
            
            <Paragraph className="mt-4 text-left text-muted-foreground dark:text-muted-foreground-dark">
              Keith brings a unique blend of 30 years of engineering experience, 20 years of university-level teaching, and deep expertise in AI technologies to your most complex challenges.
            </Paragraph>
            
            <Button 
              href="/about" 
              variant="primary" 
              size="md" 
              className="mt-6"
              rightIcon={<span className="ml-2">→</span>}
            >
              Meet Keith {lastName}
            </Button>
          </div>
        </div>

        <Heading level={3} className="text-2xl font-medium mt-16 mb-6 text-center text-foreground dark:text-foreground-dark">
          Why Partner with TheoForge?
        </Heading>

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
            <div key={index} className="p-6 bg-muted dark:bg-muted-dark rounded-lg">
              <Heading level={4} className="text-lg font-medium mb-2 text-foreground dark:text-foreground-dark">
                {point.title}
              </Heading>
              <Paragraph className="text-muted-foreground dark:text-muted-foreground-dark">
                {point.content}
              </Paragraph>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default AboutSection;
