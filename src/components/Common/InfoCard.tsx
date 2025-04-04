'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';

interface InfoCardProps {
  title: string;
  excerpt: string;
  image?: string;
  link: string;
}

// Use a default placeholder image path
const DEFAULT_IMAGE = '/images/placeholder.png';

const InfoCard: React.FC<InfoCardProps> = ({ title, excerpt, image, link }) => {
  const displayImage = image || DEFAULT_IMAGE; // Use provided image or default

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardActionArea component={Link} href={link} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Image Section */}
        <Box sx={{ position: 'relative', width: '100%', pt: '56.25%' }}> {/* 16:9 Aspect Ratio */}
          <Image
            src={displayImage} // Use the determined image source
            alt={`${title} image`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" // Consistent sizes
          />
        </Box>
        {/* Content Section */}
        <CardContent sx={{ p: 2, flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'medium' }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {excerpt}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* Optional: Add CardActions back if needed, e.g., for a separate button */}
    </Card>
  );
};

export default InfoCard;
