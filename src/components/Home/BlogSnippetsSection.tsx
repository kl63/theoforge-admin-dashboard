'use client'; // Grid likely requires client context

import React from 'react';
import NextLink from 'next/link';
import InfoCard from '../Common/InfoCard';
import SectionContainer from '../Layout/SectionContainer'; // Import new container
import SectionHeading from '../Common/SectionHeading'; // Import new heading
import { PostData } from '@/types/post'; // Import from the types definition file

interface BlogSnippetsSectionProps {
  blogSnippets: PostData[]; 
}

const BlogSnippetsSection: React.FC<BlogSnippetsSectionProps> = ({ blogSnippets }) => (
  // Use SectionContainer, pass ID and background classes
  <SectionContainer id="blog-insights" className="py-16 bg-white dark:bg-gray-900">
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
      <NextLink href="/blog" legacyBehavior passHref> 
        <a className="inline-flex items-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white dark:bg-gray-800 dark:text-blue-400 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-150">
          Visit Our Blog
          <span className="ml-2">→</span>
        </a>
      </NextLink>
    </div>
  </SectionContainer>
);

export default BlogSnippetsSection;
