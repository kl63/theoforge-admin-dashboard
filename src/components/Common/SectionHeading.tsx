import React from 'react';

interface SectionHeadingProps {
  children: React.ReactNode;
  level?: 'h2' | 'h3';
  align?: 'left' | 'center' | 'right';
  className?: string; // Allow passing additional classes (e.g., font size variations)
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  children, 
  level = 'h2', 
  align = 'center', 
  className = '' 
}) => {
  const Tag = level;
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // Base styles + alignment + passed-in classes
  const combinedClassName = `
    text-4xl font-medium mb-12 text-gray-900 dark:text-white 
    ${alignmentClasses[align]} 
    ${className}
  `.trim();

  return <Tag className={combinedClassName}>{children}</Tag>;
};

export default SectionHeading;
