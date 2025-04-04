// src/components/Blog/AudioPlayerOverlay.tsx
"use client";

import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReplayIcon from '@mui/icons-material/Replay'; // For replay/restart
import { CircularProgress } from '@mui/material';
import Image from 'next/image';

interface AudioPlayerOverlayProps {
  audioUrl: string;
  imageUrl: string;
}

export default function AudioPlayerOverlay({ audioUrl, imageUrl }: AudioPlayerOverlayProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // To show loading state
  const [isEnded, setIsEnded] = useState(false); // Track if audio finished
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isEnded) { // If ended, restart playback
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setIsPlaying(true);
        setIsEnded(false);
    } else if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true); // Show loading indicator
      audioRef.current.play().then(() => {
          setIsPlaying(true);
          setIsLoading(false);
      }).catch((error) => {
          console.error("Error playing audio:", error);
          setIsLoading(false); // Hide loading on error
      });
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  }

  const handleCanPlay = () => {
     // Only stop loading if we aren't already playing (prevents flicker on seek/restart)
    if (!isPlaying) {
       setIsLoading(false);
    }
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        overflow: 'hidden'
      }}
    >
      {/* Background Image */}
      <Image 
        src={imageUrl} 
        alt="Audio content" 
        fill 
        priority
        style={{ 
          objectFit: 'cover',
          objectPosition: 'center top'
        }}
        sizes="(max-width: 960px) 100vw, 960px"
      />

      {/* Dark overlay for better button visibility */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1,
        }}
      />

      <audio
        ref={audioRef}
        src={audioUrl}
        onPlay={() => {setIsPlaying(true); setIsLoading(false); setIsEnded(false);}}
        onPause={() => setIsPlaying(false)}
        onEnded={handleEnded}
        onWaiting={() => setIsLoading(true)} // Show loading when buffering
        onCanPlay={handleCanPlay}
        onLoadStart={handleLoadStart}
        preload="metadata" // Preload only metadata initially
        style={{ display: 'none' }} // Hide the default audio controls
      />
      
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2, // Above the dark overlay
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton
          onClick={togglePlayPause}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            },
            boxShadow: 3,
            p: { xs: 2, sm: 3 }, // Larger touch target
          }}
          aria-label={isPlaying ? 'Pause' : isEnded ? 'Replay' : 'Play'}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="primary" />
          ) : isPlaying ? (
            <PauseIcon fontSize="large" />
          ) : isEnded ? (
            <ReplayIcon fontSize="large" />
          ) : (
            <PlayArrowIcon fontSize="large" />
          )}
        </IconButton>
      </Box>
    </Box>
  );
}
