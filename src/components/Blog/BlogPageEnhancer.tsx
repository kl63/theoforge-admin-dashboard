'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { PostData } from '@/types/post';
import { 
  Box, 
  Typography, 
  Stack, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip, 
  SelectChangeEvent, 
  Button 
} from '@mui/material';
import BlogCard from './BlogCard'; // Corrected to default import based on lint error

// Define type for content filtering
type ContentType = 'all' | 'article' | 'podcast';
type SortOrder = 'newest' | 'oldest';

interface BlogPageEnhancerProps {
  posts: PostData[];
  allContentTypes: string[]; // e.g., ['article', 'podcast']
}

const BlogPageEnhancer: React.FC<BlogPageEnhancerProps> = ({ posts, allContentTypes }) => {
  // State for content filtering
  const [selectedContentType, setSelectedContentType] = useState<ContentType>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  // Combine content types for the dropdown
  const contentTypeOptions: ContentType[] = ['all', ...(allContentTypes as ContentType[])];

  // --- Data Processing & Filtering --- //

  // Get the top N most frequent tags from all posts
  const topTags = useMemo(() => {
    const tagFrequency: { [key: string]: number } = {};
    posts.forEach(post => {
      post.tags?.forEach(tag => {
        tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
      });
    });

    // Sort tags by frequency (descending) and then alphabetically
    const sortedTags = Object.keys(tagFrequency).sort((a, b) => {
      const freqDiff = tagFrequency[b] - tagFrequency[a];
      if (freqDiff !== 0) return freqDiff;
      return a.localeCompare(b); // Alphabetical secondary sort
    });

    // Return top N tags (e.g., top 10)
    const MAX_TAGS_TO_SHOW = 10;
    return sortedTags.slice(0, MAX_TAGS_TO_SHOW);
  }, [posts]);

  // --- Filtering Logic --- //
  const filteredPosts = useMemo(() => {
    const processedPosts = posts.filter(post => {
      // Content Type Filter
      // Handle cases where post.content_type might be missing
      const postContentType = post.isPodcast ? 'podcast' : 'article'; // Determine content type based on isPodcast flag
      const contentTypeMatch = selectedContentType === 'all' || postContentType === selectedContentType;

      // Tag Filter
      // Ensure post.tags is always an array for filtering
      const postTags = Array.isArray(post.tags) ? post.tags : []; 
      const tagsMatch = selectedTags.length === 0 || selectedTags.every(tag => postTags.includes(tag));

      return contentTypeMatch && tagsMatch;
    });

    // Sorting Logic
    processedPosts.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return processedPosts;
  }, [posts, selectedContentType, selectedTags, sortOrder]);

  // --- Event Handlers --- //
  const handleContentTypeChange = useCallback((event: SelectChangeEvent<string>) => {
    setSelectedContentType(event.target.value as ContentType);
  }, []);

  const handleSortChange = useCallback((event: SelectChangeEvent<string>) => {
    setSortOrder(event.target.value as SortOrder);
  }, []);

  const handleTagToggle = useCallback((tag: string) => {
    // If the clicked tag is already selected, remove it
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag) // Remove tag
        : [...prev, tag] // Add tag (allow multiple tags)
    );
  }, []);

  const handleClearTags = useCallback(() => {
    setSelectedTags([]);
  }, []);

  // --- Render Logic --- //
  return (
    <Box sx={{ width: '100%', py: 4 }}>
      {/* Filter and Sort Controls */}
      <Box 
        sx={{
          display: 'flex',
          flexWrap: 'wrap', // Allow controls to wrap on smaller screens
          gap: 2,            // Spacing between control groups
          mb: 4,             // Margin below the controls section
          alignItems: 'center' // Align items vertically
        }}
      >
        {/* Content Type Filter - Takes available space, shrinks if needed */}
        <Box sx={{ flex: '1 1 200px' }}> {/* Flex basis 200px */}
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel id="content-type-select-label">Content Type</InputLabel>
            <Select
              labelId="content-type-select-label"
              value={selectedContentType}
              onChange={handleContentTypeChange}
              label="Content Type"
            >
              {contentTypeOptions.map(type => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)} {/* Capitalize */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Sorting Options - Takes available space, shrinks if needed */}
        <Box sx={{ flex: '1 1 200px' }}> {/* Flex basis 200px */}
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel id="sort-by-select-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-select-label"
              value={sortOrder}
              onChange={handleSortChange}
              label="Sort By"
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Tag Filters Section - Takes more space, allows wrapping */}
        <Box sx={{ flex: '2 1 300px', display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}> {/* Flex basis 300px, allows growth */}
          <Typography variant="body2" sx={{ mr: 1, fontWeight: 'medium', flexShrink: 0 }}>Filter by Tag:</Typography>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {topTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                clickable
                onClick={() => handleTagToggle(tag)}
                color={selectedTags.includes(tag) ? 'primary' : 'default'}
                variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
                size="small"
              />
            ))}
          </Stack>
          {selectedTags.length > 0 && (
            <Button
              size="small"
              onClick={handleClearTags}
              sx={{ ml: 1, textTransform: 'none', flexShrink: 0 }}
            >
              Clear Tags
            </Button>
          )}
        </Box>
      </Box>

      {/* Blog Post Grid */}
      <Box 
        sx={{
          display: 'grid',
          // Responsive grid columns: 1 on xs, 2 on sm, 3 on md+
          // Using minmax for flexible card width
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)', // 1 column on extra-small screens
            sm: 'repeat(2, 1fr)', // 2 columns on small screens
            md: 'repeat(3, 1fr)', // 3 columns on medium screens and up
          },
          // A simpler alternative using auto-fill:
          // gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 3, // Spacing between grid items (theme aware)
          mb: 4
        }}
      >
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))
        ) : (
          <Typography sx={{ gridColumn: '1 / -1' }}> {/* Span full grid width */}
            No posts match the current filters.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default BlogPageEnhancer;
