import * as React from 'react';

import HeroSection from '../components/Home/HeroSection';
import ServicesSection from '../components/Home/ServicesSection';
import AboutSection from '../components/Home/AboutSection';
import TestimonialsSection from '../components/Home/TestimonialsSection';
import BlogSnippetsSection from '../components/Home/BlogSnippetsSection';
import ForgeSection from '../components/Home/ForgeSection';
import CallToActionSection from '../components/Home/CallToActionSection';

// Import data fetching functions and types
import { getSortedPostsData } from '@/lib/posts';
import { getSortedServicesData } from '@/lib/services'; 
import { PostData } from '@/types/post'; 
import { ServiceData } from '@/types/service'; 

export default async function HomePage() {
  // Fetch exactly 3 blog posts - now with await
  const allPosts: PostData[] = await getSortedPostsData();
  const latestPosts = allPosts.slice(0, 3);
  
  // Fetch services and slice to get exactly 3 for the homepage display
  const allServices: ServiceData[] = await getSortedServicesData(); 
  const displayServices = allServices.slice(0, 3);

  return (
    <main>
      <HeroSection />
      <AboutSection />
      {/* Pass only the first 3 services */}
      <ServicesSection services={displayServices} /> 
      <TestimonialsSection />
      {/* Correct prop name: blogSnippets */}
      <BlogSnippetsSection blogSnippets={latestPosts} />
      <ForgeSection />
      <CallToActionSection />
    </main>
  );
}
