'use client';

import React, { useState, useEffect, useRef, useCallback, forwardRef } from 'react';
import { ForceGraphMethods, NodeObject, LinkObject } from 'react-force-graph-2d';

import { GraphNode, GraphLink, PhilosopherData } from '@/types/graph';
import { paintStandardNode } from '@/utils/canvasUtils';

// Function to add alpha channel to hex color
const addAlpha = (color: string, opacity: number): string => {
  if (!color || !color.startsWith('#')) {
    console.warn(`Invalid color format for addAlpha: ${color}. Using fallback.`);
    return `rgba(128, 128, 128, ${opacity})`; // Fallback grey
  }
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase().padStart(2, '0');
};

// Function to paint the highlight effect behind a selected node
const paintSelectedHighlight = (node: NodeObject, ctx: CanvasRenderingContext2D, color: string, baseRadius: number = 5) => {
  if (!node.x || !node.y) return;

  const highlightRadius = baseRadius * 1.8;
  ctx.beginPath();
  ctx.arc(node.x, node.y, highlightRadius, 0, 2 * Math.PI, false);
  ctx.fillStyle = addAlpha(color, 0.4); // Use addAlpha here
  ctx.fill();
};

// Function to paint the invisible pointer interaction area for a node
const paintStandardNodePointerArea = (node: NodeObject, color: string, ctx: CanvasRenderingContext2D) => {
  const radius = ((node as GraphNode).size || 5) * 1.5; 
  const nodeX = node.x ?? 0;
  const nodeY = node.y ?? 0;

  ctx.fillStyle = color; 
  ctx.beginPath();
  ctx.arc(nodeX, nodeY, radius, 0, 2 * Math.PI, false);
  ctx.fill();
};

const ForceGraph = React.lazy(() => import('react-force-graph-2d'));

interface EnterprisePhilosopherGraphProps {
  data: PhilosopherData;
  width: number;
  height: number;
  physicsEnabled: boolean;
  selectedLayout: string;
  zoomLevel?: number; 
  onNodeClick: (node: NodeObject, event: MouseEvent) => void; 
  onNodeHover: (node: NodeObject | null) => void; 
}

const EnterprisePhilosopherGraph = forwardRef<ForceGraphMethods, EnterprisePhilosopherGraphProps>(
  ({ data, width, height, physicsEnabled: physicsEnabledProp, selectedLayout, zoomLevel, onNodeClick, onNodeHover }, ref) => {
  const graphRef = useRef<ForceGraphMethods | undefined>(undefined); 
  const workerRef = useRef<Worker | null>(null);
  const [processedData, setProcessedData] = useState<PhilosopherData | null>(null);
  const [layoutComplete, setLayoutComplete] = useState<boolean>(false);
  const [physicsEnabled, setPhysicsEnabled] = useState<boolean>(physicsEnabledProp); 
  const [isLoading, setIsLoading] = useState<boolean>(true); 
  const highlightNodes = useRef(new Set<string>());
  const highlightLinks = useRef(new Set<GraphLink>());
  const [hoveredNode] = useState<GraphNode | null>(null);
  const [selectedNode] = useState<GraphNode | null>(null);

  React.useImperativeHandle(ref, () => ({ 
    zoom: (...args: [] | [scale: number, durationMs?: number]) => {
      if (!graphRef.current) return 0; 
      if (args.length === 0) {
        return graphRef.current.zoom(); 
      } else {
        const [scale, durationMs] = args;
        return graphRef.current.zoom(scale, durationMs); 
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
  } as ForceGraphMethods), []);

  useEffect(() => {
    const worker = new Worker(new URL('../../app/forge/philosopher-graph/forceWorker.ts', import.meta.url));
    workerRef.current = worker;

    worker.onmessage = (event: MessageEvent) => {
      const messageData: { type: string; nodes?: GraphNode[]; links?: GraphLink[] } = event.data;
      if (messageData.type === 'tick') {
      } else if (messageData.type === 'end') {
        console.log("Worker simulation finished.");
        const finalNodes = event.data.nodes as GraphNode[];
        setProcessedData(prevData => {
          if (!prevData) {
            return {
              nodes: finalNodes.map(node => ({ ...node, fx: undefined, fy: undefined })),
              links: []
            };
          }
          return {
            ...prevData,
            nodes: finalNodes.map(node => ({ ...node, fx: undefined, fy: undefined })), 
            links: prevData.links 
          };
        });
        setLayoutComplete(true);
      } else if (messageData.type === 'layoutUpdate') {
        const layoutNodes = event.data.nodes as GraphNode[];
        if (graphRef.current) {
        }
        if (layoutNodes) {
          setProcessedData(prevData => {
            if (!prevData) {
              return { nodes: layoutNodes, links: [] };
            }
            return {
              ...prevData, 
              nodes: layoutNodes.map((node: { id: string | number; x?: number; y?: number; vx?: number; vy?: number; fx?: number; fy?: number }) => ({ 
                ...prevData.nodes.find(n => n.id === node.id), 
                ...node 
              })),
              links: prevData.links 
            };
          });
        }
        if (!layoutComplete) setLayoutComplete(true); 
      }
    };

    return () => {
      workerRef.current?.terminate();
      console.log("Terminating worker");
      workerRef.current = null;
    };
  }, [layoutComplete, physicsEnabled]);

  const handleNodeHoverInternal = useCallback((node: NodeObject | null) => {
    highlightNodes.current.clear();
    highlightLinks.current.clear();
 
    if (node && node.id && processedData && processedData.links) { 
      const nodeId = node.id as string; 
      highlightNodes.current.add(nodeId);
      processedData.links.forEach(link => { 
        if (link.source === nodeId || link.target === nodeId) {
          highlightLinks.current.add(link);
          const sourceId = typeof link.source === 'string' ? link.source : (link.source as GraphNode).id;
          const targetId = typeof link.target === 'string' ? link.target : (link.target as GraphNode).id;
          highlightNodes.current.add(sourceId.toString());
          highlightNodes.current.add(targetId.toString());
        }
      });
    }
    onNodeHover(node); 
  }, [processedData, onNodeHover]); 

  const processGraphData = useCallback(() => {
    let nodesWithPositions = data.nodes;
    let linksForLayout = data.links;

    if (selectedLayout === 'radial') {
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) / 2.5;
      const angleStep = (2 * Math.PI) / data.nodes.length;

      const eraOrder = ['Ancient', 'Medieval', 'Renaissance', 'Early Modern', 'Modern', 'Contemporary'];
      nodesWithPositions = data.nodes
        .slice() 
        .sort((a, b) => {
          const eraAIndex = eraOrder.indexOf(a.era ?? '');
          const eraBIndex = eraOrder.indexOf(b.era ?? '');
          return eraAIndex - eraBIndex; 
        })
        .map((node, index) => ({
          ...node,
          fx: centerX + radius * Math.cos(angleStep * index),
          fy: centerY + radius * Math.sin(angleStep * index),
        }));
      linksForLayout = data.links;
      
      setLayoutComplete(true); 
    } else if (selectedLayout === 'hierarchical') {
      console.warn("Hierarchical layout not fully implemented.");
      setLayoutComplete(true); 
    }

    setProcessedData({ nodes: nodesWithPositions, links: linksForLayout });
    setIsLoading(false);
  }, [data, width, height, selectedLayout]); 

  const findNodeById = useCallback((nodeId: string | number | undefined): GraphNode | undefined => {
    if (!processedData || !processedData.nodes || nodeId === undefined) {
      return undefined;
    }
    const idString = String(nodeId);
    return processedData.nodes.find(node => String(node.id) === idString);
  }, [processedData]); 

  useEffect(() => {
    if (graphRef.current) {
      if (physicsEnabled) {
        graphRef.current.d3ReheatSimulation();
      } else {
        graphRef.current.pauseAnimation();
      }
    }
  }, [physicsEnabled, graphRef]);

  useEffect(() => {
    if (graphRef.current && zoomLevel !== undefined) {
      graphRef.current.zoom(zoomLevel, 500); 
    }
  }, [zoomLevel, graphRef]); 

  useEffect(() => {
    console.log("Data or layout changed, re-processing...");
    setIsLoading(true);
    setLayoutComplete(false);
    processGraphData(); 
  }, [data, selectedLayout, processGraphData]); 

  useEffect(() => {
    if (data && data.nodes.length > 0) {
      processGraphData();
    }
  }, [data, processGraphData]); 
  
  useEffect(() => {
    if (!workerRef.current) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'tick') {
      } else if (event.data.type === 'end') {
        console.log("Worker simulation finished.");
        const finalNodes = event.data.nodes as GraphNode[];
        setProcessedData(prevData => {
          if (!prevData) {
            return {
              nodes: finalNodes.map(node => ({ ...node, fx: undefined, fy: undefined })),
              links: []
            };
          }
          return {
            ...prevData,
            nodes: finalNodes.map(node => ({ ...node, fx: undefined, fy: undefined })), 
            links: prevData.links 
          };
        });
        setPhysicsEnabled(false); 
      } else if (event.data.type === 'layoutUpdate') {
        const layoutNodes = event.data.nodes as GraphNode[];
        if (graphRef.current) {
        }
        if (layoutNodes) {
          setProcessedData(prevData => {
            if (!prevData) {
              return { nodes: layoutNodes, links: [] };
            }
            return {
              ...prevData, 
              nodes: layoutNodes.map((node: { id: string | number; x?: number; y?: number; vx?: number; vy?: number; fx?: number; fy?: number }) => ({ 
                ...prevData.nodes.find(n => n.id === node.id), 
                ...node 
              })),
              links: prevData.links 
            };
          });
        }
        if (!layoutComplete) setLayoutComplete(true); 
      }
    };

    workerRef.current.addEventListener('message', handleMessage);

    return () => {
      workerRef.current?.removeEventListener('message', handleMessage);
    };
  }, [layoutComplete, physicsEnabled]); 

  const getLinkColor = useCallback((link: LinkObject): string => {
    const baseOpacity = 0.6; // Increased opacity
    const relation = (link as GraphLink).relation;

    switch (relation) {
      case 'Influenced by':
        return addAlpha('#81c784', baseOpacity); // success.light approximation
      case 'Student of':
        return addAlpha('#64b5f6', baseOpacity); // info.light approximation
      case 'Intellectual Partner':
        return addAlpha('#ffb74d', baseOpacity); // warning.light approximation
      default:
        return addAlpha('#9e9e9e', baseOpacity * 0.8); // grey[500]
    }
  }, []); // Removed theme dependency

  const getLinkWidth = useCallback((link: LinkObject): number => {
    const sourceId = getNodeId(link.source);
    const targetId = getNodeId(link.target);
    const isHighlighted = sourceId === hoveredNode?.id ||
                          targetId === hoveredNode?.id ||
                          sourceId === selectedNode?.id ||
                          targetId === selectedNode?.id;
    return isHighlighted ? 3 : 1;
  }, [hoveredNode, selectedNode]);

  const getLinkParticleWidth = useCallback((link: LinkObject): number => {
    const sourceId = getNodeId(link.source);
    const targetId = getNodeId(link.target);
    const isHighlighted = sourceId === hoveredNode?.id ||
                          targetId === hoveredNode?.id ||
                          sourceId === selectedNode?.id ||
                          targetId === selectedNode?.id;
    return isHighlighted ? 4 : 1.5; // Increased base particle width
  }, [hoveredNode, selectedNode]);

  const getNodeId = (node: string | number | NodeObject | undefined): string | number | undefined => {
    if (typeof node === 'object' && node !== null && node.id !== undefined) {
      return node.id;
    }
    if (typeof node === 'string' || typeof node === 'number') {
      return node;
    }
    return undefined;
  };

  const handleNodeCanvasObject = useCallback((node: NodeObject, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const isSelected = node.id === selectedNode?.id;
    const isHovered = node.id === hoveredNode?.id;

    // Draw highlight effect *if* selected
    if (isSelected) {
        paintSelectedHighlight(node, ctx, '#B8860B', (node as GraphNode).size || 5); // secondary.main
    }

    // Draw the standard node - Removed the placeholder {} theme argument
    paintStandardNode(node as GraphNode, ctx, globalScale, isHovered ? node as GraphNode : null, isSelected ? node as GraphNode : null);

  }, [selectedNode, hoveredNode]); // Removed theme dependency

  const handleNodeClickInternal = useCallback((node: NodeObject, event: MouseEvent) => {
    console.log("Internal graph node clicked:", node);
    if (node.x !== undefined && node.y !== undefined && graphRef.current) {
      graphRef.current.centerAt(node.x, node.y, 600); 
      graphRef.current.zoom(2, 600); 
    }
    onNodeClick(node, event); // Forward to parent handler
  }, [onNodeClick, graphRef]);

  const handleLinkCanvasObject = useCallback(
    (linkObject: LinkObject, ctx: CanvasRenderingContext2D) => {
      const link = linkObject as GraphLink; 
      const sourceId = getNodeId(link.source);
      const targetId = getNodeId(link.target);
      const sourceNode = findNodeById(sourceId);
      const targetNode = findNodeById(targetId);

      if (!sourceNode || !targetNode) {
        console.warn("Could not find source or target node for link", link);
        return; 
      }
      
      ctx.strokeStyle = getLinkColor(link); 
      ctx.lineWidth = (link?.weight || 1); 
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
    if (data?.nodes && data?.links) { 
      const validatedNodes = data.nodes.map((n: GraphNode) => ({ 
        ...n,
        id: n.id ?? `node-${Math.random()}`, 
      }));
      const validatedLinks = data.links.map((l: GraphLink) => ({ 
        ...l,
      }));
      setProcessedData({ nodes: validatedNodes, links: validatedLinks });
      setIsLoading(false);
      setLayoutComplete(false); 
    } else {
      console.warn("Invalid or empty data received");
      setProcessedData({ nodes: [], links: [] }); 
      setIsLoading(true); 
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <p className="text-gray-500">Loading graph...</p>
      </div>
    );
  }

  return (
    <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
      {typeof window !== 'undefined' && (
        <React.Suspense 
          fallback={
            <div className="flex justify-center items-center h-full w-full">
              <p className="text-gray-500">Loading Graph...</p>
            </div>
          }
        >
          <ForceGraph 
            ref={graphRef}
            width={width}
            height={height}
            graphData={processedData ?? undefined} 
            nodeId="id"
            linkSource="source"
            linkTarget="target"
            cooldownTicks={physicsEnabled ? 100 : 0} 
            nodeCanvasObject={handleNodeCanvasObject} 
            nodePointerAreaPaint={paintStandardNodePointerArea}
            onNodeHover={handleNodeHoverInternal} 
            onNodeClick={handleNodeClickInternal}
            linkColor={getLinkColor}
            linkWidth={getLinkWidth}
            linkDirectionalParticles={2}
            linkDirectionalParticleWidth={getLinkParticleWidth}
            linkDirectionalParticleSpeed={0.006}
            linkDirectionalParticleColor={getLinkColor}
            linkCanvasObject={handleLinkCanvasObject}
            onEngineStop={() => graphRef.current?.zoomToFit(400, 60)} // Added padding to zoomToFit
          />
        </React.Suspense>
      )}
    </div>
  );
});

EnterprisePhilosopherGraph.displayName = 'EnterprisePhilosopherGraph';

export default EnterprisePhilosopherGraph;
