'use client';

import React, { useState, useEffect } from 'react';
import { PostData } from '@/types/post';
import BlogClientUI from './BlogClientUI';

// Export types so they can be imported by BlogClientUI
export type ContentType = 'all' | 'article' | 'podcast';
export type ViewMode = 'grid' | 'list';

interface BlogInteractivityWrapperProps {
  allPosts: PostData[];
}

const BlogInteractivityWrapper: React.FC<BlogInteractivityWrapperProps> = ({ 
  allPosts 
}) => {
  const [activeContentType, setActiveContentType] = useState<ContentType>('all');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>(allPosts);

  // Effect to filter posts when content type or tags change
  useEffect(() => {
    console.log('[Effect Start] Filtering triggered. Active Type:', activeContentType, 'Active Tags:', activeTags);
    let filtered = [...allPosts];
    console.log('[Effect Start] Initial posts count:', filtered.length);
    
    // --- Debugging Log Before Type Filter --- 
    console.log('[Effect] Before type filter:', filtered.map(p => ({ slug: p.slug, isPodcast: p.isPodcast })));
    // ----------------------------------------

    // Filter by content type
    if (activeContentType !== 'all') {
      filtered = filtered.filter(post => {
        if (activeContentType === 'podcast') return post.isPodcast;
        if (activeContentType === 'article') return !post.isPodcast;
        return true;
      });
    }

    // --- Debugging Log After Type Filter --- 
    console.log(`[Effect] After type filter ('${activeContentType}'):`, filtered.map(p => ({ slug: p.slug, isPodcast: p.isPodcast })));
    // ---------------------------------------
    
    // Filter by tags (if any tags are selected)
    if (activeTags.length > 0) {
      filtered = filtered.filter(post => 
        post.tags && post.tags.some(tag => activeTags.includes(tag))
      );
    }
    
    setFilteredPosts(filtered);
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

  // Determine the posts to display based on filtering logic
  const postsToDisplay = filteredPosts; // Use the filtered state

  // Extract all unique tags from the original allPosts for tag navigation
  const allTags = Array.from(new Set(allPosts.flatMap(post => post.tags || [])));

  // Render BlogClientUI directly, passing state and handlers as props
  return (
    <BlogClientUI
      allTags={allTags}   // Pass all unique tags
      activeContentType={activeContentType}
      activeTags={activeTags}
      viewMode={viewMode}
      postsToDisplay={postsToDisplay} // Pass the filtered posts
      handleContentTypeChange={handleContentTypeChange}
      handleTagToggle={handleTagToggle}
      handleResetFilters={handleResetFilters}
      handleViewModeChange={handleViewModeChange}
    />
  );
};

export default BlogInteractivityWrapper;
