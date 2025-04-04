import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import HeroSection from '../components/Home/HeroSection';
import ServicesSection from '../components/Home/ServicesSection';
import AboutSection from '../components/Home/AboutSection';
import TestimonialsSection from '../components/Home/TestimonialsSection';
import BlogSnippetsSection from '../components/Home/BlogSnippetsSection';
import CallToActionSection from '../components/Home/CallToActionSection';

// Import data
import { testimonials } from '../data/testimonials';
import { getSortedPostsData, PostData } from '@/lib/posts';

// Define Service data structure (can be moved to a types file later)
interface ServiceTeaser {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  link: string;
}

// Static data for Service Teasers - Updated to match actual service pages
const servicesData: ServiceTeaser[] = [
  {
    slug: 'tech-strategy', // Updated slug
    title: 'Technology Strategy & Leadership', // Updated title
    excerpt: 'Define your digital vision and align technology with core business goals.', // Updated excerpt
    image: '/strategic.png', // Updated to existing image
    link: '/services/tech-strategy' // Updated link
  },
  {
    slug: 'workforce-training', // Updated slug
    title: 'Future-Ready Workforce Training', // Updated title
    excerpt: 'Empower your teams with modern skills in AI, testing, and secure development.', // Updated excerpt
    image: '/ai_training.png', // Updated to existing image
    link: '/services/workforce-training' // Updated link
  },
  {
    slug: 'modernization-advisory', // Updated slug
    title: 'AI-Driven Modernization Advisory', // Updated title
    excerpt: 'Navigate legacy system modernization intelligently with AI-driven insights.', // Updated excerpt
    image: '/understanding_latent_space_and_vector_search.png', // Updated to existing image
    link: '/services/modernization-advisory' // Updated link
  }
];

// Specific images for the latest blog posts
const insightImages = [
  '/vibe_coding.png',
  '/develop_your_model_context_protocol_strategy.png',
  '/alien_intelligence.png',
  '/rise_generative_ai_in_business.png'
];

export default async function HomePage() {
  // Fetch exactly 3 blog posts - now with await
  const allPosts = await getSortedPostsData();
  const latestPosts = allPosts.slice(0, 3);
  
  return (
    <Box>
      <HeroSection />
      {/* Pass prepared services data */}
      <ServicesSection services={servicesData} /> 
      <AboutSection />
      <TestimonialsSection testimonials={testimonials} />
      {/* Pass exactly 3 blog posts */}
      <BlogSnippetsSection blogSnippets={latestPosts} /> 
      <CallToActionSection />
    </Box>
  );
}
