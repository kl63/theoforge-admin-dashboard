import React from 'react';
import { notFound } from 'next/navigation';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import { getPostData, getAllPostSlugs, getPostsByTag, PostData } from '@/lib/posts';
import MarkdownRenderer from '@/components/Common/MarkdownRenderer';
import Image from 'next/image';
import AudioPlayerOverlay from '@/components/Blog/AudioPlayerOverlay';
import PodcastMetadata from '@/components/Blog/PodcastMetadata';
import SocialShare from '@/components/Blog/SocialShare';
import NewsletterSignup from '@/components/Blog/NewsletterSignup';
import LinkedInPreview from '@/components/Blog/LinkedInPreview';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const slug = params.slug;
  const post = await getPostData(slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: `${post.title} - TheoForge Insights`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const slug = params.slug;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Get related posts based on shared tags
  const getRelatedPosts = async (currentPost: PostData): Promise<PostData[]> => {
    if (!currentPost.tags || currentPost.tags.length === 0) return [];
    
    // Get all posts that share at least one tag with the current post
    const relatedPosts: PostData[] = [];
    
    // Process one tag at a time to avoid too many parallel requests
    for (const tag of currentPost.tags) {
      const postsWithTag = await getPostsByTag(tag);
      const filteredPosts = postsWithTag.filter(p => p.slug !== currentPost.slug);
      
      filteredPosts.forEach(post => {
        // Only add if not already in the array
        if (!relatedPosts.some(p => p.slug === post.slug)) {
          relatedPosts.push(post);
        }
      });
      
      // Stop once we have enough related posts
      if (relatedPosts.length >= 3) break;
    }
    
    // Return up to 3 related posts
    return relatedPosts.slice(0, 3);
  };
  
  const relatedPosts = await getRelatedPosts(post);

  // Estimate reading time (rough calculation: 200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readingTimeMinutes = Math.max(1, Math.round(wordCount / 200));

  return (
    <Box sx={{ 
      py: { xs: 6, md: 8 },
      bgcolor: 'background.default'
    }}>
      <Container maxWidth="lg">
        {/* Navigation */}
        <Box sx={{ mb: 4 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            component={Link}
            href="/blog"
            sx={{ borderRadius: 8 }}
          >
            Back to All Articles
          </Button>
        </Box>

        <Paper elevation={0} sx={{ 
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          mb: 6
        }}>
          {/* Hero Image Section - With Podcast Badge if applicable */}
          {post.image && post.audioUrl ? (
            <Box sx={{ 
              position: 'relative', 
              width: '100%', 
              height: { xs: 300, sm: 400, md: 500 },
              backgroundColor: 'grey.100',
              overflow: 'hidden'
            }}>
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                style={{ 
                  objectFit: 'cover',
                  objectPosition: 'center top'
                }}
                sizes="(max-width: 960px) 100vw, 960px"
              />
              <AudioPlayerOverlay 
                imageUrl={post.image} 
                audioUrl={post.audioUrl} 
              />
              <Box sx={{ 
                position: 'absolute', 
                top: 16, 
                right: 16, 
                zIndex: 2,
                bgcolor: 'rgba(0,0,0,0.7)',
                color: 'white',
                borderRadius: 8,
                px: 2,
                py: 0.75,
                display: 'flex',
                alignItems: 'center'
              }}>
                {post.isPodcast ? (
                  <>
                    <HeadphonesIcon sx={{ mr: 1, fontSize: 18 }} />
                    <Typography variant="caption" sx={{ fontWeight: 'medium' }}>
                      Podcast Episode {post.podcastEpisodeNumber}
                    </Typography>
                  </>
                ) : (
                  <>
                    <BookmarkBorderIcon sx={{ mr: 1, fontSize: 18 }} />
                    <Typography variant="caption" sx={{ fontWeight: 'medium' }}>
                      Audio Available
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          ) : post.image ? (
            <Box sx={{ 
              position: 'relative', 
              width: '100%', 
              height: { xs: 300, sm: 400, md: 500 },
              backgroundColor: 'grey.100',
              overflow: 'hidden'
            }}>
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                style={{ 
                  objectFit: 'cover',
                  objectPosition: 'center top'
                }}
                sizes="(max-width: 960px) 100vw, 960px"
              />
            </Box>
          ) : null}

          {/* Content Container */}
          <Box sx={{ p: { xs: 3, sm: 5, md: 6 } }}>
            {/* Article Header */}
            <Box sx={{ mb: 6 }}>
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                alignItems: 'center', 
                gap: 1,
                mb: 2
              }}>
                {post.tags && post.tags.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {post.tags.map(tag => (
                      <Chip 
                        key={tag}
                        label={tag}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ borderRadius: 1 }}
                        component={Link}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        clickable
                      />
                    ))}
                  </Box>
                )}
                
                <Typography 
                  variant="caption" 
                  component="span"
                  sx={{ 
                    color: 'text.secondary',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {formattedDate} • {post.isPodcast ? post.podcastDuration : `${readingTimeMinutes} min read`}
                </Typography>
              </Box>

              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  lineHeight: 1.2,
                  mb: 3
                }}
              >
                {post.title}
              </Typography>

              {/* Author and sharing info */}
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2
              }}>
                {post.author && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        mr: 1.5,
                      }}
                    >
                      {post.author.charAt(0).toUpperCase()}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'medium' }}>
                        {post.author}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        TheoForge
                      </Typography>
                    </Box>
                  </Box>
                )}
                
                {/* Social Sharing */}
                <SocialShare
                  title={post.title}
                  url={`https://theoforge.com/blog/${post.slug}`}
                  description={post.excerpt}
                  hashtags={post.tags}
                />
              </Box>
            </Box>

            {/* Podcast Metadata for podcast episodes */}
            {post.isPodcast && (
              <PodcastMetadata
                episodeNumber={post.podcastEpisodeNumber}
                duration={post.podcastDuration}
                releaseDate={post.date}
                host={post.podcastHost}
                guest={post.podcastGuest}
              />
            )}

            <Divider sx={{ mb: 5 }} />

            {/* Main Content */}
            <Box sx={{ 
              maxWidth: '46rem', 
              mx: 'auto',
              fontSize: '1.125rem',
              '& > p:first-of-type': {
                fontSize: '1.25rem',
                color: 'text.primary',
              }
            }}>
              <MarkdownRenderer content={post.content} />
            </Box>

            {/* Tags and sharing at bottom */}
            <Box sx={{ 
              mt: 6,
              pt: 4,
              borderTop: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2
            }}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Related Topics
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {post.tags && post.tags.map(tag => (
                    <Chip 
                      key={tag}
                      label={tag} 
                      size="small" 
                      variant="outlined"
                      component={Link}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      clickable
                    />
                  ))}
                </Box>
              </Box>
              
              {/* Social Sharing */}
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Share This Article
                </Typography>
                <SocialShare
                  title={post.title}
                  url={`https://theoforge.com/blog/${post.slug}`}
                  description={post.excerpt}
                  hashtags={post.tags}
                />
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Newsletter Signup */}
        <Box sx={{ mb: 8 }}>
          <NewsletterSignup
            title="Get the Latest AI Insights"
            subtitle="Subscribe to receive our weekly newsletter featuring expert insights, podcast episodes, and exclusive resources for enterprise leaders."
          />
        </Box>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <Box sx={{ mb: 8 }}>
            <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 3, fontWeight: 'medium' }}>
              Related Articles
            </Typography>
            
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { 
                xs: '1fr', 
                sm: 'repeat(2, 1fr)', 
                md: relatedPosts.length === 3 ? 'repeat(3, 1fr)' : relatedPosts.length === 2 ? 'repeat(2, 1fr)' : '1fr'
              },
              gap: 3
            }}>
              {relatedPosts.map(relatedPost => (
                <Paper
                  key={relatedPost.slug}
                  elevation={0}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <Link 
                    href={`/blog/${relatedPost.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                  >
                    {relatedPost.image && (
                      <Box sx={{ position: 'relative', height: 160, overflow: 'hidden' }}>
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          style={{ objectFit: 'cover', objectPosition: 'center top' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                        />
                        
                        {/* Podcast indicator */}
                        {relatedPost.isPodcast && (
                          <Box sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            bgcolor: 'rgba(0,0,0,0.6)',
                            color: 'white',
                            borderRadius: '50%',
                            p: 0.75,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 32,
                            height: 32
                          }}>
                            <HeadphonesIcon fontSize="small" />
                          </Box>
                        )}
                      </Box>
                    )}
                    
                    <Box sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="caption" color="text.secondary" component="div">
                          {new Date(relatedPost.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </Typography>
                        
                        {relatedPost.isPodcast && (
                          <Chip 
                            label="Podcast" 
                            size="small" 
                            color="primary"
                            sx={{ borderRadius: 1, height: 20, fontSize: '0.65rem' }}
                          />
                        )}
                      </Box>
                      
                      <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mt: 1, mb: 1 }}>
                        {relatedPost.title}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {relatedPost.excerpt}
                      </Typography>
                    </Box>
                  </Link>
                </Paper>
              ))}
            </Box>
          </Box>
        )}

        {/* Next Actions */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'medium' }}>
            Ready to explore how AI can transform your organization?
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              component={Link}
              href="/contact"
              sx={{ borderRadius: 8, px: 3 }}
            >
              Contact Us
            </Button>
            <Button 
              variant="outlined"
              size="large"
              component={Link}
              href="/blog"
              sx={{ borderRadius: 8, px: 3 }}
            >
              Explore More Articles
            </Button>
          </Box>
        </Box>

        {/* LinkedIn Marketing Toolkit */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'medium' }}>
              Spread the Knowledge
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: '700px', mx: 'auto', mb: 3 }}>
              Help your network benefit from these insights by sharing this {post.isPodcast ? 'podcast episode' : 'article'} on LinkedIn.
            </Typography>
          </Box>
          <LinkedInPreview post={post} baseUrl="https://theoforge.com" />
        </Box>
      </Container>
    </Box>
  );
}
