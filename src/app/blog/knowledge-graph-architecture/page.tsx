import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { allBlogSnippets } from '@/data/blogSnippets'; 

const post = allBlogSnippets.find(p => p.link === '/blog/knowledge-graph-architecture');

export default function BlogPostPage() {
  if (!post) {
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h5" color="error">Blog post not found.</Typography>
        </Container>
    );
  }

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="md"> 
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link href="/">
            Home
          </Link>
          <Link href="/blog">
            Blog
          </Link>
          <Typography color="text.primary">{post.title}</Typography>
        </Breadcrumbs>

        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          {post.title}
        </Typography>
        
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          By Keith Williams | Published: [Date Placeholder]
        </Typography>

        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 2 }}>
          {post.excerpt}
        </Typography>

        <Box sx={{ '& p': { mb: 2, lineHeight: 1.7 }, '& h2': { mt: 4, mb: 2, fontWeight: 'medium' } }}>
            <Typography variant="body1" paragraph>
                [Placeholder for the full content of the blog post: &quot;Knowledge Graphs: Architecting the Intelligent Enterprise Data Fabric&quot;. Discuss the benefits, core concepts, architecture patterns, and integration challenges.]
            </Typography>
            <Typography variant="h4" component="h2">
                Why Knowledge Graphs?
            </Typography>
            <Typography variant="body1" paragraph>
                [Content...]
            </Typography>
             <Typography variant="h4" component="h2">
                Building the Fabric
            </Typography>
             <Typography variant="body1" paragraph>
                 [Content...]
            </Typography>
             <Typography variant="h4" component="h2">
                Real-World Applications
             </Typography>
             <Typography variant="body1" paragraph>
                 [Content...]
            </Typography>
            <Typography variant="h4" component="h2">
                Conclusion
            </Typography>
             <Typography variant="body1" paragraph>
                [Summarize key takeaways and reiterate the value proposition of knowledge graphs for the enterprise.]
            </Typography>
        </Box>

        <Box sx={{ mt: 5, textAlign: 'center' }}>
            <Link href="/blog">
                <Button variant="outlined">Back to Blog</Button>
            </Link>
        </Box>
      </Container>
    </Box>
  );
}
