'use client'; // Masonry likely requires client context

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Masonry from '@mui/lab/Masonry';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PostData } from '@/lib/posts'; // Import the correct data type
import InfoCard from '../Common/InfoCard'; // Import reusable card component

interface BlogSnippetsSectionProps {
  blogSnippets: PostData[]; 
}

const BlogSnippetsSection: React.FC<BlogSnippetsSectionProps> = ({ blogSnippets }) => (
  <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
    <Container maxWidth="lg">
      <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ mb: 6 }}>
        Enterprise AI Insights & Perspectives
      </Typography>
      {/* Use Masonry for layout */}
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={4}>
        {blogSnippets.map((post) => (
          <InfoCard 
            key={post.slug} // Use slug for key
            title={post.title} // Use post.title
            excerpt={post.excerpt} // Use post.excerpt
            image={post.image} // Pass the image prop down
            link={`/blog/${post.slug}`} // Construct link from slug
          />
        ))}
      </Masonry>
      <Box textAlign="center" sx={{ mt: 6 }}>
        {/* Link the button to the main blog page */}
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
