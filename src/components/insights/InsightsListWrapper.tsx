'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Next.js Image component
import { PostData } from '@/types/post';
import Heading from '@/components/Common/Heading';
import Paragraph from '@/components/Common/Paragraph';
import Button from '@/components/Common/Button';
import { Tag } from '@/components/Common/Tag';
import { ViewGridIcon, ListBulletIcon } from '@radix-ui/react-icons';

// Export types so they can be imported by BlogClientUI
export type ContentType = 'all' | 'article' | 'podcast';
export type ViewMode = 'grid' | 'list';

interface InsightsListWrapperProps {
  allPostsData: PostData[];
  pageTitle?: string;
  pageSubtitle?: string;
}

const InsightCard: React.FC<{ post: PostData; viewMode: ViewMode }> = ({ post, viewMode }) => (
  <div className={`border border-border rounded-lg overflow-hidden ${viewMode === 'list' ? 'mb-4 flex flex-col' : 'flex flex-col'}`}>
    {post.image && (
      <div className="relative w-full aspect-video"> 
        <Image 
          src={post.image}
          alt={post.title}
          layout="fill" 
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    )}
    <div className="p-4 flex flex-col flex-grow">
      <Heading level={3} className="text-lg font-semibold mb-2">{post.title}</Heading>
      <Paragraph className="text-sm text-muted-foreground mb-2 flex-grow">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} {post.isPodcast && ' (Podcast)'}</Paragraph>
      <div className="flex flex-wrap gap-1 mt-auto pt-2"> {/* Use mt-auto to push tags down */} 
        {post.tags?.map(tag => <Tag key={tag} text={tag} />)}
      </div>
      {/* Add excerpt or link later */}
    </div>
  </div>
);

const FeaturedInsightCard: React.FC<{ post: PostData }> = ({ post }) => (
  <div className="border-2 border-primary rounded-lg p-6 mb-8 bg-primary/5 overflow-hidden">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      {/* Image Column (Conditional) */} 
      {post.image && (
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image 
            src={post.image}
            alt={post.title}
            layout="fill" 
            objectFit="cover"
          />
        </div>
      )}
      {/* Text Content Column - Spans full width if no image */} 
      <div className={`${post.image ? '' : 'md:col-span-2'}`}> 
        <span className="text-xs font-medium uppercase text-primary mb-2 block">Featured Insight</span>
        <Heading level={2} className="text-2xl font-bold mb-3">{post.title}</Heading>
        <Paragraph className="text-muted-foreground mb-4">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} {post.isPodcast && ' (Podcast)'}</Paragraph>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags?.map(tag => <Tag key={tag} text={tag} />)}
        </div>
        <Button href={`/insights/${post.slug}`} variant="primary" size="sm">Read More</Button>
      </div>
    </div>
  </div>
);

const InsightsListWrapper: React.FC<InsightsListWrapperProps> = ({
  allPostsData,
  pageTitle,
  pageSubtitle
}) => {
  const [activeContentType, setActiveContentType] = useState<ContentType>('all');
  const [activeTag, setActiveTag] = useState<string>(''); 
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filteredInsights, setFilteredInsights] = useState<PostData[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    if (!allPostsData) {
      setFilteredInsights([]); 
      setAllTags([]);
      return; 
    }

    const tagsSet = new Set<string>();
    allPostsData.forEach(post => post.tags?.forEach(tag => tagsSet.add(tag)));
    setAllTags(Array.from(tagsSet).sort());

    let result = allPostsData;

    if (activeContentType !== 'all') {
      result = result.filter(post => {
        if (activeContentType === 'podcast') return post.isPodcast;
        if (activeContentType === 'article') return !post.isPodcast;
        return true;
      });
    }

    if (activeTag) {
      result = result.filter(post =>
        post.tags && post.tags.includes(activeTag)
      );
    }

    setFilteredInsights(result);
  }, [activeContentType, activeTag, allPostsData]); 

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveTag(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {pageTitle && <Heading level={1} className="text-3xl md:text-4xl font-bold text-center mb-2">{pageTitle}</Heading>}
      {pageSubtitle && <Paragraph className="text-lg md:text-xl text-muted-foreground text-center mb-8 md:mb-12 max-w-3xl mx-auto">{pageSubtitle}</Paragraph>}

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 md:mb-8 gap-4">
        <div className="flex gap-2 flex-wrap justify-center">
          {(['all', 'article', 'podcast'] as ContentType[]).map(type => (
            <Button
              key={type}
              variant={activeContentType === type ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setActiveContentType(type)}
              className="capitalize"
            >
              {type}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2 justify-center sm:justify-end flex-grow">
          {allTags.length > 0 && (
            <div className="relative">
              <select
                value={activeTag}
                onChange={handleTagChange}
                className="appearance-none bg-background border border-border rounded-md py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              >
                <option value="">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          )}
          <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('grid')} aria-label="Grid View">
            <ViewGridIcon className="h-5 w-5" />
          </Button>
          <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')} aria-label="List View">
            <ListBulletIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {filteredInsights.length > 0 && activeContentType === 'all' && activeTag === '' && (
        <FeaturedInsightCard post={filteredInsights[0]} />
      )}

      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8' : ''}>
        {filteredInsights.length > 0 ? (
          filteredInsights
            .slice(activeContentType === 'all' && activeTag === '' ? 1 : 0)
            .map((post) => (
              <InsightCard key={post.slug} post={post} viewMode={viewMode} />
            ))
        ) : (
          <Paragraph className="text-center col-span-full">No insights match your current filters.</Paragraph>
        )}
      </div>
    </div>
  );
};

export default InsightsListWrapper;
