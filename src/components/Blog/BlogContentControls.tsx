'use client';

import React, { useState } from 'react';
import { Box, Chip, Stack, Typography, Button } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import FilterListIcon from '@mui/icons-material/FilterList';
import { PostData } from '@/lib/posts';

type ContentType = 'all' | 'article' | 'podcast';
type ViewMode = 'grid' | 'list';

interface BlogContentControlsProps {
  posts: PostData[];
  uniqueTags: string[];
  onFilter: (filteredPosts: PostData[]) => void;
  onViewModeChange: (mode: ViewMode) => void;
}

const BlogContentControls: React.FC<BlogContentControlsProps> = ({ 
  posts, 
  uniqueTags, 
  onFilter,
  onViewModeChange
}) => {
  const [activeContentType, setActiveContentType] = useState<ContentType>('all');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Filter posts by content type and tags
  const filterPosts = () => {
    let filtered = [...posts];
    
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
    
    onFilter(filtered);
  };

  // Handle content type selection
  const handleContentTypeChange = (type: ContentType) => {
    setActiveContentType(type);
    setTimeout(() => filterPosts(), 0);
  };

  // Handle tag selection
  const handleTagToggle = (tag: string) => {
    const newActiveTags = activeTags.includes(tag)
      ? activeTags.filter(t => t !== tag)
      : [...activeTags, tag];
    
    setActiveTags(newActiveTags);
    setTimeout(() => filterPosts(), 0);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setActiveContentType('all');
    setActiveTags([]);
    onFilter(posts);
  };

  // Toggle view mode
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    onViewModeChange(mode);
  };

  return (
    <>
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
    </>
  );
};

export default BlogContentControls;
