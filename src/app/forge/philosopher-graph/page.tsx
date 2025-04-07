'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Box, Typography, useTheme, Paper, Chip, FormControlLabel, Switch, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import BarChartIcon from '@mui/icons-material/BarChart';
import { PhilosopherData, GraphNode } from '@/components/Graph/EnterprisePhilosopherGraph';
import { NodeObject, ForceGraphMethods } from 'react-force-graph-2d';
import { GraphControls } from '@/components/Graph/controls/GraphControls';
import SearchBar from '@/components/Graph/controls/SearchBar';
import AnalyticsModal from '@/components/Graph/analytics/AnalyticsModal';
import dynamic from 'next/dynamic';

// Dynamically import the graph component to avoid SSR issues
const DynamicPhilosopherGraph = dynamic(
  () => import('@/components/Graph/EnterprisePhilosopherGraph'),
  { ssr: false }
);

// Define the page component
const PhilosopherGraphPage: React.FC = () => {
  // Theme and dimensions
  const theme = useTheme();
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });
  
  // Graph data state
  const [graphData, setGraphData] = useState<PhilosopherData>({ nodes: [], links: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // UI state
  const [showAnalytics, setShowAnalytics] = useState<boolean>(false);
  const [physicsEnabled, setPhysicsEnabled] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  
  // Filtering state
  const [activeEras, setActiveEras] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Create a reference to the graph component
  const graphRef = useRef<ForceGraphMethods | null>(null);
  
  // Fetch data on initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Add cache-busting parameter to prevent browser caching
        const cacheBuster = `?t=${Date.now()}`;
        const response = await fetch(`/data/philosophers.json${cacheBuster}`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          },
          credentials: 'same-origin'
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log(`Loaded ${data.nodes.length} philosophers and ${data.links.length} connections`);
        
        // Reset filters
        setActiveEras([]);
        setSearchQuery('');
        
        // Set the graph data
        setGraphData(data);
        setLoading(false);
      } catch (err) {
        const error = err as Error;
        console.error("Error fetching data:", error);
        setError(`Failed to load philosopher data. Please try again. (${error?.message || 'Unknown error'})`);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Filter graph data based on active eras and search query
  const filteredData = useMemo(() => {
    // If no data yet, return empty structure
    if (!graphData || !graphData.nodes || graphData.nodes.length === 0) {
      console.log("No graph data available for filtering");
      return { nodes: [], links: [] };
    }
    
    console.log(`Filtering data with ${activeEras.length} active eras and search: "${searchQuery}"`);
    
    // If no active filters, return all data
    if (activeEras.length === 0 && searchQuery === '') {
      console.log(`Returning all data: ${graphData.nodes.length} nodes and ${graphData.links.length} links`);
      return graphData;
    }
    
    // Filter nodes by era and search query
    const filteredNodes = graphData.nodes.filter(node => 
      (activeEras.length === 0 || activeEras.includes(node.era)) && 
      (searchQuery === '' || node.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    console.log(`Filtered to ${filteredNodes.length} nodes`);
    
    // Get set of filtered node IDs for quick lookup
    const nodeIds = new Set(filteredNodes.map(node => node.id));
    
    // Filter links that connect filtered nodes
    const filteredLinks = graphData.links.filter(link => {
      // Handle both string and object references
      let sourceId: string;
      let targetId: string;
      
      if (typeof link.source === 'object' && link.source !== null) {
        // Cast to NodeObject to access id
        sourceId = (link.source as NodeObject).id as string;
      } else {
        sourceId = link.source as string;
      }
      
      if (typeof link.target === 'object' && link.target !== null) {
        // Cast to NodeObject to access id
        targetId = (link.target as NodeObject).id as string;
      } else {
        targetId = link.target as string;
      }
      
      return nodeIds.has(sourceId) && nodeIds.has(targetId);
    });
    
    console.log(`Filtered to ${filteredLinks.length} links`);
    
    return { nodes: filteredNodes, links: filteredLinks };
  }, [graphData, activeEras, searchQuery]);
  
  // Handle era filter toggle
  const handleEraFilter = (era: string) => {
    console.log(`Toggling era filter for: ${era}`);
    setActiveEras(prev => {
      const newEras = prev.includes(era) 
        ? prev.filter(e => e !== era) 
        : [...prev, era];
      console.log(`New active eras: ${newEras.join(', ')}`);
      return newEras;
    });
  };
  
  // Handle search query change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  
  // Handle node selection from search
  const handleNodeSelect = (node: GraphNode | null) => {
    if (node && graphRef.current) {
      console.log(`Selected node: ${node.name}`);
      // Center view on the selected node
      graphRef.current.centerAt(node.x, node.y, 500); // Center with animation
      graphRef.current.zoom(2, 500); // Zoom in with animation
    } else {
      console.log("Node selection cleared or graphRef not available.");
    }
  };
  
  // Create searchable nodes
  const searchableNodes = useMemo(() => {
    return graphData.nodes as GraphNode[];
  }, [graphData.nodes]);
  
  // Handle zoom controls
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
    // Add null check
    if (graphRef.current) {
      try {
        // Get current zoom and increase it
        const currentZoomLevel = graphRef.current.zoom(); // Get current zoom
        graphRef.current.zoom(currentZoomLevel * 1.2, 400);
      } catch (error) {
        console.error("Error zooming in:", error);
      }
    }
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
    // Add null check
    if (graphRef.current) {
      try {
        // Get current zoom and decrease it
        const currentZoomLevel = graphRef.current.zoom(); // Get current zoom
        graphRef.current.zoom(currentZoomLevel / 1.2, 400);
      } catch (error) {
        console.error("Error zooming out:", error);
      }
    }
  };
  
  const handleResetView = () => {
    setZoomLevel(1);
    // Add null check
    if (graphRef.current) {
      try {
        // Reset zoom and center
        graphRef.current.zoomToFit(400);
      } catch (error) {
        console.error("Error resetting view:", error);
      }
    }
  };
  
  // Handle refresh
  const handleRefresh = () => {
    // Reload the data
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Add cache-busting parameter to prevent browser caching
        const cacheBuster = `?t=${Date.now()}`;
        const response = await fetch(`/data/philosophers.json${cacheBuster}`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          },
          // Add credentials to ensure cookies are sent if needed
          credentials: 'same-origin'
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setGraphData(data);
        
        // Reset any active filters or selections
        setActiveEras([]);
        setSearchQuery('');
        
        // Reset the view
        // Add null check and ensure data is loaded before resetting
        if (graphRef.current && graphData.nodes.length > 0) { 
          setTimeout(() => { // Check graphRef again inside timeout
            if (graphRef.current) {
              try {
                graphRef.current.zoomToFit(400);
              } catch (error) {
                console.error("Error resetting view after refresh:", error);
              }
            }
          }, 100);
        }
        
        setLoading(false);
      } catch (err) {
        const error = err as Error;
        console.error('Error loading graph data:', error);
        setError(`Failed to load philosopher data: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setLoading(false);
      }
    };
    
    fetchData();
  };
  
  // Toggle analytics modal
  const handleToggleAnalytics = () => {
    setShowAnalytics(prev => !prev);
  };
  
  // Loading state
  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography variant="h5">Loading Philosopher Graph...</Typography>
      </Box>
    );
  }
  
  // Error state
  if (error) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography variant="h5" color="error">{error}</Typography>
        <Button variant="contained" onClick={handleRefresh}>
          Try Again
        </Button>
      </Box>
    );
  }
  
  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%', 
      height: '100vh',
      bgcolor: theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5',
      overflow: 'hidden'
    }}>
      {/* Main Graph Visualization */}
      <DynamicPhilosopherGraph
        ref={graphRef}
        width={dimensions.width}
        height={dimensions.height}
        data={filteredData}
        physicsEnabled={physicsEnabled}
        selectedLayout="force"
        zoomLevel={zoomLevel}
        onNodeClick={(node: NodeObject) => {
          console.log('Node clicked:', node.id);
          // Call a specific click handler if needed
          // handleNodeSelect(node as GraphNode | null); // Example if you need the full GraphNode
        }}
        onNodeHover={(node: NodeObject | null) => {
          console.log('Node hovered:', node ? node.id : null);
          // handleNodeHover(node as GraphNode | null); // Pass potentially null node
        }}
      />
      
      {/* Filtering Controls */}
      <Box sx={{ 
        position: 'absolute', 
        top: 16, 
        left: 16, 
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: '8px',
            width: '250px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
            Graph Controls
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Filter by Era
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {["Ancient Era", "Medieval Era", "Renaissance Era", "Early Modern Era", "Modern Era", "Contemporary Era"].map((era) => (
                <Chip 
                  key={era}
                  label={era.replace(" Era", "")}
                  size="small"
                  onClick={() => handleEraFilter(era)}
                  color={activeEras.includes(era) ? "primary" : "default"}
                  variant={activeEras.includes(era) ? "filled" : "outlined"}
                  sx={{ 
                    borderRadius: '4px',
                    '&:hover': { boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }
                  }}
                />
              ))}
            </Box>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Physics
            </Typography>
            <FormControlLabel
              control={
                <Switch 
                  checked={physicsEnabled}
                  onChange={(e) => setPhysicsEnabled(e.target.checked)}
                  size="small"
                />
              }
              label="Enable Physics"
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={handleRefresh}
              startIcon={<RefreshIcon />}
              sx={{ borderRadius: '4px' }}
            >
              Refresh
            </Button>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={handleToggleAnalytics}
              startIcon={<BarChartIcon />}
              sx={{ borderRadius: '4px' }}
            >
              Analytics
            </Button>
          </Box>
        </Paper>
      </Box>
      
      {/* Centered Search Bar */}
      <Box sx={{ 
        position: 'absolute', 
        top: 16, 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: 1000,
        width: '300px'
      }}>
        <SearchBar
          data={searchableNodes} // Pass nodes for searching
          onSearchChange={handleSearchChange}
          onSelect={handleNodeSelect} // Pass the typed selection handler
        />
      </Box>
      
      {/* Zoom Controls */}
      <GraphControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleResetView}
        onToggleAnalytics={handleToggleAnalytics}
        showingAnalytics={showAnalytics}
        position="bottom-right"
      />
      
      {/* Analytics Modal */}
      {showAnalytics && (
        <AnalyticsModal
          open={showAnalytics}
          onClose={() => setShowAnalytics(false)}
          data={graphData}
        />
      )}
    </Box>
  );
};

export default PhilosopherGraphPage;
