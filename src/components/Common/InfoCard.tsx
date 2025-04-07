'use client';

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Box from '@mui/material/Box';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface InfoCardProps {
  title: string;
  excerpt: string;
  image?: string; 
  link: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, excerpt, image, link }) => {
  return (
    <Card component="article" sx={{ display: 'flex', flexDirection: 'column', height: '100%', boxShadow: 3 }}> 
      {image && ( 
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title} 
          sx={{ objectFit: 'cover' }}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {excerpt}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, mt: 'auto' }}> 
        <Link href={link} passHref>
          <Button 
            size="small" 
            variant="contained" 
            color="primary" 
            endIcon={<ArrowForwardIcon />}
            sx={{ textTransform: 'none' }} 
          >
            Learn More
          </Button>
        </Link>
      </Box>
    </Card>
  );
};

export default InfoCard;
