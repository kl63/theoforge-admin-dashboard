'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PersonIcon from '@mui/icons-material/Person';

interface PodcastMetadataProps {
  episodeNumber?: number;
  duration?: string;
  releaseDate: string;
  host?: string;
  guest?: string;
}

export default function PodcastMetadata({
  episodeNumber,
  duration,
  releaseDate,
  host = "TheoForge Team",
  guest
}: PodcastMetadataProps) {
  const formattedDate = new Date(releaseDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 3,
        bgcolor: 'grey.50',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        mb: 4,
        maxWidth: '100%',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <PodcastsIcon sx={{ color: 'primary.main' }} />
        <Typography variant="h6" component="h3" sx={{ fontWeight: 'medium' }}>
          TheoForge Insights {episodeNumber ? `- Episode ${episodeNumber}` : ''}
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, md: 3 } }}>
        {duration && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTimeIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {duration}
            </Typography>
          </Box>
        )}
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <DateRangeIcon fontSize="small" sx={{ color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {formattedDate}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <PersonIcon fontSize="small" sx={{ color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {guest ? `Host: ${host} • Guest: ${guest}` : `Host: ${host}`}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ 
        mt: 1,
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1
      }}>
        <Chip 
          label="Listen on Spotify" 
          component="a"
          href="#"
          clickable
          size="small"
          sx={{ borderRadius: 1 }}
        />
        <Chip 
          label="Apple Podcasts" 
          component="a"
          href="#"
          clickable
          size="small"
          sx={{ borderRadius: 1 }}
        />
        <Chip 
          label="Google Podcasts" 
          component="a"
          href="#"
          clickable
          size="small"
          sx={{ borderRadius: 1 }}
        />
        <Chip 
          label="RSS Feed" 
          component="a"
          href="#"
          clickable
          size="small"
          sx={{ borderRadius: 1 }}
        />
      </Box>
    </Box>
  );
}
