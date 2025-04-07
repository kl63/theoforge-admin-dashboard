'use client'; // Grid likely requires client context

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import InfoCard from '../Common/InfoCard';
import { PostData } from '@/types/post'; // Import from the types definition file
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface BlogSnippetsSectionProps {
  blogSnippets: PostData[]; 
}

const BlogSnippetsSection: React.FC<BlogSnippetsSectionProps> = ({ blogSnippets }) => (
  <Box id="blog-insights" sx={{ py: 8, backgroundColor: 'background.paper' }}>
    <Container maxWidth="lg">
      <Typography variant="h3" component="h2" textAlign="left" sx={{ mb: 6 }}>
        Latest Insights & Articles
      </Typography>
      {/* Flexbox Layout for Blog Snippets */}
      <Box 
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4, // Use theme spacing for gap
          justifyContent: 'center', // Center items if space allows
          mb: 4 // Maintain bottom margin
        }}
      >
        {blogSnippets.map((post) => (
          <Box
            key={post.slug}
            sx={{
              flexBasis: { xs: '100%', md: 'calc(33.333% - 22px)' }, // Approx 1/3 minus gap
              flexGrow: 1,
              flexShrink: 0,
              maxWidth: { xs: '100%', md: 'calc(33.333% - 22px)' }, // Match flexBasis
              display: 'flex',
              alignItems: 'stretch',
            }}
          >
            <InfoCard 
              title={post.title} 
              image={post.image} 
              excerpt={post.excerpt} 
              link={`/blog/${post.slug}`}
            />
          </Box>
        ))}
      </Box>
      <Box textAlign="center" sx={{ mt: 6 }}>
        <Link href="/blog" passHref> 
          <Button variant="outlined" color="primary" size="large" endIcon={<ArrowForwardIcon />}>
            Visit Our Blog
          </Button>
        </Link>
      </Box>
    </Container>
  </Box>
);

export default BlogSnippetsSection;
