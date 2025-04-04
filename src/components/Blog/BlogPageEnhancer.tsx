'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Box, Chip, Stack, Typography, Button } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { PostData } from '@/lib/posts';

// Define type for content filtering
type ContentType = 'all' | 'article' | 'podcast';
type ViewMode = 'grid' | 'list';

const BlogPageEnhancer: React.FC = () => {
  // State for content filtering
  const [activeContentType, setActiveContentType] = useState<ContentType>('all');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Helper function to update UI based on filter selection
  const updateFilterUI = useCallback((contentType: ContentType, tags: string[]) => {
    // This function intentionally left empty as we're now handling UI updates
    // with direct style manipulation in the event listeners
  }, []);

  // Define the applyFilters function early to avoid "cannot access before initialization" error
  const applyFilters = useCallback((contentType: ContentType, tags: string[]) => {
    // Update the UI to reflect the active filters
    updateFilterUI(contentType, tags);
    
    // Get all post cards
    const postCards = document.querySelectorAll('[data-post-card]');
    let visibleCount = 0;

    postCards.forEach((card) => {
      const element = card as HTMLElement;
      const isPodcast = element.getAttribute('data-is-podcast') === 'true';
      const postTags = element.getAttribute('data-tags')?.split(',') || [];
      
      // Check if post matches content type filter
      const matchesContentType = contentType === 'all' || 
        (contentType === 'podcast' && isPodcast) || 
        (contentType === 'article' && !isPodcast);
      
      // Check if post matches tag filters (if any)
      const matchesTags = tags.length === 0 || 
        tags.some(tag => postTags.includes(tag));
      
      // Show or hide based on filter criteria
      if (matchesContentType && matchesTags) {
        element.style.display = '';
        visibleCount++;
      } else {
        element.style.display = 'none';
      }
    });

    // Show/hide the no results message
    const noResultsElement = document.getElementById('no-results-message');
    if (noResultsElement) {
      noResultsElement.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }, [updateFilterUI]);

  // Find all the chips for content type filtering
  useEffect(() => {
    // Helper function to apply consistent styling
    const setChipActive = (element: Element, isActive: boolean) => {
      if (isActive) {
        (element as HTMLElement).style.backgroundColor = '#008080';
        (element as HTMLElement).style.color = '#ffffff';
        const label = element.querySelector('.MuiChip-label');
        if (label) {
          (label as HTMLElement).style.color = '#ffffff';
        }
      } else {
        (element as HTMLElement).style.backgroundColor = '';
        (element as HTMLElement).style.color = '';
        const label = element.querySelector('.MuiChip-label');
        if (label) {
          (label as HTMLElement).style.color = '';
        }
      }
    };

    const contentChips = document.querySelectorAll('[data-filter-content]');
    
    // Set initial state
    contentChips.forEach((chip) => {
      const type = (chip as HTMLElement).getAttribute('data-filter-content') as ContentType;
      setChipActive(chip, type === activeContentType);
    });
    
    contentChips.forEach((chip) => {
      chip.addEventListener('click', (e) => {
        if (!e.currentTarget) return;
        
        const type = (e.currentTarget as HTMLElement).getAttribute('data-filter-content') as ContentType;
        
        // Reset all chips to default style
        contentChips.forEach((c) => {
          setChipActive(c, false);
        });
        
        // Set the clicked chip to active style
        setChipActive(e.currentTarget as Element, true);
        
        setActiveContentType(type);
        setTimeout(() => applyFilters(type, activeTags), 0);
      });
    });

    return () => {
      contentChips.forEach((chip) => {
        chip.removeEventListener('click', () => {});
      });
    };
  }, [activeTags, activeContentType, applyFilters]);

  // Find all the chips for tag filtering
  useEffect(() => {
    // Helper function to apply consistent styling
    const setChipActive = (element: Element, isActive: boolean) => {
      if (isActive) {
        (element as HTMLElement).style.backgroundColor = '#008080';
        (element as HTMLElement).style.color = '#ffffff';
        const label = element.querySelector('.MuiChip-label');
        if (label) {
          (label as HTMLElement).style.color = '#ffffff';
        }
      } else {
        (element as HTMLElement).style.backgroundColor = '';
        (element as HTMLElement).style.color = '';
        const label = element.querySelector('.MuiChip-label');
        if (label) {
          (label as HTMLElement).style.color = '';
        }
      }
    };

    const tagChips = document.querySelectorAll('[data-filter-tag]');
    
    // Set initial state
    const allTagsChip = document.querySelector('[data-filter-tag="all"]');
    if (allTagsChip) {
      setChipActive(allTagsChip, activeTags.length === 0);
    }
    
    tagChips.forEach((chip) => {
      const tag = (chip as HTMLElement).getAttribute('data-filter-tag') as string;
      if (tag !== 'all') {
        setChipActive(chip, activeTags.includes(tag));
      }
    });
    
    tagChips.forEach((chip) => {
      chip.addEventListener('click', (e) => {
        const tag = (e.currentTarget as HTMLElement).getAttribute('data-filter-tag') as string;
        let updatedTags: string[] = [];
        
        if (tag === 'all') {
          // Reset all tag chips to default style
          tagChips.forEach((c) => {
            const tagValue = (c as HTMLElement).getAttribute('data-filter-tag');
            setChipActive(c, tagValue === 'all');
          });
          updatedTags = [];
        } else {
          // Toggle this tag's active state
          updatedTags = activeTags.includes(tag)
            ? activeTags.filter(t => t !== tag)
            : [...activeTags, tag];
            
          // Update All Tags chip
          if (allTagsChip) {
            setChipActive(allTagsChip, updatedTags.length === 0);
          }
          
          // Toggle this specific tag's visual state
          tagChips.forEach((c) => {
            const tagValue = (c as HTMLElement).getAttribute('data-filter-tag');
            if (tagValue !== 'all') {
              setChipActive(c, updatedTags.includes(tagValue || ''));
            }
          });
        }
        
        setActiveTags(updatedTags);
        setTimeout(() => applyFilters(activeContentType, updatedTags), 0);
      });
    });

    return () => {
      tagChips.forEach((chip) => {
        chip.removeEventListener('click', () => {});
      });
    };
  }, [activeContentType, activeTags, applyFilters]);

  // Find all the view mode buttons
  useEffect(() => {
    const viewModeButtons = document.querySelectorAll('[data-view-mode]');
    viewModeButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const mode = (e.currentTarget as HTMLElement).getAttribute('data-view-mode') as ViewMode;
        setViewMode(mode);
        applyViewMode(mode);
      });
    });

    return () => {
      viewModeButtons.forEach((button) => {
        button.removeEventListener('click', () => {});
      });
    };
  }, []);

  // Apply view mode (grid or list)
  const applyViewMode = (mode: ViewMode) => {
    // Update button UI
    const gridButton = document.querySelector('[data-view-mode="grid"]');
    const listButton = document.querySelector('[data-view-mode="list"]');
    
    if (gridButton) {
      (gridButton as HTMLElement).setAttribute('data-active', mode === 'grid' ? 'true' : 'false');
    }
    
    if (listButton) {
      (listButton as HTMLElement).setAttribute('data-active', mode === 'list' ? 'true' : 'false');
    }
    
    // Update the post grid container
    const postGrid = document.getElementById('post-grid');
    if (postGrid) {
      if (mode === 'grid') {
        postGrid.className = postGrid.className.replace('grid-list-view', 'grid-card-view');
      } else {
        postGrid.className = postGrid.className.replace('grid-card-view', 'grid-list-view');
      }
    }
    
    // Update the post cards
    const postCards = document.querySelectorAll('[data-post-card]');
    postCards.forEach((card) => {
      const element = card as HTMLElement;
      if (mode === 'grid') {
        element.className = element.className.replace('list-card', 'grid-card');
      } else {
        element.className = element.className.replace('grid-card', 'list-card');
      }
    });
  };

  // Initialize the component (run once after mount)
  useEffect(() => {
    // Set up the JS hooks for the page
    const contentTypeChips = document.querySelectorAll('[data-filter-content]');
    const tagChips = document.querySelectorAll('[data-filter-tag]');
    const viewModeButtons = document.querySelectorAll('[data-view-mode]');
    
    // Add the active state attributes
    contentTypeChips.forEach((chip) => {
      const type = (chip as HTMLElement).getAttribute('data-filter-content') as ContentType;
      (chip as HTMLElement).setAttribute('data-active', type === 'all' ? 'true' : 'false');
    });
    
    tagChips.forEach((chip) => {
      const tag = (chip as HTMLElement).getAttribute('data-filter-tag') as string;
      (chip as HTMLElement).setAttribute('data-active', tag === 'all' ? 'true' : 'false');
    });
    
    viewModeButtons.forEach((button) => {
      const mode = (button as HTMLElement).getAttribute('data-view-mode') as ViewMode;
      (button as HTMLElement).setAttribute('data-active', mode === 'grid' ? 'true' : 'false');
    });
    
    // Set up the CSS hooks
    document.documentElement.style.setProperty('--chip-primary-color', 'var(--mui-palette-primary-main)');
    document.documentElement.style.setProperty('--chip-text-color', 'var(--mui-palette-text-primary)');
    
    // Add a style element for our dynamic styles
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      /* Active chip styling - forceful override */
      .MuiChip-root[data-active="true"] {
        background-color: var(--mui-palette-primary-main) !important;
        color: #ffffff !important;
        border-color: var(--mui-palette-primary-main) !important;
      }
      
      .MuiChip-root[data-active="true"] .MuiChip-label {
        color: #ffffff !important;
      }
      
      .MuiChip-root[data-active="true"] svg {
        color: #ffffff !important;
      }
      
      /* Direct tag targeting for article filter chips */
      [data-filter-content="all"][data-active="true"],
      [data-filter-content="article"][data-active="true"],
      [data-filter-content="podcast"][data-active="true"] {
        background-color: #008080 !important; 
        color: #ffffff !important;
      }
      
      [data-filter-content="all"][data-active="true"] span,
      [data-filter-content="article"][data-active="true"] span,
      [data-filter-content="podcast"][data-active="true"] span {
        color: #ffffff !important;
      }
      
      /* Button styling */
      [data-active="true"][class*="MuiButton"] {
        background-color: var(--mui-palette-primary-main) !important;
        color: #ffffff !important;
      }
      
      .grid-card-view {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
      }
      
      @media (min-width: 600px) {
        .grid-card-view {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      
      @media (min-width: 900px) {
        .grid-card-view {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      
      .grid-list-view {
        display: grid;
        grid-template-columns: 1fr;
      }
      
      .grid-card {
        display: flex;
        flex-direction: column;
      }
      
      .list-card {
        display: flex;
        flex-direction: column;
      }
      
      @media (min-width: 600px) {
        .list-card {
          flex-direction: row;
        }
        
        .list-card-image {
          width: 240px;
          flex-shrink: 0;
        }
        
        .list-card-content {
          flex: 1;
        }
      }
    `;
    document.head.appendChild(styleElement);
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default BlogPageEnhancer;
