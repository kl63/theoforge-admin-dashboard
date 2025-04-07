import * as React from 'react';
import Box from '@mui/material/Box';

import HeroSection from '../components/Home/HeroSection';
import ServicesSection from '../components/Home/ServicesSection';
import AboutSection from '../components/Home/AboutSection';
import TestimonialsSection from '../components/Home/TestimonialsSection';
import BlogSnippetsSection from '../components/Home/BlogSnippetsSection';
import ForgeSection from '../components/Home/ForgeSection';
import CallToActionSection from '../components/Home/CallToActionSection';

// Import data fetching functions and types
import { testimonials } from '../data/testimonials'; 
import { getSortedPostsData } from '@/lib/posts';
import { getSortedServicesData } from '@/lib/services'; 
import { PostData } from '@/types/post'; 
import { ServiceData } from '@/types/service'; 

// Specific images for the latest blog posts
const insightImages = [
  '/vibe_coding.png', 
  '/images/blog/alien_intelligence.png', 
];

export default async function HomePage() {
  // Fetch exactly 3 blog posts - now with await
  const allPosts: PostData[] = await getSortedPostsData();
  const latestPosts = allPosts.slice(0, 3);
  
  // Fetch services and slice to get exactly 3 for the homepage display
  const allServices: ServiceData[] = await getSortedServicesData(); 
  const displayServices = allServices.slice(0, 3);

  // Add images to the latest posts data
  const latestPostsWithImages: PostData[] = latestPosts.map((post, index) => ({
    ...post,
    // Remove fallback, rely on InfoCard to handle missing image
    image: insightImages[index], 
  }));

  return (
    <Box>
      <HeroSection />
      <AboutSection />
      {/* Pass only the first 3 services */}
      <ServicesSection services={displayServices} /> 
      <TestimonialsSection testimonials={testimonials} />
      {/* Correct prop name: blogSnippets */}
      <BlogSnippetsSection blogSnippets={latestPostsWithImages} />
      <ForgeSection />
      <CallToActionSection />
    </Box>
  );
}
