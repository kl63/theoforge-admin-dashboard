'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BaseCard from './BaseCard';
import Button from './Button';
import Heading from './Heading';
import Paragraph from './Paragraph';

interface InfoCardProps {
  title: string;
  excerpt: string;
  image?: string;
  link: string;
  priorityImage?: boolean;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ 
  title, 
  excerpt, 
  image, 
  link, 
  priorityImage, 
  className 
}) => {
  return (
    <BaseCard className={className}> 
      {image && (
        <div className="relative w-full mb-6 overflow-hidden rounded-lg aspect-video"> 
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover bg-muted" 
            priority={priorityImage}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      {/* Use standard padding: p-6 (24px) */}
      <div className="p-6 flex-grow flex flex-col"> 
        <Heading level={5} className="mb-4"> 
          {title}
        </Heading>
        <Paragraph variant="body2" className="mb-4"> {/* Paragraph margin: standard mb-4 (16px) */}
          {excerpt}
        </Paragraph>
        <div className="mt-auto pt-0"> 
          <Button href={link} variant="outline" size="sm" rightIcon={<span className="ml-1">→</span>}>
            Learn More
          </Button>
        </div>
      </div>
    </BaseCard>
  );
};

export default InfoCard;
