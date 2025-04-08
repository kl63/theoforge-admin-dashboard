'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { PhilosopherData, GraphNode } from '@/types/graph';
import { NodeObject, ForceGraphMethods } from 'react-force-graph-2d';
import dynamic from 'next/dynamic';
import GraphLegend from '@/components/Graph/GraphLegend'; // Import the GraphLegend component
import SearchBar from '@/components/Graph/controls/SearchBar';
import AnalyticsModal from '@/components/Graph/analytics/AnalyticsModal';
import { NodeDetailPanel } from '@/components/Graph/panels/NodeDetailPanel'; // Use named import

// Dynamically import the graph component to avoid SSR issues
const DynamicPhilosopherGraph = dynamic(
  () => import('@/components/Graph/EnterprisePhilosopherGraph'),
  { ssr: false }
);

// Define the page component
export default function PhilosopherGraphPage() { // Use default export function
  // Theme and dimensions
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 }); // Initialize with defaults
  
  // Graph data state
  const [graphData, setGraphData] = useState<PhilosopherData>({ nodes: [], links: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // UI state
  const [showAnalytics, setShowAnalytics] = useState<boolean>(false);
  const [physicsEnabled, setPhysicsEnabled] = useState<boolean>(true);
  // const [zoomLevel, setZoomLevel] = useState<number>(1); // Commented out unused state
  
  // Filtering state
  const [activeEras, setActiveEras] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null); // Add state for selected node
  const [availableEras, setAvailableEras] = useState<string[]>([]); // State for dynamic eras
  
  // Create a reference to the graph component
  const graphRef = useRef<ForceGraphMethods | null>(null);
  
  // Reusable function to fetch graph data
  const loadGraphData = async (isRefresh: boolean = false) => {
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
      
      // Reset filters only on initial load, not on refresh potentially?
      // Or always reset them? Current logic resets on both. Let's keep it for now.
      setActiveEras([]);
      setSearchQuery('');
      
      // Set the graph data
      setGraphData(data);

      // Reset the view after refresh if needed
      if (isRefresh && graphRef.current && data.nodes.length > 0) {
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

    } catch (err) {
      const error = err as Error;
      console.error("Error fetching/loading graph data:", error);
      setError(`Failed to load philosopher data. Please try again. (${error?.message || 'Unknown error'})`);
    } finally {
      // Ensure loading state is always turned off
      setLoading(false); 
    }
  };

  // Fetch data on initial load
  useEffect(() => {
    loadGraphData(); // Call the reusable function
  }, []); // Empty dependency array ensures this runs only once on mount
  
  // Effect to extract available eras from data
  useEffect(() => {
    if (graphData && graphData.nodes.length > 0) {
      const erasInData = new Set(graphData.nodes
        .map(node => node.era)
        .filter((era): era is string => typeof era === 'string' && era.trim() !== '') // Filter out empty/non-string eras
      );
      // Add " Era" suffix and sort
      const formattedEras = Array.from(erasInData)
        .map(era => `${era} Era`)
        .sort(); 
      setAvailableEras(formattedEras);
      console.log("Available eras updated:", formattedEras);
    }
  }, [graphData]); // Re-run when graphData changes
  
  // Handle window resize and set initial dimensions
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize(); // Call once initially to set dimensions
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter graph data based on active eras and search query
  const filteredData = useMemo(() => {
    if (!graphData) return { nodes: [], links: [] };
    
    // If no data yet, return empty structure
    if (!graphData.nodes || graphData.nodes.length === 0) {
      console.log("No graph data available for filtering");
    }
    
    console.log(`Filtering data with ${activeEras.length} active eras and search: "${searchQuery}"`);
    
    // If no active filters, return all data
    if (activeEras.length === 0 && searchQuery === '') {
      console.log(`Returning all data: ${graphData.nodes.length} nodes and ${graphData.links.length} links`);
      return graphData;
    }
    
    // Filter nodes by era and search query
    const filteredNodes = graphData.nodes.filter(node =>
      (activeEras.length === 0 || (node.era && activeEras.includes(`${node.era} Era`))) && // Compare with " Era" suffix
      (searchQuery === '' || (node.name && node.name.toLowerCase().includes(searchQuery.toLowerCase())))
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
  const handleSearch = (query: string) => {
    console.log(`Setting search query to: "${query}"`);
    setSearchQuery(query);
  };

  // Handle node selection from search (placeholder)
  const handleNodeSelectFromSearch = (node: GraphNode | null) => {
    if (node) {
      console.log(`Node selected from search: ${node.name}`);
      // Potentially center graph or highlight node
      setSelectedNode(node);
    } else {
      console.log("Node selection cleared from search.");
    }
  };

  // Handle node click
  const handleNodeClick = (node: NodeObject) => {
    // Cast to GraphNode to access properties
    const graphNode = node as GraphNode;
    console.log("Node clicked:", graphNode);
    setSelectedNode(graphNode);
  };

  // Handle panel close
  const handleClosePanel = () => {
    setSelectedNode(null);
  };

  // Function to handle zoom change (passed to GraphControls)
  // const handleZoomChange = (newZoomLevel: number) => {
  //   setZoomLevel(newZoomLevel);
  // };

  // Function to toggle physics (passed to GraphControls)
  const handlePhysicsToggle = () => {
    setPhysicsEnabled(prev => !prev);
  };

  // Main return JSX
  return (
    // Replace Box with div and Tailwind classes
    <div className="relative w-full h-screen overflow-hidden bg-gray-100">
      {/* Header Area */}
      {/* Replace Paper with div and Tailwind classes */}
      <div className="absolute top-4 left-4 right-4 z-10 p-4 bg-white shadow-md rounded-lg flex flex-wrap items-center justify-between gap-4">
        {/* Replace Typography with h2 and Tailwind classes */}
        <h2 className="text-2xl font-semibold text-gray-800 flex-shrink-0">Philosopher Network</h2>
        
        {/* Search Bar - Pass correct props */}
        <SearchBar 
          data={graphData.nodes} // Use graphData.nodes
          onSelect={handleNodeSelectFromSearch} // Handler for selection
          onSearchChange={handleSearch} // Handler for input change
          // Removed initialValue as SearchBar manages its own state
        />

        {/* Controls and Filters Container */}
        <div className="flex items-center flex-wrap gap-4">
          {/* Available Eras Chips */}
          <div className="flex flex-wrap gap-2">
            {availableEras.length > 0 ? availableEras.map((era) => (
              // Replace Chip with button and Tailwind classes (mimicking chip style)
              <button
                key={era}
                onClick={() => handleEraFilter(era)}
                className={`px-3 py-1 rounded-full text-sm font-medium border ${activeEras.includes(era) 
                    ? 'bg-indigo-600 text-white border-indigo-600' 
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}
              >
                {era}
              </button>
            )) : <span className="text-sm text-gray-500">Loading eras...</span>}
          </div>

          {/* Refresh Button */}
          {/* Replace Button with button and Tailwind classes */}
          <button
            onClick={() => loadGraphData(true)} // Pass true for refresh
            className="p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            title="Refresh Data"
            disabled={loading}
          >
            {/* Replace RefreshIcon - using text/emoji for now */}
            {loading ? '...' : '🔄'}
          </button>

          {/* Analytics Button */}
          {/* Replace Button with button and Tailwind classes */}
          <button
            onClick={() => setShowAnalytics(true)}
            className="p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            title="Show Analytics"
            disabled={loading || !graphData || graphData.nodes.length === 0}
          >
            {/* Replace BarChartIcon - using text/emoji for now */}
            📊
          </button>
          
          {/* Physics Toggle */}
          {/* Replace FormControlLabel/Switch with label/input and Tailwind */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <span className="text-sm text-gray-700">Physics:</span>
            <input 
              type="checkbox" 
              checked={physicsEnabled} 
              onChange={handlePhysicsToggle} 
              className="toggle-switch" // Requires custom CSS or a Tailwind plugin for Switch appearance
            />
            {/* Basic Tailwind Toggle (needs improvement for aesthetics) */}
             {/* <div className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer ${physicsEnabled ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${physicsEnabled ? 'translate-x-4' : ''}`}></div>
             </div> */}
          </label>

          {/* Potentially add GraphControls here if it doesn't use MUI */}
          {/* <GraphControls 
            onZoomChange={handleZoomChange} 
            onPhysicsToggle={handlePhysicsToggle} 
            physicsEnabled={physicsEnabled}
            currentZoom={zoomLevel}
            graphRef={graphRef.current} 
          /> */} 
        </div>
      </div>

      {/* Graph Area */}
      {/* Replace Box with div */}
      <div className="w-full h-full">
        {loading && (
          // Replace Box/Typography with div/p and Tailwind classes
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-20">
            <p className="text-lg font-medium text-gray-700">Loading Graph Data...</p>
            {/* Could add a simple spinner here if needed */}
          </div>
        )}
        {error && (
          // Replace Box/Typography with div/p and Tailwind classes
          <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-20 p-4">
            <p className="text-lg font-medium text-red-700">Error: {error}</p>
          </div>
        )}
        {!loading && !error && (
          <DynamicPhilosopherGraph
            data={filteredData} // Correct prop name: data, not graphData
            width={dimensions.width}
            height={dimensions.height}
            onNodeClick={handleNodeClick}
            ref={graphRef} // Correct prop: use ref, not graphRef
            physicsEnabled={physicsEnabled}
            selectedLayout={"force"} // Example: Assuming default layout
            onNodeHover={() => {}} // Example: Placeholder hover handler
          />
        )}
      </div>

      {/* Legend Area */}
      <GraphLegend />

      {/* Node Detail Panel */}
      <NodeDetailPanel 
        node={selectedNode} 
        onClose={handleClosePanel} 
      />

      {/* Analytics Modal */}
      {showAnalytics && graphData && (
        <AnalyticsModal
          open={showAnalytics}
          onClose={() => setShowAnalytics(false)}
          data={graphData}
        />
      )}
    </div>
  );
};
