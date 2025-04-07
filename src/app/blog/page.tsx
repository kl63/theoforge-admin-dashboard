import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { getSortedPostsData } from '@/lib/posts';
import { PostData } from '@/types/post';
import { Metadata } from 'next';
import NewsletterFooter from '@/components/Blog/NewsletterFooter';
import BlogPageEnhancer from '@/components/Blog/BlogPageEnhancer';
import '@/styles/blog-chip-fix.css';

export const metadata: Metadata = {
  title: 'TheoForge Blog | Navigating AI Complexity with Confidence',
  description: 'Expert insights on AI strategy, pragmatic implementation, and workforce enablement to help you confidently navigate the complexities of enterprise AI.',
};

export default async function BlogPage() {
  const allPostsData: PostData[] = await getSortedPostsData();
  const allContentTypes: string[] = Array.from(new Set(allPostsData.map(p => p.isPodcast ? 'Podcast' : 'Article'))).sort();
  
  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Page Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Insights & Expertise
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Strategic insights to help you confidently navigate the complexities of enterprise AI and digital transformation.
          </Typography>
        </Box>
        
        {/* Filters and Post Grid managed by Enhancer */}
        <BlogPageEnhancer 
          posts={allPostsData} 
          allContentTypes={allContentTypes} 
        />
      </Container>
      <NewsletterFooter />
    </Box>
  );
};
