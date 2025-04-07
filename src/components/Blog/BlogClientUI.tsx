'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Container, Typography, Box, Grid, Button, Divider, Chip, Pagination, TextField, InputAdornment
} from '@mui/material';
import {
  useRouter, useSearchParams, usePathname
} from 'next/navigation'; // Import navigation hooks

import { PostData } from '@/lib/posts';
import BlogCard from './BlogCard'; // Assuming BlogCard is in the same directory now
import NewsletterSignup from '@/components/Blog/NewsletterSignup';

// Icons (add SearchIcon)
import HeadphonesIcon from '@mui/icons-material/Headphones';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import SearchIcon from '@mui/icons-material/Search';

interface BlogClientUIProps {
  allPosts: PostData[];
  allTags: string[];
}

const POSTS_PER_PAGE = 9;

export default function BlogClientUI({ allPosts, allTags }: BlogClientUIProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State derived from URL
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const selectedTag = searchParams.get('tag') || null;
  const filterType = searchParams.get('type') || 'all'; // 'all', 'articles', 'podcasts'
  const searchQuery = searchParams.get('q') || '';

  // Local state only for the controlled search input
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

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

  // Memoized filtering and searching logic based on URL params
  const processedPosts = useCallback(() => {
    let filtered = allPosts;

    // Filter by content type
    if (filterType === 'articles') {
      filtered = filtered.filter(post => !post.isPodcast);
    } else if (filterType === 'podcasts') {
      filtered = filtered.filter(post => post.isPodcast);
    }

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(post =>
        post.tags && post.tags.includes(selectedTag)
      );
    }

    // Filter by search query (case-insensitive)
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(lowerCaseQuery) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(lowerCaseQuery)) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery)))
      );
    }

    return filtered;
  }, [allPosts, filterType, selectedTag, searchQuery]);

  // Pagination Calculations
  const totalPosts = processedPosts().length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const postsToDisplay = processedPosts().slice(startIndex, endIndex);

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

  // Event Handlers
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    updateSearchParams({ page: value.toString() });
  };

  const handleTagClick = useCallback((tag: string) => {
    const newTag = selectedTag === tag ? null : tag;
    updateSearchParams({ tag: newTag, page: '1' }); // Reset page on filter change
  }, [selectedTag, updateSearchParams]);

  const handleTypeClick = (type: string) => {
    updateSearchParams({ type: type, page: '1' }); // Reset page on filter change
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(event.target.value);
  };

  // --- RENDERING --- (Will replace old rendering logic)

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

          {/* Filter Controls */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'center' }}>
             {/* Content Type Filter */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button
                variant={filterType === 'all' ? 'contained' : 'outlined'}
                onClick={() => handleTypeClick('all')}
                size="small" sx={{ borderRadius: 8 }}
              >
                All
              </Button>
              <Button
                variant={filterType === 'articles' ? 'contained' : 'outlined'}
                onClick={() => handleTypeClick('articles')}
                size="small" sx={{ borderRadius: 8 }}
              >
                Articles
              </Button>
              <Button
                variant={filterType === 'podcasts' ? 'contained' : 'outlined'}
                onClick={() => handleTypeClick('podcasts')}
                size="small" startIcon={<HeadphonesIcon />} sx={{ borderRadius: 8 }}
              >
                Podcasts
              </Button>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' }, mx: 1 }} />

             {/* Tag Filter (Simplified for now - consider dropdown for many tags) */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
              <Chip
                  label="All Tags"
                  clickable
                  onClick={() => handleTagClick('')}
                  color={!selectedTag ? 'primary' : 'default'}
                  variant={!selectedTag ? 'filled' : 'outlined'}
                  size="small"
                  sx={{ borderRadius: 1 }}
              />
              {allTags.slice(0, 5).map((tag) => ( // Limit visible tags initially
                <Chip
                  key={tag}
                  label={tag}
                  clickable
                  onClick={() => handleTagClick(tag)}
                  color={selectedTag === tag ? 'primary' : 'default'}
                  variant={selectedTag === tag ? 'filled' : 'outlined'}
                  size="small"
                  sx={{ borderRadius: 1 }}
                />
              ))}
              {/* Add a "More Tags" button/dropdown if needed */} 
            </Box>
          </Box>
        </Box>

        {/* Results Count and Grid */}
        <Box sx={{ mb: 4 }}>
            <Typography variant="body2" color="text.secondary">
                Showing {postsToDisplay.length} of {totalPosts} results.
            </Typography>
        </Box>

        <Grid container spacing={3}>
          {postsToDisplay.length > 0 ? (
            postsToDisplay.map((post) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.slug}>
                <BlogCard post={post} />
              </Grid>
            ))
          ) : (
            <Grid size={12}>
                <Typography sx={{ textAlign: 'center', py: 5, color: 'text.secondary' }}>
                    No posts found matching your criteria.
                </Typography>
            </Grid>
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
