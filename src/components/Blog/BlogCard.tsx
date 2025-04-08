'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PostData } from '@/types/post';
import { ViewMode } from './BlogInteractivityWrapper';
import BaseCard from '../Common/BaseCard';

interface BlogCardProps {
  post: PostData;
  viewMode?: ViewMode; // Made optional
  index?: number;      // Add index prop
  currentPage?: number; // Add currentPage prop
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index, currentPage /*, viewMode*/ }) => { // Accept index and currentPage
  const linkHref = `/blog/${post.slug}`;

  // --- "New" Badge Logic ---
  const isNew = (() => {
    if (!post.date) return false; // Can't determine if no date
    try {
      const postDate = new Date(post.date);
      const today = new Date();
      const timeDiff = today.getTime() - postDate.getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24); // Difference in days
      return daysDiff <= 7; // Consider posts within the last 7 days as "New"
    } catch (error) {
      console.error("Error parsing date for blog card:", post.date, error);
      return false;
    }
  })();
  // ------------------------

  return (
    // Use BaseCard, pass specific classes via className prop
    <BaseCard className="relative group hover:shadow-lg w-full"> 
      {isNew && (
        // Replaced Chip with span
        <span 
          className="absolute bottom-2 right-2 z-10 bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded"
        >
          New
        </span>
      )}
      {/* Replaced CardActionArea with Link (a tag) */}
      <Link 
        href={linkHref}
        className="no-underline text-inherit flex flex-col flex-grow"
      >
        {/* Image container: Replaced Box with div */}
        <div 
          className={`relative overflow-hidden w-full`}
          style={{ height: '12rem' }}
        > 
          {post.image ? (
            // Replaced CardMedia with Image, added group-hover for scale effect
            <Image
              src={post.image || '/images/default-blog-banner.jpg'} // Ensure default
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }} // Use style prop for objectFit with fill
              sizes="(max-width: 640px) 100vw, 50vw" // Adjust sizes as needed
              className="transition-transform duration-300 ease-in-out group-hover:scale-105"
              priority={index === 0 && currentPage === 1} // Update priority condition
            />
          ) : (
            // Placeholder: Replaced Box with div
            <div className={`12rem bg-gray-100 flex items-center justify-center`}>
              {/* Replaced Typography with p */}
              <p className="text-xs text-gray-500">
                Image Coming Soon
              </p>
            </div>
          )}
        </div>
        {/* Replaced CardContent with div */}
        <div className="flex-grow w-full p-4 flex flex-col"> 
          {/* Replaced Typography with h2 */}
          <h2 className="text-lg font-bold mb-1">
            {post.title}
          </h2>
          {/* Replaced Typography with p */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Tags Section */}
          {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
            // Replaced Box with div, mt-auto to push to bottom within flex container
            <div className="mt-auto mb-4"> 
              {/* Replaced Stack with div using flex */}
              <div className="flex flex-row flex-wrap gap-1">
                {post.tags.slice(0, 3).map((tag) => ( 
                  // Replaced Chip with span
                  <span key={tag} className="px-2 py-0.5 border border-gray-300 rounded text-xs text-gray-700 bg-gray-50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Link> 
      {/* Metadata Footer: Replaced Box with div */}
      <div 
        className="p-4 pt-0 mt-auto border-t border-gray-200 bg-gray-50"
      >
        {/* Replaced Box with div */}
        <div className="flex items-center gap-1">
          {/* Replaced Typography with p */}
          <p className="text-xs text-gray-500 flex-grow"> 
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })} 
            {post.readingTime ? ` • ${post.readingTime}` : ''} 
          </p>
        </div>
      </div>
    </BaseCard>
  );
};

export default BlogCard;
