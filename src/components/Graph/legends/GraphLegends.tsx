'use client';

import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { CommunityInfo, RelationInfo } from '../../../types/graph';

export interface GraphLegendsProps {
  /**
   * Theme object for styling
   */
  theme: Theme;
  
  /**
   * Community information for legend display
   */
  communities?: CommunityInfo[];
  
  /**
   * Relation type information for legend display
   */
  relations?: RelationInfo[];
  
  /**
   * Position of the legends panel
   */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

/**
 * Default relation types for legend
 */
const DEFAULT_RELATIONS: RelationInfo[] = [
  { type: 'default', name: 'Connection', color: '#aaaaaa' }
];

/**
 * Legends panel for graph visualization
 */
export const GraphLegends: React.FC<GraphLegendsProps> = ({
  theme,
  communities = [],
  relations = DEFAULT_RELATIONS,
  position = 'top-right'
}) => {
  // Determine position styles based on position prop
  const positionStyles = {
    'top-left': { top: 16, left: 16 },
    'top-right': { top: 80, right: 16 }, // Positioned below header
    'bottom-left': { bottom: 16, left: 16 },
    'bottom-right': { bottom: 16, right: 16 }
  };
  
  // Only render if there are communities or relations to display
  if (communities.length === 0 && relations.length === 0) {
    return null;
  }
  
  return (
    <Box>
      {/* Community Legend */}
      {communities.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            padding: 2,
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(5px)',
            zIndex: 1000,
            maxWidth: 250,
            ...positionStyles[position]
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            Groups
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {communities.map(community => (
              <Box key={community.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box 
                  sx={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: '50%', 
                    backgroundColor: community.color || theme.palette.primary.main, 
                    mr: 1 
                  }} 
                />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{community.name}</Typography>
                  {community.description && (
                    <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                      {community.description}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      )}
      
      {/* Relation Legend */}
      {relations.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            padding: 2,
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(5px)',
            zIndex: 1000,
            bottom: 16,
            right: 16
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            Connection Types
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {relations.map(relation => (
              <Box key={relation.type} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box 
                  sx={{ 
                    width: 20, 
                    height: 2, 
                    backgroundColor: relation.color || theme.palette.primary.main 
                  }} 
                />
                <Typography variant="body2">{relation.name}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};
