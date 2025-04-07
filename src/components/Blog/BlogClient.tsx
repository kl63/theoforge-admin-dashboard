'use client';

import React, { useState } from 'react';
import { Box, Typography, Container, Chip, Stack, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import { PostData } from '@/types/post';
import BlogContentControls from './BlogContentControls';

interface BlogClientProps {
  allPosts: PostData[];
}

type ViewMode = 'grid' | 'list';

const BlogClient: React.FC<BlogClientProps> = ({ allPosts }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>(allPosts.slice(1)); // All except featured
  const [featuredPost, setFeaturedPost] = useState<PostData>(allPosts[0]);

  // Get unique tags from all posts
  const uniqueTags: string[] = Array.from(
    new Set(
      allPosts.flatMap(post => post.tags || [])
    )
  ).sort();

  // Handle posts filtering
  const handleFilter = (filtered: PostData[]) => {
    // If we have filtered posts, set them and update featured post
    if (filtered.length > 0) {
      setFilteredPosts(filtered.slice(1));
      setFeaturedPost(filtered[0]);
    } else {
      // If no posts match filter, show empty state
      setFilteredPosts([]);
      // Keep the original featured post
      setFeaturedPost(allPosts[0]);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Page Header */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Insights & Expertise
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 700, mx: 'auto' }}>
          Enterprise technology strategies and thought leadership for forward-thinking executives
        </Typography>
      </Box>
      
      {/* Interactive Filter Controls */}
      <BlogContentControls 
        posts={allPosts}
        uniqueTags={uniqueTags}
        onFilter={handleFilter}
        onViewModeChange={setViewMode}
      />
      
      {/* Featured Post */}
      {featuredPost && (
        <Box sx={{ mb: 6 }}>
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 'bold', display: 'block', mb: 2 }}>
            FEATURED INSIGHT
          </Typography>
          
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            bgcolor: 'background.paper',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 1
          }}>
            <Box sx={{ position: 'relative', height: { xs: 240, md: '100%' }, minHeight: { md: 320 } }}>
              <Image 
                src={featuredPost.image || '/images/placeholder.png'} 
                alt={featuredPost.title} 
                fill 
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {featuredPost.isPodcast && (
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 16, 
                    left: 16, 
                    bgcolor: 'primary.main',
                    color: 'white',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}
                >
                  PODCAST
                </Box>
              )}
            </Box>
            
            <Box sx={{ p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                  {featuredPost.tags?.slice(0, 3).map((tag: string) => (
                    <Chip 
                      key={tag} 
                      label={tag} 
                      size="small" 
                      variant="outlined"
                      icon={<TagOutlinedIcon fontSize="small" />}
                    />
                  ))}
                </Stack>
                
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {featuredPost.title}
                </Typography>
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {featuredPost.excerpt || featuredPost.title}
                </Typography>
              </Box>
              
              <Box sx={{ mt: 'auto' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {new Date(featuredPost.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    {featuredPost.readingTime && ` · ${featuredPost.readingTime} min read`}
                  </Typography>
                </Box>
                
                <Button 
                  component={Link}
                  href={`/blog/${featuredPost.slug}`}
                  variant="contained" 
                  color="primary"
                >
                  Read {featuredPost.isPodcast ? 'Episode' : 'Article'}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      
      {/* No Results State */}
      {filteredPosts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" component="h3" gutterBottom>
            No matching content found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Try adjusting your filters or selecting different tags
          </Typography>
        </Box>
      )}
      
      {/* Content Grid or List View */}
      {filteredPosts.length > 0 && (
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: viewMode === 'grid' 
            ? { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }
            : '1fr',
          gap: { xs: 3, md: 4 },
          mb: 6
        }}>
          {filteredPosts.map((post: PostData) => (
            <Box 
              key={post.slug} 
              sx={{ 
                display: 'flex', 
                flexDirection: viewMode === 'grid' ? 'column' : { xs: 'column', sm: 'row' },
                height: '100%',
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                },
                bgcolor: 'background.paper',
                boxShadow: 1
              }}
              component={Link}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Box sx={{ 
                position: 'relative', 
                height: viewMode === 'grid' ? 200 : 240,
                width: viewMode === 'grid' ? '100%' : { xs: '100%', sm: 240 },
                bgcolor: 'grey.100',
                flexShrink: 0
              }}>
                <Image 
                  src={post.image || '/images/placeholder.png'} 
                  alt={post.title} 
                  fill 
                  style={{ objectFit: 'cover' }}
                  sizes={viewMode === 'grid' 
                    ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    : "(max-width: 768px) 100vw, 240px"
                  }
                />
                {post.isPodcast && (
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 12, 
                      left: 12, 
                      bgcolor: 'primary.main',
                      color: 'white',
                      px: 1,
                      py: 0.25,
                      borderRadius: 1,
                      fontSize: '0.7rem',
                      fontWeight: 'bold'
                    }}
                  >
                    PODCAST
                  </Box>
                )}
              </Box>
              
              <Box sx={{ 
                p: 3, 
                display: 'flex', 
                flexDirection: 'column', 
                flexGrow: 1,
                width: viewMode === 'list' ? { xs: '100%', sm: 'calc(100% - 240px)' } : '100%'
              }}>
                {post.tags && post.tags.length > 0 && (
                  <Chip 
                    label={post.tags[0]} 
                    size="small" 
                    sx={{ alignSelf: 'flex-start', mb: 1.5 }}
                    variant="outlined"
                  />
                )}
                
                <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {post.title}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {post.excerpt || post.title}
                </Typography>
                
                <Box sx={{ mt: 'auto' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    {post.readingTime && ` · ${post.readingTime} min read`}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default BlogClient;
