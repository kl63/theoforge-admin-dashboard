import React from 'react';
import { Container, Typography, Box, Chip, Stack, Button, Grid } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import { Metadata } from 'next';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import NewsletterFooter from '@/components/Blog/NewsletterFooter';
import { PostData } from '@/lib/posts';
import BlogPageEnhancer from '@/components/Blog/BlogPageEnhancer';
import '@/styles/blog-chip-fix.css';
import FilterChips from '@/components/Blog/FilterChips';

export const metadata: Metadata = {
  title: 'Blog | Thought Leadership for Enterprise Technology',
  description: 'Expert insights on enterprise AI, cloud strategy, and digital transformation',
};

export default async function BlogPage() {
  const allPostsData: PostData[] = await getSortedPostsData();
  
  // Get unique tags from all posts
  const uniqueTags: string[] = Array.from(
    new Set(
      allPostsData.flatMap(post => post.tags || [])
    )
  ).sort();
  
  // Featured post is the most recent one
  const featuredPost: PostData = allPostsData[0];
  // Other posts in sorted order
  const regularPosts: PostData[] = allPostsData.slice(1);

  return (
    <Box>
      <BlogPageEnhancer />
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
        
        {/* Content Filter Controls */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterListIcon />
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
              Filter Content
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            <Chip 
              label="All Content" 
              color="primary"
              sx={{ 
                backgroundColor: '#008080', 
                color: '#ffffff !important',
                '& .MuiChip-label': {
                  color: '#ffffff !important'
                }
              }}
              variant="filled" 
              clickable
              data-filter-content="all"
            />
            <Chip 
              label="Articles" 
              variant="outlined" 
              clickable
              data-filter-content="article"
            />
            <Chip 
              label="Podcasts" 
              variant="outlined" 
              clickable
              data-filter-content="podcast"
            />
          </Stack>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              size="small" 
              variant="outlined" 
              sx={{ minWidth: 0, p: 1 }}
              aria-label="Grid view"
              data-view-mode="grid"
            >
              <GridViewIcon fontSize="small" />
            </Button>
            <Button 
              size="small" 
              variant="outlined" 
              sx={{ minWidth: 0, p: 1 }}
              aria-label="List view"
              data-view-mode="list"
            >
              <ViewListIcon fontSize="small" />
            </Button>
          </Box>
        </Box>
        
        {/* Featured Post */}
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
        
        {/* Tag Navigation */}
        <Box sx={{ mb: 5, overflow: 'auto', pb: 1 }}>
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ 
              flexWrap: { xs: 'nowrap', md: 'wrap' },
              justifyContent: { xs: 'flex-start', md: 'center' }
            }}
          >
            <Chip 
              label="All Tags" 
              color="primary" 
              clickable
              data-filter-tag="all"
              sx={{ 
                backgroundColor: '#008080', 
                color: '#ffffff !important',
                '& .MuiChip-label': {
                  color: '#ffffff !important'
                }
              }}
            />
            {uniqueTags.map((tag: string) => (
              <Chip 
                key={tag} 
                label={tag} 
                variant="outlined" 
                clickable
                data-filter-tag={tag}
              />
            ))}
          </Stack>
        </Box>
        
        {/* No Results Message (hidden by default) */}
        <Box id="no-results-message" sx={{ display: 'none', textAlign: 'center', py: 8 }}>
          <Typography variant="h5" component="h3" gutterBottom>
            No matching content found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Try adjusting your filters or selecting different tags
          </Typography>
        </Box>
        
        {/* Content Grid */}
        <Box 
          id="post-grid"
          className="grid-card-view"
          sx={{ 
            display: 'grid',
            gridTemplateColumns: { 
              xs: '1fr', 
              sm: 'repeat(2, 1fr)', 
              md: 'repeat(3, 1fr)' 
            },
            gap: { xs: 3, md: 4 },
            mb: 6
          }}
        >
          {regularPosts.map((post: PostData) => (
            <Box 
              key={post.slug} 
              className="grid-card"
              data-post-card="true"
              data-is-podcast={post.isPodcast ? "true" : "false"}
              data-tags={post.tags?.join(',')}
              sx={{ 
                display: 'flex', 
                flexDirection: 'column',
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
              <Box sx={{ position: 'relative', height: 200, bgcolor: 'grey.100' }}>
                <Image 
                  src={post.image || '/images/placeholder.png'} 
                  alt={post.title} 
                  fill 
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
              
              <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
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
        
        {/* Newsletter Signup */}
        <NewsletterFooter />
      </Container>
    </Box>
  );
};
