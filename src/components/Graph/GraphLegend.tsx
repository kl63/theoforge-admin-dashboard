'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

// Helper function to add alpha - needed for consistency with graph link colors
const addAlpha = (color: string, opacity: number): string => {
  if (!color || !color.startsWith('#')) {
    console.warn(`Invalid color format for addAlpha: ${color}. Using fallback.`);
    return `rgba(128, 128, 128, ${opacity})`; // Fallback grey
  }
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase().padStart(2, '0');
};

// Helper function to calculate hue from era name (or other string)
const getHueFromString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = Math.imul(31, hash) + str.charCodeAt(i) | 0;
  }
  return (hash % 256) / 256;
};

interface GraphLegendProps {
  availableEras: string[];
  activeEras: string[];
  onToggleEra: (era: string) => void;
  className?: string; // Allow passing additional classes
}

const GraphLegend: React.FC<GraphLegendProps> = ({
  availableEras,
  activeEras,
  onToggleEra,
  className, // Destructure className
}) => {
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
      // Use twMerge to combine base styles with passed className
      className={twMerge(
        'p-4 bg-white/90 dark:bg-neutral-800/90 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700',
        className // Apply additional classes
      )}
    >
      <h6 className="text-sm font-semibold mb-2 text-text-primary dark:text-dark-text-primary">Legend</h6>

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

      {/* Era Filters - Only show if availableEras has items */}
      {availableEras.length > 0 && (
        <>
          <hr className="my-2 border-border-light dark:border-border-dark" />
          <p className="text-xs font-bold mb-1 text-text-secondary dark:text-dark-text-secondary">Filter by Era</p>
          <div className="flex flex-wrap gap-2">
            {availableEras.map((era) => {
              const isActive = activeEras.includes(era);
              const hue = getHueFromString(era); // Get a consistent hue for the era
              const bgColor = isActive ? `hsl(${hue}, 60%, 60%)` : `hsl(${hue}, 40%, 85%)`;
              const textColor = isActive ? '#ffffff' : `hsl(${hue}, 50%, 30%)`;
              const borderColor = isActive ? `hsl(${hue}, 60%, 50%)` : `hsl(${hue}, 40%, 75%)`;

              return (
                <button
                  key={era}
                  onClick={() => onToggleEra(era)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-150`}
                  style={{
                    backgroundColor: bgColor,
                    color: textColor,
                    borderColor: borderColor,
                  }}
                  title={`Toggle ${era} filter`}
                >
                  {era}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default GraphLegend;
