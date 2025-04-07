'use client';

import React from 'react';
import { Box, CircularProgress, Typography, alpha, useTheme } from '@mui/material';

export interface LoadingFallbackProps {
  /**
   * Custom message to display during loading
   */
  message?: string;
  
  /**
   * Whether to show a progress indicator
   */
  showProgress?: boolean;
}

/**
 * A reusable loading fallback component
 */
export const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  message = 'Loading visualization...',
  showProgress = true
}) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: alpha(theme.palette.background.paper, 0.7),
        backdropFilter: 'blur(8px)',
        p: 4,
        textAlign: 'center'
      }}
    >
      {showProgress && (
        <CircularProgress 
          size={60} 
          thickness={4} 
          sx={{ mb: 3 }} 
        />
      )}
      
      <Typography variant="h6" gutterBottom>
        {message}
      </Typography>
      
      <Typography variant="body2" color="text.secondary">
        Please wait while we prepare the data visualization
      </Typography>
    </Box>
  );
};
