'use client';

import React from 'react';
import { 
  Paper, 
  Box, 
  Typography, 
  IconButton, 
  Divider, 
  Chip,
  useTheme 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { GraphNode } from '../../../types/graph';

export interface NodeDetailPanelProps {
  /**
   * The node to display details for
   */
  node: GraphNode | null;
  
  /**
   * Handler for closing the panel
   */
  onClose: () => void;
  
  /**
   * Position of the panel
   */
  position?: 'left' | 'right';
  
  /**
   * Width of the panel
   */
  width?: number | string;
}

/**
 * Panel for displaying detailed information about a selected node
 */
export function NodeDetailPanel({
  node,
  onClose,
  position = 'right',
  width = 350
}: NodeDetailPanelProps) {
  const theme = useTheme();
  
  // Determine position styles based on position prop
  const positionStyles = {
    'left': { left: 16 },
    'right': { right: 16 }
  };

  // Helper function to render different types of node properties
  const renderNodeProperty = (key: string, value: unknown) => {
    // Skip rendering certain properties
    const skipProperties = ['id', 'name', 'x', 'y', 'size', 'description', 'color', 'index', 'vx', 'vy', 'fx', 'fy'];
    if (skipProperties.includes(key)) return null;
    
    // Handle different value types
    if (value === null || value === undefined) return null;
    
    if (Array.isArray(value)) {
      return (
        <Box key={key} sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
          </Typography>
          {value.length === 0 ? (
            <Typography variant="body2" color="text.secondary">None</Typography>
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {value.map((item, index) => (
                <Chip 
                  key={index} 
                  label={typeof item === 'object' ? JSON.stringify(item) : String(item)} 
                  size="small" 
                  variant="outlined"
                />
              ))}
            </Box>
          )}
        </Box>
      );
    }
    
    if (typeof value === 'object') {
      return (
        <Box key={key} sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
          </Typography>
          <Box sx={{ pl: 2 }}>
            {Object.entries(value).map(([subKey, subValue]) => (
              <Typography key={subKey} variant="body2">
                <strong>{subKey}:</strong> {String(subValue)}
              </Typography>
            ))}
          </Box>
        </Box>
      );
    }
    
    return (
      <Box key={key} sx={{ mb: 1 }}>
        <Typography variant="subtitle2" component="span">
          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
        </Typography>{' '}
        <Typography variant="body2" component="span">
          {String(value)}
        </Typography>
      </Box>
    );
  };
  
  return (
    <Paper
      elevation={4}
      sx={{
        position: 'absolute',
        top: 80,
        width,
        maxWidth: '90vw',
        maxHeight: 'calc(100vh - 100px)',
        overflow: 'auto',
        borderRadius: 2,
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        zIndex: 1100,
        transition: 'all 0.3s ease',
        ...positionStyles[position]
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 2,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <Typography variant="h6" component="h2">
          {node?.name || node?.id}
        </Typography>
        <IconButton onClick={onClose} size="small" edge="end">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Box sx={{ p: 2 }}>
        {/* Description */}
        {node?.description && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">
              {node.description}
            </Typography>
          </Box>
        )}
        
        <Divider sx={{ my: 2 }} />
        
        {/* Dynamic Properties */}
        <Box>
          {Object.entries(node || {})
            .map(([key, value]) => renderNodeProperty(key, value))
            .filter(Boolean)}
        </Box>
        
        {/* Contributions */}
        {node?.contributions && Array.isArray(node.contributions) ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Contributions:
            </Typography>
            <Box component="ul" sx={{ pl: 2, mt: 0 }}>
              {node.contributions.map((contribution: string, index: number) => (
                <Typography component="li" variant="body2" key={index}>
                  {contribution}
                </Typography>
              ))}
            </Box>
          </Box>
        ) : null}
      </Box>
    </Paper>
  );
}
