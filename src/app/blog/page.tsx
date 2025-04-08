import React, { Suspense } from 'react';
import { getSortedPostsData } from '@/lib/posts';
import { PostData } from '@/types/post';
import { Metadata } from 'next';
import NewsletterFooter from '@/components/Blog/NewsletterFooter';
import BlogInteractivityWrapper from '@/components/Blog/BlogInteractivityWrapper';
import PageContainer from '@/components/Layout/PageContainer';

export const metadata: Metadata = {
  title: 'TheoForge Blog | Navigating AI Complexity with Confidence',
  description: 'Expert insights on AI strategy, pragmatic implementation, and workforce enablement to help you confidently navigate the complexities of enterprise AI.',
};

export default async function BlogPage() {
  const allPostsData: PostData[] = await getSortedPostsData();
  
  const pageTitle = "Insights & Expertise";
  const pageSubtitle = "Strategic insights to help you confidently navigate the complexities of enterprise AI and digital transformation.";

  return (
    <main>
      <PageContainer title={pageTitle} subtitle={pageSubtitle}>
        <Suspense fallback={<p>Loading blog posts...</p>}>
          <BlogInteractivityWrapper allPosts={allPostsData} /> 
        </Suspense>
        <NewsletterFooter /> 
      </PageContainer>
    </main>
  );
};
