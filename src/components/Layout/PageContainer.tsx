import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string; // Optional title
  subtitle?: string; // Optional subtitle
  maxWidth?: string; // Allow overriding default max-width if needed
  className?: string; // Allow additional custom classes for the outer div
  headerClassName?: string; // Allow custom classes for the header section
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  subtitle,
  maxWidth = 'max-w-7xl', // Default to a common wide container
  className = '',
  headerClassName = ''
}) => {
  const containerClasses = `
    ${maxWidth}
    mx-auto
    px-4 sm:px-6 lg:px-8
    py-8 md:py-12 // Standard vertical padding
    ${className}
  `;

  const headerClasses = `
    mb-8 md:mb-12 // Standard bottom margin for header
    text-center // Center align header by default? Or pass via prop?
    ${headerClassName}
  `;

  return (
    <div className={containerClasses.trim().replace(/\s+/g, ' ')}>
      {(title || subtitle) && (
        <div className={headerClasses.trim().replace(/\s+/g, ' ')}>
          {title && (
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children} {/* Render the actual page content */}
    </div>
  );
};

export default PageContainer;
