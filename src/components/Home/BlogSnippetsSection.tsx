'use client'; // Grid likely requires client context

import React from 'react';
import NextLink from 'next/link';
import InfoCard from '../Common/InfoCard';
import SectionContainer from '../Layout/SectionContainer'; // Import new container
import SectionHeading from '../Common/SectionHeading'; // Import new heading
import { PostData } from '@/types/post'; // Import from the types definition file
import Button from '../Common/Button'; // Import Button

interface BlogSnippetsSectionProps {
  blogSnippets: PostData[]; 
}

const BlogSnippetsSection: React.FC<BlogSnippetsSectionProps> = ({ blogSnippets }) => (
  // Use SectionContainer, pass ID and background classes
  <SectionContainer id="blog-insights" className="bg-background dark:bg-background"> {/* Use theme background */}
    {/* Use SectionHeading, specify alignment */}
    <SectionHeading align="left">
      Latest Insights & Articles
    </SectionHeading>
    
    {/* Change layout to grid, remove inner wrapper div */}
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8"
    >
      {blogSnippets.map((post) => (
        // Render InfoCard directly inside the grid cell
        <InfoCard 
          key={post.slug} // Key should be on the outermost element in the map
          title={post.title} 
          image={post.image} 
          excerpt={post.excerpt} 
          link={`/blog/${post.slug}`}
        />
      ))}
    </div>
    
    {/* Button section remains the same */}
    <div className="text-center mt-12">
      {/* Replaced styled <a> tag with Button */}
      <Button href="/blog" variant="outline" size="md" rightIcon={<span className="ml-2">→</span>}>
        Visit Our Blog
      </Button>
    </div>
  </SectionContainer>
);

export default BlogSnippetsSection;
