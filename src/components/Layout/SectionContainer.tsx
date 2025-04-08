import React from 'react';

interface SectionContainerProps {
  children: React.ReactNode;
  id?: string;
  className?: string; // Allow passing additional classes (e.g., background)
  py?: string; // Allow overriding vertical padding
}

const SectionContainer: React.FC<SectionContainerProps> = ({ 
  children, 
  id, 
  className = '', 
  py = 'py-16' // Default vertical padding
}) => {
  return (
    <section id={id} className={`${py} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
