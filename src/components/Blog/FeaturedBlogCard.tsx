'use client'; // Assume client component if using hooks like useTheme, otherwise remove

import React from 'react';
import { PostData } from '@/types/post';
import { Box, Typography, Card, CardMedia, CardContent, CardActionArea, Grid, Chip, Stack } from '@mui/material';
import Link from 'next/link';
import HeadphonesIcon from '@mui/icons-material/Headphones';

interface FeaturedBlogCardProps {
  post: PostData;
}

const FeaturedBlogCard: React.FC<FeaturedBlogCardProps> = ({ post }) => {
  const linkHref = `/blog/${post.slug}`;

  return (
    <Card sx={{ display: 'flex', borderRadius: 2, boxShadow: 3, mb: 6, overflow: 'hidden' }}>
      <CardActionArea 
        component={Link} 
        href={linkHref}
        sx={{ textDecoration: 'none', color: 'inherit', display: 'flex', width: '100%' }}
      >
        <Grid container>
          {/* Image Section (takes half width on md+ screens) */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CardMedia
              component="img"
              sx={{ 
                width: '100%', 
                height: { xs: 250, md: '100%' }, // Full height on larger screens
                objectFit: 'cover' 
              }}
              image={post.image || '/images/default-blog-banner.jpg'} // Use default if missing
              alt={post.title}
            />
          </Grid>

          {/* Content Section (takes half width on md+ screens) */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CardContent sx={{ p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="overline" color="text.secondary" gutterBottom>
                Featured Post
              </Typography>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                {post.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
                {post.excerpt}
              </Typography>
              
              {/* Tags */}
              {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                    {post.tags.slice(0, 4).map((tag) => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ borderRadius: 1, fontSize: '0.75rem' }} />
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Footer Metadata */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
                <Typography variant="caption" color="text.secondary" sx={{ flexGrow: 1 }}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  {post.readingTime ? ` • ${post.readingTime}` : ''}
                </Typography>
                {post.isPodcast && (
                  <Chip 
                    label="Podcast" 
                    size="small" 
                    color="secondary"
                    icon={<HeadphonesIcon sx={{ fontSize: 14, marginLeft: '4px' }} />} 
                    sx={{ borderRadius: 1, height: 22, fontSize: '0.75rem', bgcolor: 'secondary.main', color: 'secondary.contrastText' }}
                  />
                )}
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

export default FeaturedBlogCard;
