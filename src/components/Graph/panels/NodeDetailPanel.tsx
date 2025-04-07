'use client';

import React from 'react';
import { 
  Paper, 
  Box, 
  Typography, 
  IconButton, 
  Divider, 
  Chip,
  Link,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  useTheme 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
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
  
  /**
   * All nodes for connection lookup
   */
  allNodes?: GraphNode[];
  
  /**
   * All links for connection lookup
   */
  links?: Array<{ source: string | number; target: string | number; type?: string }>;
  
  /**
   * Top score for normalization
   */
  topScore?: number;
}

/**
 * Panel for displaying detailed information about a selected node
 */
export function NodeDetailPanel({
  node,
  onClose,
  position = 'right',
  width = 350,
  allNodes = [],
  links = [],
  topScore
}: NodeDetailPanelProps) {
  const theme = useTheme();
  
  // Determine position styles based on position prop
  const positionStyles = {
    'left': { left: 16 },
    'right': { right: 16 }
  };

  // Define type for connections
  interface Connection {
    node: GraphNode;
    type: string;
  }

  // Calculate connections for the selected node
  const connections: Connection[] = React.useMemo(() => {
    if (!node || !links || !allNodes) {
      console.log("Node, links, or allNodes not available for connections calculation.");
      return [];
    }
    
    const relatedLinks = links
      .filter(link => link.source === node.id || link.target === node.id)

    const connectionData = relatedLinks.map(link => {
        const connectedNodeId = link.source === node.id ? link.target : link.source;
        const connectedNode = allNodes.find(n => n.id === connectedNodeId);
        return { node: connectedNode, type: link.type ?? 'unknown' }; // Provide default type
      })
      .filter((conn): conn is Connection => conn.node !== undefined); // Type guard to filter out undefined nodes

    // console.log("Calculated Connections:", connectionData);
    return connectionData;
  }, [node, links, allNodes]);

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
        <Typography variant="h6" gutterBottom>
          {node?.name || 'Details'}
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Box sx={{ p: 2 }}>
        {/* Description */}
        {node?.description && (
          <>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">{node.description ?? ''}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
          </>
        )}

        {/* Wikipedia Link */}
        {node?.wikipediaUrl ? (
          <>
            <Link href={node.wikipediaUrl} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LaunchIcon fontSize="small" sx={{ mr: 1 }} /> Wikipedia
            </Link>
            <Divider sx={{ my: 2 }} />
          </>
        ) : null}

        {/* Influence Score */}
        {node?.influenceScore !== undefined ? (
          <>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>Influence Score:</Typography>
              <LinearProgress variant="determinate" value={(node.influenceScore / (topScore || 1)) * 100} />
              <Typography variant="caption" display="block" gutterBottom>
                {node.influenceScore.toFixed(2)} (Normalized)
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
          </>
        ) : null}

        {/* Era */}
        {node?.era ? (
          <>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Era:</Typography>
              <Typography variant="body2">{node.era}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
          </>
        ) : null}

        {/* Born/Died */}
        {node?.born || node?.died ? (
          <>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Life:</Typography>
              <Typography variant="body2">
                {node.born || 'N/A'} - {node.died || 'N/A'}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
          </>
        ) : null}

        {/* Schools */}
        {node?.schools && node.schools.length > 0 ? (
          <>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Schools/Affiliations:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {node.schools.map((school) => (
                  <Chip key={school} label={school} size="small" />
                ))}
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
          </>
        ) : null}

        {/* Connections List */}
        {connections.length > 0 ? (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Connections ({connections.length}):</Typography>
            <List dense disablePadding>
              {connections.map(({ node: connectedNode, type }: Connection) => (
                <ListItem key={connectedNode.id} disableGutters>
                  <ListItemText
                    primary={connectedNode.name}
                    secondary={`Relation: ${type}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ) : null}

        {/* Dynamic Properties */}
        <Box>
          {Object.entries(node || {})
            .filter(([key, value]) => 
                !['id', 'name', 'description', 'wikipediaUrl', 'influenceScore', 'era', 'born', 'died', 'schools', 'x', 'y', 'vx', 'vy', 'fx', 'fy', 'community', 'index', '__indexColor', '__viz'].includes(key) &&
                value !== undefined && value !== null && value !== '' && !(Array.isArray(value) && value.length === 0)
            )
            .map(([key, value]) => {
              const displayValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
              return (
                <Box key={key} sx={{ mb: 1 }}>
                  <Typography variant="caption" display="block" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}: {/* Format key */}
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                    {displayValue} {/* Render stringified or original value */}
                  </Typography>
                </Box>
              );
            })
            .filter(Boolean)}
        </Box>
      </Box>
    </Paper>
  );
}
