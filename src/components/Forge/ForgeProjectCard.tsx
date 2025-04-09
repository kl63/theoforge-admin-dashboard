// src/components/Forge/ForgeProjectCard.tsx
import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import BaseCard from '../Common/BaseCard';
import Button from '../Common/Button';
import JdenticonIcon from '../Common/JdenticonIcon';
import Heading from '../Common/Heading';
import Paragraph from '../Common/Paragraph';
import { ForgeProjectData } from '@/lib/forgeUtils';
import { FaGithub, FaArrowUpRightFromSquare } from 'react-icons/fa6'; // Icons for links

interface ForgeProjectCardProps {
  project: ForgeProjectData;
}

const ForgeProjectCard: React.FC<ForgeProjectCardProps> = ({ project }) => {
  const { 
    id, 
    title, 
    content, 
    image, 
    tags, 
    githubUrl, 
    tryUrl, 
    status 
  } = project;

  const isComingSoon = status === 'Coming Soon';

  return (
    <BaseCard key={id} className="flex flex-col h-full"> 
      {/* Inner wrapper for consistent padding */} 
      <div className="p-6 flex-grow flex flex-col"> 
        {/* Image */} 
        {image ? (
          <div className="w-full mb-4 rounded overflow-hidden"> 
            <Image
              src={image}
              alt={`${title} preview`}
              width={320}
              height={180}
              className="w-full h-auto object-cover bg-muted dark:bg-muted-dark"
            />
          </div>
        ) : (
          <div className="w-full aspect-video mb-4 bg-muted dark:bg-muted-dark rounded flex items-center justify-center"> 
            <JdenticonIcon value={title} size={40} />
          </div>
        )}

        {/* Title */} 
        <Heading level={4} className="mb-4 text-foreground dark:text-foreground-dark"> 
          {title}
        </Heading>

        {/* Description */} 
        <Paragraph variant="body1" className="text-muted-foreground dark:text-muted-foreground-dark mb-4 flex-grow"> 
          {content}
        </Paragraph>

        {/* Tags */} 
        {tags && tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2"> 
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-primary-100 text-primary-800 text-xs font-medium rounded-full dark:bg-primary-900 dark:text-primary-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Status Badge */} 
        {status && (
            <div className="mb-4"> 
              <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${ 
                isComingSoon 
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' 
                  : 'bg-muted text-muted-foreground dark:bg-muted-dark dark:text-muted-foreground-dark'
              }`}>
                {status}
              </span>
            </div>
        )}
        
        {/* Buttons */} 
        <div className="mt-auto pt-6 flex flex-wrap gap-4"> 
          {githubUrl && (
            <Button href={githubUrl} variant="outline" size="sm" leftIcon={<FaGithub />} target="_blank" rel="noopener noreferrer">
              GitHub
            </Button>
          )}
          {tryUrl && (
            <Button href={tryUrl} variant="secondary" size="sm" leftIcon={<FaArrowUpRightFromSquare />} target="_blank" rel="noopener noreferrer" disabled={isComingSoon}>
              {isComingSoon ? 'Coming Soon' : 'Try It'}
            </Button>
          )}
        </div>
      </div> 
    </BaseCard>
  );
};

export default ForgeProjectCard;
