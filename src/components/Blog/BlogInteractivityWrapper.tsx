'use client';

import React, { useState, useEffect } from 'react';
import { Box, Chip, Stack, Typography, Button, Grid, Container } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import { PostData } from '@/lib/posts';

type ContentType = 'all' | 'article' | 'podcast';
type ViewMode = 'grid' | 'list';

interface BlogInteractivityWrapperProps {
  allPosts: PostData[];
  children: React.ReactNode;
}

const BlogInteractivityWrapper: React.FC<BlogInteractivityWrapperProps> = ({ 
  allPosts,
  children 
}) => {
  const [activeContentType, setActiveContentType] = useState<ContentType>('all');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>(allPosts);
  const [featuredPost, setFeaturedPost] = useState<PostData | null>(allPosts[0] || null);
  const [regularPosts, setRegularPosts] = useState<PostData[]>(allPosts.slice(1));

  // Get unique tags from all posts
  const uniqueTags: string[] = Array.from(
    new Set(
      allPosts.flatMap(post => post.tags || [])
    )
  ).sort();

  // Filter posts based on active filters
  useEffect(() => {
    let filtered = [...allPosts];
    
    // Filter by content type
    if (activeContentType !== 'all') {
      filtered = filtered.filter(post => {
        if (activeContentType === 'podcast') return post.isPodcast;
        if (activeContentType === 'article') return !post.isPodcast;
        return true;
      });
    }
    
    // Filter by tags (if any tags are selected)
    if (activeTags.length > 0) {
      filtered = filtered.filter(post => 
        post.tags && post.tags.some(tag => activeTags.includes(tag))
      );
    }
    
    setFilteredPosts(filtered);
    
    // Update featured post and regular posts
    if (filtered.length > 0) {
      setFeaturedPost(filtered[0]);
      setRegularPosts(filtered.slice(1));
    } else {
      setFeaturedPost(null);
      setRegularPosts([]);
    }
  }, [activeContentType, activeTags, allPosts]);

  // Handle content type selection
  const handleContentTypeChange = (type: ContentType) => {
    setActiveContentType(type);
  };

  // Handle tag selection
  const handleTagToggle = (tag: string) => {
    setActiveTags(prevTags => 
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  // Reset all filters
  const handleResetFilters = () => {
    setActiveContentType('all');
    setActiveTags([]);
  };

  // Toggle view mode
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  // Replace child props with our interactive props
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        // Only override the Content Filter Controls, Tag Navigation, and Content Grid
        contentFilterControls: (
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
                color={activeContentType === 'all' ? 'primary' : 'default'}
                variant={activeContentType === 'all' ? 'filled' : 'outlined'}
                clickable
                onClick={() => handleContentTypeChange('all')}
              />
              <Chip 
                label="Articles" 
                color={activeContentType === 'article' ? 'primary' : 'default'}
                variant={activeContentType === 'article' ? 'filled' : 'outlined'}
                clickable
                onClick={() => handleContentTypeChange('article')}
              />
              <Chip 
                label="Podcasts" 
                color={activeContentType === 'podcast' ? 'primary' : 'default'}
                variant={activeContentType === 'podcast' ? 'filled' : 'outlined'}
                clickable
                onClick={() => handleContentTypeChange('podcast')}
              />
            </Stack>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                size="small" 
                variant={viewMode === 'grid' ? 'contained' : 'outlined'}
                sx={{ minWidth: 0, p: 1 }}
                aria-label="Grid view"
                onClick={() => handleViewModeChange('grid')}
              >
                <GridViewIcon fontSize="small" />
              </Button>
              <Button 
                size="small" 
                variant={viewMode === 'list' ? 'contained' : 'outlined'}
                sx={{ minWidth: 0, p: 1 }}
                aria-label="List view"
                onClick={() => handleViewModeChange('list')}
              >
                <ViewListIcon fontSize="small" />
              </Button>
            </Box>
          </Box>
        ),
        tagNavigation: (
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
                color={activeTags.length === 0 ? 'primary' : 'default'}
                variant={activeTags.length === 0 ? 'filled' : 'outlined'}
                clickable
                onClick={handleResetFilters}
              />
              {uniqueTags.map((tag: string) => (
                <Chip 
                  key={tag} 
                  label={tag}
                  color={activeTags.includes(tag) ? 'primary' : 'default'}
                  variant={activeTags.includes(tag) ? 'filled' : 'outlined'}
                  clickable
                  onClick={() => handleTagToggle(tag)}
                />
              ))}
            </Stack>
          </Box>
        ),
        featuredPost,
        regularPosts,
        viewMode,
        // Show no results message if needed
        noResults: filteredPosts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" component="h3" gutterBottom>
              No matching content found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Try adjusting your filters or selecting different tags
            </Typography>
          </Box>
        )
      });
    }
    return child;
  });

  return <>{childrenWithProps}</>;
};

export default BlogInteractivityWrapper;
