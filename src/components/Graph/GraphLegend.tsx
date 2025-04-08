'use client';

import React from 'react';

// Helper function to add alpha - needed for consistency with graph link colors
const addAlpha = (color: string, opacity: number): string => {
  if (!color || !color.startsWith('#')) {
    console.warn(`Invalid color format for addAlpha: ${color}. Using fallback.`);
    return `rgba(128, 128, 128, ${opacity})`; // Fallback grey
  }
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase().padStart(2, '0');
};

const GraphLegend: React.FC = () => {
  const linkOpacity = 0.6; // Consistent opacity for legend lines

  // Use hex codes matching EnterprisePhilosopherGraph
  const nodeStates = [
    { name: 'Selected', color: '#B8860B', type: 'node' }, // secondary.main
    { name: 'Hovered', color: '#bdbdbd', type: 'node' }, // Grey 400 approximation
  ];

  const relationshipTypes = [
    { name: 'Influenced by', color: addAlpha('#81c784', linkOpacity), type: 'link' }, // success.light
    { name: 'Student of', color: addAlpha('#64b5f6', linkOpacity), type: 'link' }, // info.light
    { name: 'Intellectual Partner', color: addAlpha('#ffb74d', linkOpacity), type: 'link' }, // warning.light
    { name: 'Other', color: addAlpha('#9e9e9e', linkOpacity * 0.8), type: 'link' }, // grey[500]
  ];

  return (
    <div 
      className="p-4 absolute bottom-4 right-4 z-10 max-w-[200px] bg-white/90 rounded-lg shadow-lg border border-gray-200"
    >
      <h6 className="text-sm font-semibold mb-2">Legend</h6>
      
      <p className="text-xs font-bold mb-1 text-gray-700">Node States</p>
      {nodeStates.map((state) => (
        <div key={state.name} className="flex items-center mb-1">
          <div className="mr-2 flex items-center">
            <div 
              className="w-3 h-3 rounded-full border border-gray-400"
              style={{ backgroundColor: state.color }}
            ></div>
          </div>
          <span className="text-xs text-gray-600">{state.name}</span>
        </div>
      ))}

      <hr className="my-2 border-gray-200" />

      <p className="text-xs font-bold mb-1 text-gray-700">Relationship Types</p>
      {relationshipTypes.map((rel) => (
        <div key={rel.name} className="flex items-center mb-1">
          <div className="mr-2 flex items-center">
            <div 
              className="w-4 h-1"
              style={{ backgroundColor: rel.color }}
            ></div>
          </div>
          <span className="text-xs text-gray-600">{rel.name}</span>
        </div>
      ))}
    </div>
  );
};

export default GraphLegend;
