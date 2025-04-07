'use client';

import React, { useMemo } from 'react';
import { 
  Paper, 
  Box, 
  Typography, 
  IconButton, 
  Divider,
  LinearProgress,
  useTheme 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { GraphData, GraphNode, GraphLink } from '../../../types/graph';

export interface AnalyticsPanelProps<
  NodeType extends GraphNode = GraphNode, 
  LinkType extends GraphLink = GraphLink
> {
  /**
   * The graph data to analyze
   */
  data: GraphData<NodeType, LinkType>;
  
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
 * Panel for displaying analytics about the graph
 */
export function AnalyticsPanel<
  NodeType extends GraphNode = GraphNode, 
  LinkType extends GraphLink = GraphLink
>({
  data,
  onClose,
  position = 'left',
  width = 350
}: AnalyticsPanelProps<NodeType, LinkType>) {
  const theme = useTheme();
  
  // Determine position styles based on position prop
  const positionStyles = {
    'left': { left: 16 },
    'right': { right: 16 }
  };
  
  // Calculate basic network statistics
  const stats = useMemo(() => {
    const nodeCount = data.nodes.length;
    const linkCount = data.links.length;
    const density = nodeCount > 1 ? (2 * linkCount) / (nodeCount * (nodeCount - 1)) : 0;
    
    // Calculate degree for each node
    const nodeDegrees = data.nodes.map(node => {
      const nodeId = node.id;
      const connections = data.links.filter(link => 
        (link.source === nodeId || 
         (typeof link.source === 'object' && link.source.id === nodeId)) || 
        (link.target === nodeId || 
         (typeof link.target === 'object' && link.target.id === nodeId))
      );
      return {
        id: nodeId,
        name: node.name || String(nodeId),
        degree: connections.length
      };
    });
    
    // Sort nodes by degree
    const topConnectedNodes = [...nodeDegrees]
      .sort((a, b) => b.degree - a.degree)
      .slice(0, 5);
    
    // Find communities if available
    const communities: Record<string, number> = {};
    data.nodes.forEach(node => {
      if ('community' in node) {
        const communityId = String(node.community);
        communities[communityId] = (communities[communityId] || 0) + 1;
      }
    });
    
    // Find relation types if available
    const relationTypes: Record<string, number> = {};
    data.links.forEach(link => {
      if ('relation' in link) {
        const relationType = String(link.relation || 'default');
        relationTypes[relationType] = (relationTypes[relationType] || 0) + 1;
      }
    });
    
    return {
      nodeCount,
      linkCount,
      density,
      topConnectedNodes,
      communities,
      relationTypes
    };
  }, [data]);
  
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
          Network Analytics
        </Typography>
        <IconButton onClick={onClose} size="small" edge="end">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Box sx={{ p: 2 }}>
        {/* Basic Statistics */}
        <Typography variant="subtitle1" gutterBottom>
          Basic Statistics
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Nodes:</strong> {stats.nodeCount}
          </Typography>
          <Typography variant="body2">
            <strong>Connections:</strong> {stats.linkCount}
          </Typography>
          <Typography variant="body2">
            <strong>Network Density:</strong> {stats.density.toFixed(3)}
          </Typography>
        </Box>
        
        {/* Top Connected Nodes */}
        <Typography variant="subtitle1" gutterBottom>
          Most Connected Nodes
        </Typography>
        <Box sx={{ mb: 3 }}>
          {stats.topConnectedNodes.map((node, index) => (
            <Box key={node.id} sx={{ mb: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2">
                  {index + 1}. {node.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {node.degree} connections
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(node.degree / stats.topConnectedNodes[0].degree) * 100}
                sx={{ height: 6, borderRadius: 1 }}
              />
            </Box>
          ))}
        </Box>
        
        {/* Communities */}
        {Object.keys(stats.communities).length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Community Distribution
            </Typography>
            <Box sx={{ mb: 3 }}>
              {Object.entries(stats.communities)
                .sort((a, b) => b[1] - a[1])
                .map(([communityId, count]) => (
                  <Box key={communityId} sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">
                        Community {communityId}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {count} nodes
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(count / stats.nodeCount) * 100}
                      sx={{ height: 6, borderRadius: 1 }}
                    />
                  </Box>
                ))}
            </Box>
          </>
        )}
        
        {/* Relation Types */}
        {Object.keys(stats.relationTypes).length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Relation Types
            </Typography>
            <Box sx={{ mb: 3 }}>
              {Object.entries(stats.relationTypes)
                .sort((a, b) => b[1] - a[1])
                .map(([relationType, count]) => (
                  <Box key={relationType} sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">
                        {relationType.charAt(0).toUpperCase() + relationType.slice(1)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {count} connections
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(count / stats.linkCount) * 100}
                      sx={{ height: 6, borderRadius: 1 }}
                    />
                  </Box>
                ))}
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
}
