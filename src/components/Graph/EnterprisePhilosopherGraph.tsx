'use client';

import React, { useState, useEffect, useRef, useCallback, forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material'; // Add Box and Typography imports
import { ForceGraphMethods, NodeObject, LinkObject } from 'react-force-graph-2d';

// Import custom types and utility functions
import { GraphNode, GraphLink, PhilosopherData } from '@/types/graph';
import { paintStandardNode } from '@/utils/canvasUtils';

// Dynamically import ForceGraph2D to avoid SSR issues
const ForceGraph = React.lazy(() => import('react-force-graph-2d'));

// Props for the EnterprisePhilosopherGraph component
interface EnterprisePhilosopherGraphProps {
  data: PhilosopherData;
  width: number;
  height: number;
  physicsEnabled: boolean;
  selectedLayout: string;
  zoomLevel?: number; // Optional prop for zoom level
  // Adjust types to match library expectations - node is likely just NodeObject here
  onNodeClick: (node: NodeObject, event: MouseEvent) => void; 
  onNodeHover: (node: NodeObject | null) => void; // Callback for hover
}

// Define the component using React.forwardRef to access the ref
const EnterprisePhilosopherGraph = forwardRef<ForceGraphMethods, EnterprisePhilosopherGraphProps>(
  ({ data, width, height, physicsEnabled: physicsEnabledProp, selectedLayout, zoomLevel, onNodeClick, onNodeHover }, ref) => {
  // Theme and graph state
  const theme = useTheme();
  const graphRef = useRef<ForceGraphMethods | undefined>(undefined); // Initialize useRef with undefined
  const workerRef = useRef<Worker | null>(null);
  const [processedData, setProcessedData] = useState<PhilosopherData | null>(null);
  const [layoutComplete, setLayoutComplete] = useState<boolean>(false);
  const [physicsEnabled, setPhysicsEnabled] = useState<boolean>(physicsEnabledProp); // State for physics engine
  const [isLoading, setIsLoading] = useState<boolean>(true); // Initialize isLoading correctly
  // Highlight state
  const highlightNodes = useRef(new Set<string>());
  const highlightLinks = useRef(new Set<GraphLink>());
  const [hoveredNode] = useState<GraphNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  // Layout calculation state

  // Expose graphRef methods via the forwarded ref
  React.useImperativeHandle(ref, () => ({ 
    // Define wrapper functions matching ForceGraphMethods signatures
    zoom: (...args: [] | [scale: number, durationMs?: number]) => {
      if (!graphRef.current) return 0; // Return default zoom level if ref is not ready
      // Check arguments to determine getter or setter call
      if (args.length === 0) {
        return graphRef.current.zoom(); // Getter
      } else {
        const [scale, durationMs] = args;
        return graphRef.current.zoom(scale, durationMs); // Setter
      }
    },
    centerAt: (x?: number, y?: number, durationMs?: number) => {
      if (!graphRef.current) return undefined;
      return graphRef.current.centerAt(x, y, durationMs);
    },
    zoomToFit: (durationMs?: number, padding?: number) => {
      if (!graphRef.current) return undefined;
      return graphRef.current.zoomToFit(durationMs, padding);
    }
    // Cast the return type of the handle to satisfy the forwardRef type, 
    // even though methods might return undefined if ref isn't ready.
    // Parent component still needs null checks.
  } as ForceGraphMethods), []); // Remove graphRef.current from deps, it's not a valid dependency

  // Initialize Web Worker for physics simulation
  useEffect(() => {
    // Initialize worker
    const worker = new Worker(new URL('../../app/forge/philosopher-graph/forceWorker.ts', import.meta.url));
    workerRef.current = worker;

    // Handle worker messages
    worker.onmessage = (event: MessageEvent) => {
      const messageData: { type: string; nodes?: GraphNode[]; links?: GraphLink[] } = event.data;
      // Handle messages from worker based on type
      if (messageData.type === 'tick') {
        // Handle physics tick updates - might need specific logic
      } else if (messageData.type === 'end') {
        console.log("Worker simulation finished.");
        const finalNodes = event.data.nodes as GraphNode[];
        setProcessedData(prevData => {
          if (!prevData) {
            // If previous data was null, just return the final nodes and empty links
            return {
              nodes: finalNodes.map(node => ({ ...node, fx: undefined, fy: undefined })),
              links: []
            };
          }
          // If previous data exists, update nodes and preserve links
          return {
            ...prevData,
            nodes: finalNodes.map(node => ({ ...node, fx: undefined, fy: undefined })), // Update nodes, clearing fixed positions
            links: prevData.links // Explicitly keep existing links
          };
        });
        setLayoutComplete(true);
      } else if (messageData.type === 'layoutUpdate') {
        const layoutNodes = event.data.nodes as GraphNode[];
        // Update positions directly in the graph instance if possible
        if (graphRef.current) {
          // graphRef.current.graphData({ nodes: layoutNodes, links: processedData.links }); // Update graph data
        }
        if (layoutNodes) {
          setProcessedData(prevData => {
            if (!prevData) {
              // If previous data was null, just return the new nodes and empty links
              return { nodes: layoutNodes, links: [] };
            }
            // If previous data exists, update nodes and preserve links
            return {
              ...prevData, // Spread existing data
              nodes: layoutNodes.map((node: { id: string | number; x?: number; y?: number; vx?: number; vy?: number; fx?: number; fy?: number }) => ({ 
                ...prevData.nodes.find(n => n.id === node.id), // Preserve existing node data
                ...node // Overwrite with layout properties (x, y, vx, vy, etc.)
              })),
              links: prevData.links // Explicitly keep existing links (guaranteed non-null by the 'if' check)
            };
          });
        }
        if (!layoutComplete) setLayoutComplete(true); // Mark layout as complete after first update
      }
    };

    // Clean up worker on unmount
    return () => {
      workerRef.current?.terminate();
      console.log("Terminating worker");
      workerRef.current = null;
    };
  }, [layoutComplete, physicsEnabled]);

  // Define reusable interaction handlers
  const handleNodeHoverInternal = useCallback((node: NodeObject | null) => {
    highlightNodes.current.clear();
    highlightLinks.current.clear();
 
    // Ensure node, processedData, and processedData.links exist before proceeding
    if (node && node.id && processedData && processedData.links) { 
      const nodeId = node.id as string; // Cast id to string
      highlightNodes.current.add(nodeId);
      // Find links connected to the hovered node
      processedData.links.forEach(link => { // Use processedData links
        if (link.source === nodeId || link.target === nodeId) {
          highlightLinks.current.add(link);
          // Also highlight the connected node
          const sourceId = typeof link.source === 'string' ? link.source : (link.source as GraphNode).id;
          const targetId = typeof link.target === 'string' ? link.target : (link.target as GraphNode).id;
          highlightNodes.current.add(sourceId.toString());
          highlightNodes.current.add(targetId.toString());
        }
      });
    }
    onNodeHover(node); // Call parent hover handler
  }, [processedData, onNodeHover]); // Check processedData object itself

  // Process graph data for rendering
  const processGraphData = useCallback(() => {
    // Prepare data for rendering
    // Assign initial positions based on layout type
    let nodesWithPositions = data.nodes;
    let linksForLayout = data.links;

    if (selectedLayout === 'radial') {
      // Calculate positions for radial layout
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) / 2.5;
      const angleStep = (2 * Math.PI) / data.nodes.length;

      // Simple era ordering for radial sort
      const eraOrder = ['Ancient', 'Medieval', 'Renaissance', 'Early Modern', 'Modern', 'Contemporary'];
      // const eraOrderMap = new Map(eraOrder.map((era, index) => [era, index]));

      nodesWithPositions = data.nodes
        .slice() // Create a copy before sorting
        .sort((a, b) => {
          const eraAIndex = eraOrder.indexOf(a.era ?? '');
          const eraBIndex = eraOrder.indexOf(b.era ?? '');
          return eraAIndex - eraBIndex; // Sort by era order
        })
        .map((node, index) => ({
          ...node,
          fx: centerX + radius * Math.cos(angleStep * index),
          fy: centerY + radius * Math.sin(angleStep * index),
        }));
      // Use original links, D3 handles node references
      linksForLayout = data.links;
      
      setLayoutComplete(true); // Radial layout is immediate
    } else if (selectedLayout === 'hierarchical') {
      // Hierarchical layout logic would go here (e.g., using d3.tree or d3.cluster)
      // This requires defining parent-child relationships or using d3.stratify
      console.warn("Hierarchical layout not fully implemented.");
      setLayoutComplete(true); // Mark as complete for now
    }

    setProcessedData({ nodes: nodesWithPositions, links: linksForLayout });
    setIsLoading(false);
  }, [data, width, height, selectedLayout]); // Added data dependency

  // Helper function to find a node by its ID in the processed data
  const findNodeById = useCallback((nodeId: string | number | undefined): GraphNode | undefined => {
    if (!processedData || !processedData.nodes || nodeId === undefined) {
      return undefined;
    }
    // Ensure nodeId is treated as a string for comparison, matching how IDs are often used
    const idString = String(nodeId);
    return processedData.nodes.find(node => String(node.id) === idString);
  }, [processedData]); // Depends on processedData

  // Control physics engine based on prop
  useEffect(() => {
    if (graphRef.current) {
      if (physicsEnabled) {
        graphRef.current.d3ReheatSimulation();
      } else {
        graphRef.current.pauseAnimation();
      }
    }
  }, [physicsEnabled, graphRef]);

  // Control zoom level
  useEffect(() => {
    if (graphRef.current && zoomLevel !== undefined) {
      graphRef.current.zoom(zoomLevel, 500); // Zoom with 500ms transition
    }
  }, [zoomLevel, graphRef]); // Include graphRef if its current value matters

  // Reset physics and layout when data or layout type changes
  useEffect(() => {
    console.log("Data or layout changed, re-processing...");
    setIsLoading(true);
    setLayoutComplete(false);
    processGraphData(); // Re-run layout and processing
  }, [data, selectedLayout, processGraphData]); // Added processGraphData

  // Initial data processing call
  useEffect(() => {
    if (data && data.nodes.length > 0) {
      processGraphData();
    }
  }, [data, processGraphData]); // Added processGraphData
  
  // Worker message handler for updated positions
  useEffect(() => {
    if (!workerRef.current) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'tick') {
        // Update node positions without triggering full re-render if possible
        // This is tricky with react-force-graph; might need internal updates
      } else if (event.data.type === 'end') {
        console.log("Worker simulation finished.");
        const finalNodes = event.data.nodes as GraphNode[];
        setProcessedData(prevData => {
          if (!prevData) {
            // If previous data was null, just return the final nodes and empty links
            return {
              nodes: finalNodes.map(node => ({ ...node, fx: undefined, fy: undefined })),
              links: []
            };
          }
          // If previous data exists, update nodes and preserve links
          return {
            ...prevData,
            nodes: finalNodes.map(node => ({ ...node, fx: undefined, fy: undefined })), // Update nodes, clearing fixed positions
            links: prevData.links // Explicitly keep existing links
          };
        });
        setPhysicsEnabled(false); // Disable physics after simulation ends
      } else if (event.data.type === 'layoutUpdate') {
        const layoutNodes = event.data.nodes as GraphNode[];
        // Update positions directly in the graph instance if possible
        if (graphRef.current) {
          // graphRef.current.graphData({ nodes: layoutNodes, links: processedData.links }); // Update graph data
        }
        if (layoutNodes) {
          setProcessedData(prevData => {
            if (!prevData) {
              // If previous data was null, just return the new nodes and empty links
              return { nodes: layoutNodes, links: [] };
            }
            // If previous data exists, update nodes and preserve links
            return {
              ...prevData, // Spread existing data
              nodes: layoutNodes.map((node: { id: string | number; x?: number; y?: number; vx?: number; vy?: number; fx?: number; fy?: number }) => ({ 
                ...prevData.nodes.find(n => n.id === node.id), // Preserve existing node data
                ...node // Overwrite with layout properties (x, y, vx, vy, etc.)
              })),
              links: prevData.links // Explicitly keep existing links (guaranteed non-null by the 'if' check)
            };
          });
        }
        if (!layoutComplete) setLayoutComplete(true); // Mark layout as complete after first update
      }
    };

    workerRef.current.addEventListener('message', handleMessage);

    return () => {
      workerRef.current?.removeEventListener('message', handleMessage);
    };
  }, [layoutComplete, physicsEnabled]); // Added physicsEnabled dependency

  // Function to determine link color (simple placeholder)
  const getLinkColor = useCallback((link: GraphLink) => {
    // Example: Make links dimmer or based on a property
    // Ensure properties exist before accessing
    const relation = link?.relation;
    const sourceCommunity = (link?.source as GraphNode)?.community;
    const targetCommunity = (link?.target as GraphNode)?.community;

    if (relation === 'influenced') return 'rgba(0, 255, 0, 0.3)'; 
    if (sourceCommunity !== undefined && targetCommunity !== undefined && sourceCommunity === targetCommunity) {
      // Slightly emphasize intra-community links
      return 'rgba(150, 150, 150, 0.3)';
    }
    return 'rgba(100, 100, 100, 0.2)'; // Default dim color
  }, []);

  // Placeholder functions for missing drawing/color logic
  const paintNode = useCallback(
    (
      nodeObject: NodeObject, 
      ctx: CanvasRenderingContext2D, 
      globalScale: number
    ) => {
      // Cast to GraphNode for our utility function
      const node = nodeObject as GraphNode; 
      paintStandardNode(node, ctx, globalScale, theme, hoveredNode, selectedNode); // Pass actual hovered/selected
    },
    [theme, hoveredNode, selectedNode] // Add hoveredNode and selectedNode dependencies
  );

  const paintNodePointerArea = useCallback((node: NodeObject, color: string, ctx: CanvasRenderingContext2D) => {
    // Define hit area for node interaction
    const radius = 6; // Slightly larger than visual radius
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI, false);
    ctx.fill();
  }, []);

  const paintLink = useCallback(
    (
      linkObject: LinkObject, // Accept LinkObject from react-force-graph
      ctx: CanvasRenderingContext2D,
      globalScale: number
    ) => {
      const link = linkObject as GraphLink; // Cast to GraphLink
      // Get source/target IDs, handling both direct IDs and node objects
      const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
      const targetId = typeof link.target === 'object' ? link.target.id : link.target;

      // Use the helper function to find the nodes
      const sourceNode = findNodeById(sourceId);
      const targetNode = findNodeById(targetId);

      // If nodes aren't found, we can't draw the link
      if (!sourceNode || !targetNode) {
        console.warn("Could not find source or target node for link", link);
        return; 
      }
      
      // Basic link drawing
      ctx.strokeStyle = getLinkColor(link); // Use getLinkColor with the casted link
      // Use weight for link width if available, default to 1
      ctx.lineWidth = (link?.weight || 1) / globalScale; 
      ctx.beginPath();
      if (sourceNode?.x !== undefined && sourceNode?.y !== undefined && targetNode?.x !== undefined && targetNode?.y !== undefined) {
          ctx.moveTo(sourceNode.x, sourceNode.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.stroke();
      } else {
          console.warn("Skipping link draw due to undefined node coordinates", link);
      }
    },
    [getLinkColor, findNodeById] 
  );

  useEffect(() => {
    console.log("Data prop received:", data);
    if (data?.nodes && data?.links) { // Use optional chaining for safety
      // Basic validation or transformation if needed
      const validatedNodes = data.nodes.map((n: GraphNode) => ({ // Type 'n' as GraphNode
        ...n,
        id: n.id ?? `node-${Math.random()}`, // Ensure ID exists
      }));
      const validatedLinks = data.links.map((l: GraphLink) => ({ // Type 'l' as GraphLink
        ...l,
        // Ensure source/target are valid IDs present in nodes
        // Add validation logic here if needed
      }));
      setProcessedData({ nodes: validatedNodes, links: validatedLinks });
      setIsLoading(false);
      setLayoutComplete(false); // Reset layout on new data
    } else {
      console.warn("Invalid or empty data received");
      setProcessedData({ nodes: [], links: [] }); // Clear data
      setIsLoading(true); // Set loading state
    }
  }, [data]);

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><Typography>Loading graph...</Typography></Box>;
  }

  return (
    <Box sx={{ position: 'relative', width, height }}>
      {/* Conditional rendering to ensure window is defined for lazy loading */}
      {typeof window !== 'undefined' && (
        <React.Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><Typography>Loading Graph...</Typography></Box>}>
          <ForceGraph // Use the lazy-loaded component
            ref={graphRef}
            width={width}
            height={height}
            graphData={processedData ?? undefined} // Use processed data, providing undefined if null
            nodeId="id"
            linkSource="source"
            linkTarget="target"
            // Performance settings
            cooldownTicks={physicsEnabled ? 100 : 0} // Stop simulation if physics is off
            // nodeRelSize={4} // Adjust node size relative to scale
            // Rendering & Styling
            nodeCanvasObject={paintNode} // Use custom node painting
            nodePointerAreaPaint={paintNodePointerArea}
            // Link styling & behavior
            linkCanvasObjectMode={() => 'after'} // Draw links after nodes
            linkCanvasObject={paintLink} // Use custom link painting
            // linkColor={getLinkColor} // Set link color dynamically via paintLink strokeStyle
            linkWidth={(link: LinkObject) => (link as GraphLink)?.weight || 1} // Example using weight
            linkDirectionalParticles={2}
            linkDirectionalParticleWidth={2}
            // Interactions
            onNodeHover={handleNodeHoverInternal} // Use internal hover handler
            onNodeClick={(node, event) => { // Capture the event object
              console.log("Internal graph node clicked:", node);
              const graphNode = node as GraphNode;
              setSelectedNode(graphNode); // Update selected node state
              onNodeClick(graphNode, event); // Call parent handler with both arguments
            }}
            // Zoom/Pan controls if needed
            // onZoom={handleZoom}
            // onBackgroundClick={handleBackgroundClick}
            // Physics engine configuration (can be adjusted)
            // d3Force={...}
            // d3AlphaDecay={0.0228}
            // d3VelocityDecay={0.4}
          />
        </React.Suspense>
      )}
    </Box>
  );
});

EnterprisePhilosopherGraph.displayName = 'EnterprisePhilosopherGraph';

export default EnterprisePhilosopherGraph;
