'use client';

import React, { useState, useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import Image from 'next/image'; 
import { format } from 'date-fns';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import FilterListIcon from '@mui/icons-material/FilterList';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { PostData } from '@/lib/posts';
import NewsletterSignup from '@/components/Blog/NewsletterSignup';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface BlogClientUIProps {
  allPosts: PostData[];
  allTags: string[];
}

export default function BlogClientUI({ allPosts, allTags }: BlogClientUIProps) {
  // Add "All" as the first tag option
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'articles' | 'podcasts'>('all');
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>(allPosts);
  
  // Slider ref for custom navigation
  const sliderRef = useRef<Slider | null>(null);

  // Split posts into featured and regular
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const regularPosts = filteredPosts.slice(1);

  // Filter posts when tag or type changes
  useEffect(() => {
    let filtered = allPosts;
    
    // First filter by content type
    if (filterType === 'articles') {
      filtered = filtered.filter(post => !post.isPodcast);
    } else if (filterType === 'podcasts') {
      filtered = filtered.filter(post => post.isPodcast);
    }
    
    // Then filter by tag if needed
    if (selectedTag) {
      filtered = filtered.filter(post => 
        post.tags && post.tags.includes(selectedTag)
      );
    }
    
    setFilteredPosts(filtered);
  }, [selectedTag, filterType, allPosts]);

  // Handle tag selection
  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  // Slider settings
  const sliderSettings = {
    dots: false,
    infinite: regularPosts.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Box sx={{ 
      py: { xs: 6, md: 10 },
      bgcolor: 'background.default'
    }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ 
          mb: { xs: 6, md: 8 },
          textAlign: 'center',
          maxWidth: '800px',
          mx: 'auto'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <LightbulbOutlinedIcon sx={{ color: 'primary.main', mr: 1 }} />
            <Typography 
              variant="overline" 
              sx={{ 
                color: 'primary.main', 
                fontWeight: 'medium',
                letterSpacing: 1.5
              }}
            >
              THEOFORGE INSIGHTS
            </Typography>
          </Box>
          
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              mb: 3,
              fontSize: { xs: '2.25rem', md: '3rem' }
            }}
          >
            AI Strategy & Implementation
          </Typography>
          
          <Typography 
            variant="h6" 
            component="p" 
            sx={{ 
              color: 'text.secondary',
              fontWeight: 'normal',
              lineHeight: 1.6
            }}
          >
            Practical perspectives for business leaders navigating the AI transformation —
            from strategic planning to effective implementation and team enablement.
          </Typography>
        </Box>

        {/* Tag Filtering Section */}
        <Box sx={{ 
          mb: 5, 
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 2,
          justifyContent: 'center'
        }}>
          {/* Content Type Filter */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            mb: { xs: 2, sm: 0 }
          }}>
            <Button
              variant={filterType === 'all' ? 'contained' : 'outlined'}
              onClick={() => setFilterType('all')}
              size="small"
              sx={{ borderRadius: 8 }}
            >
              All Content
            </Button>
            <Button
              variant={filterType === 'articles' ? 'contained' : 'outlined'}
              onClick={() => setFilterType('articles')}
              size="small"
              sx={{ borderRadius: 8 }}
            >
              Articles
            </Button>
            <Button
              variant={filterType === 'podcasts' ? 'contained' : 'outlined'}
              onClick={() => setFilterType('podcasts')}
              size="small"
              startIcon={<HeadphonesIcon />}
              sx={{ borderRadius: 8 }}
            >
              Podcasts
            </Button>
          </Box>
          
          {/* Divider for better visual separation */}
          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
          <Divider sx={{ display: { xs: 'block', sm: 'none' } }} />
          
          {/* Tag Filter */}
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1, color: 'text.secondary' }}>
              <FilterListIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">Filter by topic:</Typography>
            </Box>
            <Chip 
              label="All Topics"
              onClick={() => setSelectedTag(null)}
              color={selectedTag === null ? "primary" : "default"}
              variant={selectedTag === null ? "filled" : "outlined"}
              sx={{ borderRadius: 1, fontWeight: selectedTag === null ? 'medium' : 'normal' }}
            />
            {allTags.map(tag => (
              <Chip 
                key={tag}
                label={tag}
                onClick={() => handleTagClick(tag)}
                color={selectedTag === tag ? "primary" : "default"}
                variant={selectedTag === tag ? "filled" : "outlined"}
                sx={{ borderRadius: 1, fontWeight: selectedTag === tag ? 'medium' : 'normal' }}
              />
            ))}
          </Box>
        </Box>

        {/* Newsletter Section */}
        <Box sx={{ mb: 8 }}>
          <NewsletterSignup
            title="Join Our Executive Insights Network"
            subtitle="Subscribe to receive weekly AI strategy insights, podcast episodes, and exclusive resources tailored for enterprise leaders. Perfect content to share with your team."
          />
        </Box>

        {filteredPosts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h5" color="text.secondary">
              No articles found with the selected tag.
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => setSelectedTag(null)}
              sx={{ mt: 3 }}
            >
              View All Articles
            </Button>
          </Box>
        ) : (
          <>
            {/* Featured Post Section */}
            {featuredPost && (
              <Box sx={{ mb: { xs: 6, md: 8 } }}>
                <Card 
                  elevation={0}
                  sx={{ 
                    borderRadius: 2,
                    overflow: 'hidden',
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    position: 'relative',
                  }}
                >
                  <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 2 }}>
                    <Chip 
                      label="FEATURED"
                      color="primary"
                      size="small"
                      sx={{ 
                        fontWeight: 'bold',
                        color: 'white',
                        px: 1
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row' },
                    height: { md: 500 }
                  }}>
                    {/* Image Container - Left on Desktop */}
                    <Box sx={{ 
                      width: { xs: '100%', md: '60%' },
                      position: 'relative',
                      height: { xs: 300, md: '100%' },
                      backgroundColor: 'grey.100'
                    }}>
                      <Image
                        src={featuredPost.image || '/vibe_coding.png'}
                        alt={featuredPost.title}
                        fill
                        priority
                        style={{ 
                          objectFit: 'cover',
                          objectPosition: 'center'
                        }}
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                    </Box>
                    
                    {/* Content Container - Right on Desktop */}
                    <Box sx={{ 
                      width: { xs: '100%', md: '40%' },
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                      <CardContent sx={{ 
                        p: { xs: 3, md: 4 }, 
                        display: 'flex', 
                        flexDirection: 'column',
                        height: '100%',
                        justifyContent: 'center'
                      }}>
                        <Box sx={{ mb: 2 }}>
                          <Typography 
                            variant="caption" 
                            component="div"
                            sx={{ 
                              mb: 1, 
                              color: 'text.secondary',
                              textTransform: 'uppercase',
                              letterSpacing: 0.5,
                              fontWeight: 'medium',
                              fontSize: '0.7rem'
                            }}
                          >
                            {new Date(featuredPost.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </Typography>

                          {/* Tags */}
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                            {featuredPost.tags?.map(tag => (
                              <Chip 
                                key={tag}
                                label={tag}
                                size="small"
                                variant="outlined"
                                sx={{ 
                                  borderRadius: 1, 
                                  height: 22,
                                  fontSize: '0.7rem'
                                }}
                                onClick={() => handleTagClick(tag)}
                              />
                            ))}
                          </Box>
                          
                          {featuredPost.isPodcast && (
                            <Chip
                              icon={<HeadphonesIcon fontSize="small" />}
                              label={`Podcast Episode ${featuredPost.podcastEpisodeNumber || ''}`}
                              size="small"
                              color="primary"
                              sx={{ mb: 2, borderRadius: 1 }}
                            />
                          )}
                          
                          <Typography 
                            variant="h4" 
                            component="h2"
                            sx={{ 
                              fontWeight: 'bold',
                              letterSpacing: '-0.02em',
                              mb: 2,
                              lineHeight: 1.2,
                            }}
                          >
                            {featuredPost.title}
                          </Typography>

                          <Typography 
                            variant="body1" 
                            sx={{ 
                              color: 'text.secondary',
                              mb: 4,
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                          >
                            {featuredPost.excerpt}
                          </Typography>
                        </Box>

                        <Box sx={{ mt: 'auto' }}>
                          {featuredPost.author && (
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                              <Box
                                sx={{
                                  width: 34,
                                  height: 34,
                                  borderRadius: '50%',
                                  bgcolor: 'primary.main',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white',
                                  fontWeight: 'bold',
                                  fontSize: '0.75rem',
                                  mr: 1,
                                }}
                              >
                                {featuredPost.author.charAt(0).toUpperCase()}
                              </Box>
                              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                {featuredPost.author}
                              </Typography>
                            </Box>
                          )}
                          
                          <Button
                            component={Link}
                            href={`/blog/${featuredPost.slug}`}
                            variant="contained"
                            color="primary"
                            endIcon={<ArrowForwardIcon />}
                            sx={{ 
                              borderRadius: 8,
                              px: 3,
                              py: 1
                            }}
                          >
                            Read Article
                          </Button>
                        </Box>
                      </CardContent>
                    </Box>
                  </Box>
                </Card>
              </Box>
            )}

            {/* Carousel Section Title */}
            {regularPosts.length > 0 && (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
              }}>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  sx={{ fontWeight: 'medium' }}
                >
                  More Articles
                </Typography>
                
                {/* Carousel Navigation */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    variant="outlined"
                    size="small"
                    onClick={() => sliderRef.current?.slickPrev()}
                    sx={{ 
                      minWidth: 0, 
                      p: 1,
                      borderRadius: '50%'
                    }}
                  >
                    <ArrowBackIcon fontSize="small" />
                  </Button>
                  <Button 
                    variant="outlined"
                    size="small"
                    onClick={() => sliderRef.current?.slickNext()}
                    sx={{ 
                      minWidth: 0, 
                      p: 1,
                      borderRadius: '50%'
                    }}
                  >
                    <ArrowForwardIcon fontSize="small" />
                  </Button>
                </Box>
              </Box>
            )}

            {/* Carousel for Regular Posts */}
            {regularPosts.length > 0 && (
              <Box sx={{ mb: 6 }}>
                <Slider ref={sliderRef} {...sliderSettings}>
                  {regularPosts.map((post) => (
                    <Box key={post.slug} sx={{ px: 1.5 }}>
                      <Card
                        elevation={0}
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'all 0.3s ease-in-out',
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          overflow: 'hidden',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: 3,
                            '& .post-image': {
                              transform: 'scale(1.05)'
                            }
                          }
                        }}
                      >
                        <Link 
                          href={`/blog/${post.slug}`} 
                          style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}
                        >
                          {/* Image Container */}
                          <Box sx={{ 
                            position: 'relative',
                            height: 220,
                            overflow: 'hidden',
                            backgroundColor: 'grey.100'
                          }}>
                            <Box 
                              className="post-image"
                              sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                transition: 'transform 0.5s ease'
                              }}
                            >
                              <Image
                                src={post.image || '/images/placeholder.png'}
                                alt={post.title}
                                fill
                                style={{ 
                                  objectFit: 'cover',
                                  objectPosition: 'center'
                                }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            </Box>
                          </Box>
          
                          {/* Card Content */}
                          <CardContent sx={{ 
                            p: 3, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            flexGrow: 1
                          }}>
                            <Typography 
                              variant="caption" 
                              color="text.secondary" 
                              component="div"
                              sx={{ 
                                mb: 1,
                                textTransform: 'uppercase',
                                letterSpacing: 0.5,
                                fontWeight: 'medium',
                                fontSize: '0.7rem'
                              }}
                            >
                              {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </Typography>
                            
                            {/* Tags */}
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                              {post.tags?.slice(0, 2).map(tag => (
                                <Chip 
                                  key={tag}
                                  label={tag}
                                  size="small"
                                  variant="outlined"
                                  sx={{ 
                                    borderRadius: 1, 
                                    height: 22,
                                    fontSize: '0.7rem'
                                  }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleTagClick(tag);
                                  }}
                                />
                              ))}
                              {post.tags && post.tags.length > 2 && (
                                <Chip 
                                  label={`+${post.tags.length - 2}`}
                                  size="small"
                                  variant="outlined"
                                  sx={{ 
                                    borderRadius: 1, 
                                    height: 22,
                                    fontSize: '0.7rem'
                                  }}
                                />
                              )}
                            </Box>
                            
                            {post.isPodcast && (
                              <Chip
                                icon={<HeadphonesIcon fontSize="small" />}
                                label={post.podcastDuration || "Podcast"}
                                size="small"
                                color="primary"
                                sx={{ mb: 2, borderRadius: 1, height: 22, fontSize: '0.7rem' }}
                              />
                            )}
                            
                            <Typography 
                              variant="h6" 
                              component="h2" 
                              gutterBottom
                              sx={{ 
                                fontWeight: 'bold',
                                mb: 2,
                                lineHeight: 1.3
                              }}
                            >
                              {post.title}
                            </Typography>
                            
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{ 
                                mb: 3,
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                flexGrow: 1
                              }}
                            >
                              {post.excerpt}
                            </Typography>
                            
                            <Box sx={{ 
                              display: 'flex', 
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              mt: 'auto'
                            }}>
                              {post.author && (
                                <Typography 
                                  variant="caption" 
                                  color="text.secondary"
                                  sx={{ fontWeight: 'medium' }}
                                >
                                  {post.author}
                                </Typography>
                              )}
                              
                              <Typography 
                                component="span" 
                                color="primary"
                                sx={{ 
                                  display: 'flex',
                                  alignItems: 'center',
                                  fontWeight: 'medium',
                                  fontSize: '0.875rem'
                                }}
                              >
                                Read More
                                <ArrowForwardIcon sx={{ ml: 0.5, fontSize: '0.875rem' }} />
                              </Typography>
                            </Box>
                          </CardContent>
                        </Link>
                      </Card>
                    </Box>
                  ))}
                </Slider>
              </Box>
            )}
          </>
        )}

        {/* CTA Section */}
        <Box sx={{ 
          bgcolor: 'primary.light',
          color: 'primary.contrastText',
          p: { xs: 4, md: 6 },
          borderRadius: 2,
          mt: 8,
          textAlign: 'center'
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Ready to transform your organization with AI?
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '700px', mx: 'auto', mb: 4 }}>
            Sign up for our newsletter to receive the latest insights directly in your inbox, 
            or contact us to discuss how we can help your organization leverage AI.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              color="primary"
              sx={{ 
                bgcolor: 'background.paper', 
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'background.default',
                },
                borderRadius: 8,
                px: 4
              }}
            >
              Subscribe to Updates
            </Button>
            <Button 
              variant="outlined" 
              sx={{ 
                borderColor: 'background.paper', 
                color: 'background.paper',
                '&:hover': {
                  borderColor: 'background.default',
                  bgcolor: 'rgba(255,255,255,0.1)'
                },
                borderRadius: 8,
                px: 4
              }}
              component={Link}
              href="/contact"
            >
              Contact Us
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
