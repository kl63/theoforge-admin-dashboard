'use client';

import React from 'react';
import { Paper, IconButton, Tooltip, useTheme } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import HomeIcon from '@mui/icons-material/Home';
import PieChartIcon from '@mui/icons-material/PieChart';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import DownloadIcon from '@mui/icons-material/Download';

export interface GraphControlsProps {
  /**
   * Handler for zoom in action
   */
  onZoomIn: () => void;
  
  /**
   * Handler for zoom out action
   */
  onZoomOut: () => void;
  
  /**
   * Handler for reset view action
   */
  onReset: () => void;
  
  /**
   * Handler for toggling analytics panel
   */
  onToggleAnalytics: () => void;
  
  /**
   * Whether analytics panel is currently showing
   */
  showingAnalytics: boolean;
  
  /**
   * Handler for fullscreen toggle (optional)
   */
  onToggleFullscreen?: () => void;
  
  /**
   * Handler for download graph as image (optional)
   */
  onDownloadImage?: () => void;
  
  /**
   * Position of the controls panel
   */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

/**
 * Controls panel for graph visualization
 */
export const GraphControls: React.FC<GraphControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  onToggleAnalytics,
  showingAnalytics,
  onToggleFullscreen,
  onDownloadImage,
  position = 'bottom-left'
}) => {
  const theme = useTheme();
  
  // Determine position styles based on position prop
  const positionStyles = {
    'top-left': { top: 16, left: 16 },
    'top-right': { top: 16, right: 16 },
    'bottom-left': { bottom: 16, left: 16 },
    'bottom-right': { bottom: 16, right: 16 }
  };
  
  return (
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        padding: 1,
        borderRadius: 2,
        display: 'flex',
        gap: 1,
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(5px)',
        zIndex: 1000,
        ...positionStyles[position]
      }}
    >
      <Tooltip title="Zoom In">
        <IconButton onClick={onZoomIn} size="small">
          <ZoomInIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Zoom Out">
        <IconButton onClick={onZoomOut} size="small">
          <ZoomOutIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Reset View">
        <IconButton onClick={onReset} size="small">
          <HomeIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title={showingAnalytics ? "Hide Analytics" : "Show Analytics"}>
        <IconButton 
          onClick={onToggleAnalytics} 
          size="small"
          color={showingAnalytics ? "primary" : "default"}
        >
          <PieChartIcon />
        </IconButton>
      </Tooltip>
      
      {onToggleFullscreen && (
        <Tooltip title="Toggle Fullscreen">
          <IconButton onClick={onToggleFullscreen} size="small">
            <FullscreenIcon />
          </IconButton>
        </Tooltip>
      )}
      
      {onDownloadImage && (
        <Tooltip title="Download as Image">
          <IconButton onClick={onDownloadImage} size="small">
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      )}
    </Paper>
  );
};
