// src/components/About/AboutClientUI.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionContainer from '@/components/Layout/SectionContainer';
import Heading from '@/components/Common/Heading';
import Paragraph from '@/components/Common/Paragraph';
import Button from '@/components/Common/Button';

// Icons (Placeholders - consider replacing with actual SVGs or an icon library like lucide-react)
const PlaceholderIcon = ({ char }: { char: string }) => (
  <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-primary dark:text-blue-300 text-3xl font-semibold font-poppins">
    {char}
  </div>
);

interface AboutClientUIProps {
  aboutData: any; // Prop kept for structure, but currently unused in this design
}

export const AboutClientUI: React.FC<AboutClientUIProps> = ({ aboutData }) => {
  // Note: aboutData is ignored in this redesigned version.
  // Content is hardcoded for a more personal/creative approach.

  return (
    <main className="bg-background dark:bg-neutral-950">
      {/* --- Hero Section --- */}
      <SectionContainer className="pt-20 pb-16 text-center">
        <Image
          src="/theo_keith.png"
          alt="Keith Williams - Cartoon Profile"
          width={240} // Increased size for prominence
          height={240}
          className="rounded-full mx-auto mb-8 shadow-lg border-4 border-white dark:border-neutral-800"
          priority
        />
        <Heading
          level={1}
          className="font-poppins font-semibold text-4xl sm:text-5xl mb-4 text-neutral-900 dark:text-neutral-100"
        >
          Hi, I&apos;m <span className="text-primary dark:text-primary-light">Keith Williams</span>
        </Heading>
        <Paragraph className="text-xl max-w-3xl mx-auto text-neutral-800 dark:text-neutral-200">
          Your partner in demystifying AI. I started TheoForge to bridge the gap between complex AI potential and real-world business value, helping leaders like you build strategic confidence through clear guidance and practical solutions.
        </Paragraph>
      </SectionContainer>

      {/* --- Inspired by Theophrastus Section --- */}
      <SectionContainer>
        <div className="max-w-3xl mx-auto text-center md:text-left"> {/* Center on small, left-align on medium+ */}
          <Heading level={2} className="text-2xl md:text-3xl font-semibold mb-4 font-poppins text-neutral-900 dark:text-neutral-100">
            Inspired by Theophrastus
          </Heading>
          <Paragraph className="mb-4 text-lg text-neutral-800 dark:text-neutral-200">
            The name 'TheoForge' carries a special meaning. It's inspired by Theophrastus, the ancient Greek philosopher who succeeded Aristotle. He wasn't just a thinker; he was a keen observer and classifier of the natural world, dedicated to understanding how things actually worked and applying that knowledge practically.
          </Paragraph>
          <Paragraph className="text-lg text-neutral-800 dark:text-neutral-200 mb-6">
            This spirit of rigorous observation, clear categorization, and practical application is the bedrock of TheoForge. Just as Theophrastus brought structure to botany, I aim to bring clarity and actionable strategy to the complexities of AI. We 'forge' solutions – robust, tailored, and effective – by connecting the potential of AI directly to your unique business challenges and goals. It’s about turning abstract concepts into tangible value, guided by a legacy of pragmatic wisdom.
          </Paragraph>
        </div>
      </SectionContainer>

      {/* --- Core Philosophy Section --- */}
      <SectionContainer className="bg-muted/30 dark:bg-muted/10">
        <Heading level={2} className="text-center mb-12 font-poppins font-semibold text-3xl text-neutral-900 dark:text-neutral-100">
          My Approach: Clarity, Capability, Confidence
        </Heading>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Strategy Block */}
          <div className="text-center">
            <PlaceholderIcon char="S" />
            <Heading level={3} className="text-xl font-medium mb-2 text-neutral-900 dark:text-neutral-100">
              Strategic Clarity
            </Heading>
            <Paragraph className="text-neutral-800 dark:text-neutral-200">
              Together, we&apos;ll cut through the hype, defining an AI strategy precisely aligned with your unique business goals and context.
            </Paragraph>
          </div>
          {/* Engineering Block */}
          <div className="text-center">
            <PlaceholderIcon char="E" />
            <Heading level={3} className="text-xl font-medium mb-2 text-neutral-900 dark:text-neutral-100">
              Pragmatic Engineering
            </Heading>
            <Paragraph className="text-neutral-800 dark:text-neutral-200">
              We focus on building reliable, high-impact AI solutions (like RAG, LLM integrations, and Knowledge Graphs) that deliver tangible results, not just experiments.
            </Paragraph>
          </div>
          {/* Education Block */}
          <div className="text-center">
            <PlaceholderIcon char="Ed" /> 
            <Heading level={3} className="text-xl font-medium mb-2 text-neutral-900 dark:text-neutral-100">
              Empowering Education
            </Heading>
            <Paragraph className="text-neutral-800 dark:text-neutral-200">
              I believe in building your team&apos;s internal capabilities, transferring knowledge effectively so you can confidently own and scale your AI initiatives.
            </Paragraph>
          </div>
        </div>
      </SectionContainer>

      {/* --- Unique Blend Section --- */}
      <SectionContainer>
        <Heading level={2} className="text-center mb-6 font-poppins font-semibold text-3xl text-neutral-900 dark:text-neutral-100">
          Bridging Worlds: Engineer, Educator, AI Strategist
        </Heading>
        <Paragraph className="max-w-3xl mx-auto text-center text-lg text-neutral-800 dark:text-neutral-200">
          With <span className="text-foreground dark:text-foreground-dark font-medium">30 years in engineering leadership</span> and <span className="text-foreground dark:text-foreground-dark font-medium">20 years teaching at the university level</span>, I bring a unique perspective. I don&apos;t just understand the technology; I know how to translate it into practical business strategy and effectively teach your team how to leverage it. This blend is key to making complex AI accessible and impactful for you.
        </Paragraph>
      </SectionContainer>

      {/* --- Brand Break Section --- */}
      <SectionContainer className="py-10">
        <Link href="/" className="flex justify-center">
          <Image
            src="/logo.png"
            alt="TheoForge Logo"
            width={100} // Smaller logo as a divider
            height={27} // Maintain aspect ratio (approx 120:32 -> 100:26.6)
            className="dark:invert opacity-80 hover:opacity-100 transition-opacity"
          />
        </Link>
      </SectionContainer>

      {/* --- CTA Section --- */}
      <SectionContainer className="text-center bg-muted/30 dark:bg-muted/10">
        <Heading level={2} className="mb-4 text-3xl font-poppins font-semibold text-neutral-900 dark:text-neutral-100">
          Ready to Build Your AI Confidence?
        </Heading>
        <Paragraph className="text-lg max-w-2xl mx-auto text-neutral-800 dark:text-neutral-200 mb-6">
          Let&apos;s discuss how TheoForge can help you navigate the AI landscape and achieve your strategic goals.
        </Paragraph>
        <Button href="/contact" variant="primary" size="lg">
          Let&apos;s Chart Your AI Course
        </Button>
      </SectionContainer>
    </main>
  );
};

export default AboutClientUI;
