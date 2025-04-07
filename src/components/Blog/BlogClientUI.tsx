'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Container, Typography, Box, Grid, Button, Divider, Chip, Pagination, TextField, InputAdornment
} from '@mui/material';
import {
  useRouter, useSearchParams, usePathname
} from 'next/navigation'; // Import navigation hooks

import { PostData } from '@/types/post'; // Corrected import path for type
import BlogCard from './BlogCard'; // Assuming BlogCard is in the same directory now
import NewsletterSignup from '@/components/Blog/NewsletterSignup';

// Icons (add SearchIcon)
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import GridViewIcon from '@mui/icons-material/GridView'; // Add Grid icon
import ViewListIcon from '@mui/icons-material/ViewList'; // Add List icon
import SearchIcon from '@mui/icons-material/Search';

// Import types used in props
import { ContentType, ViewMode } from './BlogInteractivityWrapper'; // Adjust path if necessary

interface BlogClientUIProps {
  allTags: string[];
  // Add props passed from the wrapper
  activeContentType: ContentType;
  activeTags: string[];
  viewMode: ViewMode;
  postsToDisplay: PostData[];
  handleContentTypeChange: (type: ContentType) => void;
  handleTagToggle: (tag: string) => void;
  handleResetFilters: () => void;
  handleViewModeChange: (mode: ViewMode) => void;
}

export default function BlogClientUI({
  allTags,
  // Destructure new props
  activeContentType,
  activeTags,
  viewMode,
  postsToDisplay,
  handleContentTypeChange,
  handleTagToggle,
  handleResetFilters,
  handleViewModeChange,
}: BlogClientUIProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State derived from URL
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const searchQuery = searchParams.get('q') || '';

  // Local state only for the controlled search input
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Helper function to update URL search parameters
  const updateSearchParams = useCallback((paramsToUpdate: { [key: string]: string | null }) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // Create mutable copy

    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      if (value === null || value === '') {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });

    // Always remove page if it's 1
    if (current.get('page') === '1') {
      current.delete('page');
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
  }, [pathname, router, searchParams]);

  // Update local search query if URL changes
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  // Debounce search input (optional but recommended)
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localSearchQuery !== searchQuery) {
        updateSearchParams({ q: localSearchQuery, page: '1' }); // Reset to page 1 on new search
      }
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [localSearchQuery, searchQuery, updateSearchParams]); // Re-run when local query changes

  // Pagination Calculations
  const totalPosts = postsToDisplay.length;
  const totalPages = Math.ceil(totalPosts / 9);
  const startIndex = (currentPage - 1) * 9;
  const endIndex = startIndex + 9;
  const paginatedPostsToDisplay = postsToDisplay.slice(startIndex, endIndex); // Paginate the filtered posts

  // Event Handlers
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    updateSearchParams({ page: value.toString() });
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateSearchParams({ q: localSearchQuery, page: '1' }); // Reset to page 1 on new search
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        {/* Header Section (Keep existing) */}
        <Box sx={{ mb: { xs: 6, md: 8 }, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <LightbulbOutlinedIcon sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 'medium', letterSpacing: 1.5 }}>
              THEOFORGE INSIGHTS
            </Typography>
          </Box>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3, fontSize: { xs: '2.25rem', md: '3rem' } }}>
            AI Strategy & Implementation
          </Typography>
          <Typography variant="h6" component="p" sx={{ color: 'text.secondary', fontWeight: 'normal', lineHeight: 1.6 }}>
            Practical perspectives for business leaders navigating the AI transformation —
            from strategic planning to effective implementation and team enablement.
          </Typography>
        </Box>

        {/* Search and Filter Section */}
        <Box sx={{ mb: 5, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search articles & podcasts..."
              value={localSearchQuery}
              onChange={handleSearchInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1, maxWidth: { md: '400px' } }} // Limit width on larger screens
            />
          </form>

          {/* Filter Controls */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'center' }}>
            {/* Content Type Filter */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Chip
                label="All Content"
                size="small"
                color={activeContentType === 'all' ? 'primary' : 'default'}
                variant={activeContentType === 'all' ? 'filled' : 'outlined'}
                clickable
                onClick={() => handleContentTypeChange('all')}
              />
              <Chip
                label="Articles"
                size="small"
                color={activeContentType === 'article' ? 'primary' : 'default'}
                variant={activeContentType === 'article' ? 'filled' : 'outlined'}
                clickable
                onClick={() => handleContentTypeChange('article')}
              />
              <Chip
                label="Podcasts"
                size="small"
                color={activeContentType === 'podcast' ? 'primary' : 'default'}
                variant={activeContentType === 'podcast' ? 'filled' : 'outlined'}
                clickable
                onClick={() => handleContentTypeChange('podcast')}
              />
            </Box>

            <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' }, mx: 1 }} />

            {/* Tag Filter (Simplified for now - consider dropdown for many tags) */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
              <Chip
                label="All Tags"
                clickable
                onClick={handleResetFilters}
                color={!activeTags.length ? 'primary' : 'default'}
                variant={!activeTags.length ? 'filled' : 'outlined'}
                size="small"
                sx={{ borderRadius: 1 }}
              />
              {allTags.slice(0, 5).map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  clickable
                  onClick={() => handleTagToggle(tag)}
                  color={activeTags.includes(tag) ? 'primary' : 'default'}
                  variant={activeTags.includes(tag) ? 'filled' : 'outlined'}
                  size="small"
                  sx={{ borderRadius: 1 }}
                />
              ))}
              {/* Add a "More Tags" button/dropdown if needed */}
            </Box>

            {/* View Mode Toggle */}
            <Box sx={{ display: 'flex', gap: 1, ml: { sm: 2 } }}>
              <Button
                size="small"
                variant={viewMode === 'grid' ? 'contained' : 'outlined'}
                onClick={() => handleViewModeChange('grid')}
                sx={{ minWidth: 0, p: 1 }}
                aria-label="Grid view"
              >
                <GridViewIcon fontSize="small" />
              </Button>
              <Button
                size="small"
                variant={viewMode === 'list' ? 'contained' : 'outlined'}
                onClick={() => handleViewModeChange('list')}
                sx={{ minWidth: 0, p: 1 }}
                aria-label="List view"
              >
                <ViewListIcon fontSize="small" />
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Results Count and Grid */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {postsToDisplay.length} of {totalPosts} results.
          </Typography>
        </Box>

        <Grid 
          container 
          spacing={viewMode === 'grid' ? 4 : 2} // Adjust spacing based on view
          sx={{ mb: { xs: 6, md: 8 } }}
        >
          {paginatedPostsToDisplay.length > 0 ? (
            paginatedPostsToDisplay.map((post) => (
              <Box
                key={post.slug}
                sx={{
                  padding: viewMode === 'grid' ? 2 : 1, // Simulate spacing
                  width: '100%', // xs
                  '@media (min-width:600px)': { // sm
                    width: viewMode === 'grid' ? '50%' : '100%',
                  },
                  '@media (min-width:900px)': { // md
                    width: viewMode === 'grid' ? '33.33%' : '100%',
                  },
                }}
              >
                <BlogCard post={post} />
              </Box>
            ))
          ) : (
            // No results message
            <Box sx={{ width: '100%', padding: 2 }}> 
              <Typography sx={{ textAlign: 'center', py: 5, color: 'text.secondary' }}>
                No posts found matching your criteria.
              </Typography>
            </Box>
          )}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 6 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        )}

        {/* Newsletter Signup (Keep existing) */}
        <NewsletterSignup />
      </Container>
    </Box>
  );
}
