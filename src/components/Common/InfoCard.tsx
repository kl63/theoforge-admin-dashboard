'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BaseCard from './BaseCard';

interface InfoCardProps {
  title: string;
  excerpt: string;
  image?: string;
  link: string;
  priorityImage?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, excerpt, image, link, priorityImage }) => {
  return (
    <BaseCard>
      {image && (
        // Explicit height added to potentially fix Next/Image fill warning
        <div 
          className="relative w-full overflow-hidden"
          style={{ height: '12rem' }}
        >
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 640px) 100vw, 50vw"
            priority={priorityImage}
          />
        </div>
      )}
      {/* Add fixed height, allow overflow scrolling */}
      <div className="p-4 flex-grow flex flex-col h-48 overflow-y-auto"> 
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {title}
        </h3>
        {/* Remove flex-grow from paragraph */}
        <p className="text-gray-600 dark:text-gray-300">
          {excerpt}
        </p>
        {/* Add sticky positioning or ensure button is always visible */}
        <div className="mt-auto pt-4"> {/* Use mt-auto to push button down */} 
          <Link href={link} legacyBehavior passHref>
            <a
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-150"
            >
              Learn More
              <span className="ml-1">→</span>
            </a>
          </Link>
        </div>
      </div>
    </BaseCard>
  );
};

export default InfoCard;
